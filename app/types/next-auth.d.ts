import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      login?: string;
      name?: string;
      email?: string;
      image?: string;
      avatar_url?: string;
      bio?: string;
      followers?: number;
      following?: number;
      public_repos?: number;
      company?: string;
      location?: string;
      blog?: string;
      created_at?: string;
      updated_at?: string;
      organization?: string;
      hireable?: boolean;
      linkedinId?: string;
      linkedinName?: string;
      linkedinImage?: string;
      github_user_name?: string;
      user_id?: string;
      profile_id?: string;
      requires_onboarding?: boolean;
    };
  }

  interface Profile {
    id: string;
    login?: string;
    name?: string;
    email?: string;
    avatar_url?: string;
    bio?: string;
    followers?: number;
    following?: number;
    public_repos?: number;
    company?: string;
    location?: string;
    blog?: string;
    created_at?: string;
    updated_at?: string;
    organization?: string;
    hireable?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    login?: string;
    avatar_url?: string;
    bio?: string;
    followers?: number;
    following?: number;
    public_repos?: number;
    company?: string;
    location?: string;
    blog?: string;
    created_at?: string;
    updated_at?: string;
    organization?: string;
    hireable?: boolean;
    linkedinId?: string;
    linkedinName?: string;
    linkedinImage?: string;
    github_user_name?: string;
    user_id?: string;
    profile_id?: string;
    requires_onboarding?: boolean;
  }
}
