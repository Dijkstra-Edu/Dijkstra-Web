// app/api/auth/[...nextauth]/authOptions.ts
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";
import type { NextAuthOptions } from "next-auth";

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
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      // Use LinkedIn OIDC discovery
      wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        const p: any = profile as any;
        const name = p.name || [p.given_name, p.family_name].filter(Boolean).join(" ") || undefined;
        return {
          id: String(p.sub),
          name,
          email: p.email || undefined,
          image: p.picture || undefined,
        } as any;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      if (session.user) {
        const u: any = session.user as any;
        // GitHub fields
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
        // LinkedIn fields
        u.linkedinId = (token as any).linkedinId as string | undefined;
        u.linkedinName = (token as any).linkedinName as string | undefined;
        u.linkedinImage = (token as any).linkedinImage as string | undefined;
      }
      return session;
    },
    async jwt({ token, profile, account }) {
      if (profile && account?.provider === "github") {
        return {
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
        } as any;
      }
      if (profile && account?.provider === "linkedin") {
        const p = profile as any;
        return {
          ...token,
          linkedinId: String(p.sub || p.id),
          linkedinName: p.name || undefined,
          linkedinImage: p.picture || p.image || undefined,
        } as any;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
