import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      login?: string;
      name?: string;
      email?: string;
      image?: string;
      followers?: number;
      public_repos?: number;
      avatar_url?: string;
    };
  }

  interface Profile {
    id: string;
    login?: string;
    name?: string;
    email?: string;
    avatar_url?: string;
    followers?: number;
    public_repos?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    login?: string;
    followers?: number;
    public_repos?: number;
    avatar_url?: string;
  }
}