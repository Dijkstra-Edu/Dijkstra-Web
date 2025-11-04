// app/api/auth/[...nextauth]/authOptions.ts
import GitHub from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import { fetchDataForge } from "@/server/dataforge/client";
import { checkOnboardingStatus, getAuthDataByGithubUsername } from "@/server/dataforge/User/user";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'read:user user:email user:follow public_repo',
        },
      },
      profile: async (profile, tokens) => {
        const res = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `token ${tokens.access_token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });
        const extendedProfile = await res.json();
        return {
          id: profile.id,
          login: profile.login,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          followers: extendedProfile.followers,
          following: extendedProfile.following,
          public_repos: extendedProfile.public_repos,
          avatar_url: extendedProfile.avatar_url,
          bio: extendedProfile.bio,
          company: extendedProfile.company,
          location: extendedProfile.location,
          blog: extendedProfile.blog,
          created_at: extendedProfile.created_at,
          updated_at: extendedProfile.updated_at,
          organization: extendedProfile.organizations_url,
          hireable: extendedProfile.hireable,
        };
      },
    }),
    // LinkedIn removed - only used for account linking via custom OAuth flow (/api/auth/linkedin-link)
    // LinkedIn is not used as a primary authentication provider
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn({ user, account, profile }) {
      // Allow sign in (GitHub is the only provider now)
      return true;
    },
    async session({ session, token, trigger }) {
      if (session.user) {
        const u: any = session.user as any;
        
        // Always add GitHub fields if they exist in token (GitHub is primary auth)
        if ((token as any).id) {
          u.id = (token as any).id;
          u.login = (token as any).login;
          u.avatar_url = (token as any).avatar_url;
          u.bio = (token as any).bio;
          u.followers = (token as any).followers;
          u.following = (token as any).following;
          u.public_repos = (token as any).public_repos;
          u.company = (token as any).company;
          u.location = (token as any).location;
          u.blog = (token as any).blog;
          u.created_at = (token as any).created_at;
          u.updated_at = (token as any).updated_at;
          u.organization = (token as any).organization;
          u.hireable = (token as any).hireable;
        }
        
        // Add LinkedIn fields if they exist in token (LinkedIn data is stored in persistent cookie)
        // Note: LinkedIn data is primarily stored in 'linkedinData' cookie (30 days)
        // For server-side access, use getLinkedInData() helper function in API routes
        // This token check is for backward compatibility if LinkedIn was ever merged into JWT
        if ((token as any).linkedinId) {
          u.linkedinId = (token as any).linkedinId as string | undefined;
          u.linkedinName = (token as any).linkedinName as string | undefined;
          u.linkedinImage = (token as any).linkedinImage as string | undefined;
        }
        
        // Add DataForge auth data
        u.github_user_name = (token as any).github_user_name;
        u.user_id = (token as any).user_id;
        u.profile_id = (token as any).profile_id;
        u.requires_onboarding = (token as any).requires_onboarding;
      }
      
      return session;
    },
    async jwt({ token, profile, account, user, trigger }) {
      // LinkedIn data is stored in persistent cookie, not in JWT
      // LinkedIn OAuth flow stores data in 'linkedinData' cookie (30 days)
      // This keeps LinkedIn separate from GitHub auth (primary auth provider)
      
      // Handle GitHub login
      if (profile && account?.provider === "github") {
        const githubUsername = (profile as any).login;
        
        // Create a new token with GitHub data
        const newToken = {
          ...token,
          id: Number((profile as any).id),
          login: (profile as any).login,
          avatar_url: (profile as any).avatar_url,
          bio: (profile as any).bio,
          followers: (profile as any).followers,
          following: (profile as any).following,
          public_repos: (profile as any).public_repos,
          company: (profile as any).company,
          location: (profile as any).location,
          blog: (profile as any).blog,
          created_at: (profile as any).created_at,
          updated_at: (profile as any).updated_at,
          organization: (profile as any).organization,
          hireable: (profile as any).hireable,
        };
        
        try {
          // Check onboarding status first
          const onboardingStatus = await checkOnboardingStatus(githubUsername);
          
          if (onboardingStatus.onboarded) {
            // User is onboarded - fetch auth credentials
            const authData = await getAuthDataByGithubUsername(githubUsername);
            
            newToken.user_id = authData.user_id;
            newToken.profile_id = authData.profile_id;
            newToken.github_user_name = githubUsername;
            newToken.requires_onboarding = false;
          } else {
            // User not onboarded - set flag for redirect
            newToken.github_user_name = githubUsername;
            newToken.requires_onboarding = true;
            // Don't set user_id/profile_id for non-onboarded users
          }
        } catch (error) {
          console.error('Failed to fetch DataForge auth data:', error);
          // Assume requires onboarding if we can't check
          newToken.requires_onboarding = true;
          newToken.github_user_name = githubUsername;
        }
        
        // Preserve LinkedIn data if it exists
        if (token.linkedinId) {
          (newToken as any).linkedinId = token.linkedinId;
          (newToken as any).linkedinName = token.linkedinName;
          (newToken as any).linkedinImage = token.linkedinImage;
        }
        
        return newToken as any;
      }

      // LinkedIn authentication removed - LinkedIn is only used for account linking
      // via custom OAuth flow (/api/auth/linkedin-link), not as a NextAuth provider

      // Check onboarding status for existing tokens to refresh the flag
      // This runs on every JWT callback invocation (session refresh)
      if (token.github_user_name) {
        try {
          const onboardingStatus = await checkOnboardingStatus(token.github_user_name);
          
          if (onboardingStatus.onboarded) {
            // User is now onboarded - fetch auth credentials
            const authData = await getAuthDataByGithubUsername(token.github_user_name);
            
            token.user_id = authData.user_id;
            token.profile_id = authData.profile_id;
            token.requires_onboarding = false;
          } else {
            // User still not onboarded
            token.requires_onboarding = true;
            // Clear auth data if they exist
            delete token.user_id;
            delete token.profile_id;
          }
        } catch (error) {
          console.error('Failed to refresh onboarding status:', error);
        }
      }
      
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
