import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
      profile: async (profile, tokens) => {
    // Fetch additional data from GitHub API
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
      public_repos: extendedProfile.public_repos,
      avatar_url: extendedProfile.avatar_url,
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
    session.user.followers = token.followers;
    session.user.public_repos = token.public_repos;
    session.user.avatar_url = token.avatar_url;
  }
  return session;
},
  async jwt({ token, user, account, profile }) {
  if (profile) {
    return {
      ...token,
      id: Number(profile.id), // Ensure id is number
      login: profile.login,
      followers: profile.followers,
      public_repos: profile.public_repos,
      avatar_url: profile.avatar_url,
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
