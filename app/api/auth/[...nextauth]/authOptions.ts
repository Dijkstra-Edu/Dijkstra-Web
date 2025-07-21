// app/api/auth/[...nextauth]/authOptions.ts
import GitHub from "next-auth/providers/github";
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
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.login = token.login;
        session.user.avatar_url = token.avatar_url;
        session.user.bio = token.bio;
        session.user.followers = token.followers;
        session.user.following = token.following;
        session.user.public_repos = token.public_repos;
        session.user.company = token.company;
        session.user.location = token.location;
        session.user.blog = token.blog;
        session.user.created_at = token.created_at;
        session.user.updated_at = token.updated_at;
        session.user.organization = token.organization;
        session.user.hireable = token.hireable;
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        return {
          ...token,
          id: Number(profile.id),
          login: profile.login,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          followers: profile.followers,
          following: profile.following,
          public_repos: profile.public_repos,
          company: profile.company,
          location: profile.location,
          blog: profile.blog,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          organization: profile.organization,
          hireable: profile.hireable,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
