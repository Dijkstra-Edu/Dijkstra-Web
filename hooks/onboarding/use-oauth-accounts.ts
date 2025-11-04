import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

/**
 * Hook to manage OAuth account connections (GitHub, LinkedIn)
 * Reads from NextAuth session (JWT) first, with cookie fallback for LinkedIn
 */
export function useOAuthAccounts() {
  const { data: session } = useSession();
  const [linkedinFromCookie, setLinkedinFromCookie] = useState<any>(null);

  const user = session?.user as any;

  const githubUsername = user?.login || "";

  const githubConnected = Boolean(user?.login);

  // Check LinkedIn in session first, then fallback to cookie
  useEffect(() => {
    if (!user?.linkedinId && typeof document !== 'undefined') {
      // Read from cookie as fallback
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {} as Record<string, string>);
      
      const linkedinDataStr = cookies['linkedinData'];
      if (linkedinDataStr) {
        try {
          setLinkedinFromCookie(JSON.parse(linkedinDataStr));
        } catch (e) {
          // Silently fail - invalid cookie data
        }
      }
    } else {
      setLinkedinFromCookie(null);
    }
  }, [user?.linkedinId]);

  const linkedinConnected = Boolean(user?.linkedinId || linkedinFromCookie);

  // Extract account data from session for convenience
  const githubData = user?.login
    ? {
        id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        company: user.company,
        location: user.location,
        blog: user.blog,
        created_at: user.created_at,
        updated_at: user.updated_at,
        organization: user.organization,
        hireable: user.hireable,
      }
    : undefined;

  const linkedinData = user?.linkedinId
    ? {
        linkedinId: user.linkedinId,
        linkedinName: user.linkedinName,
        linkedinImage: user.linkedinImage,
      }
    : linkedinFromCookie
    ? {
        linkedinId: linkedinFromCookie.linkedinId,
        linkedinName: linkedinFromCookie.linkedinName,
        linkedinImage: linkedinFromCookie.linkedinImage,
      }
    : undefined;

  return {
    githubConnected,
    linkedinConnected,
    githubUsername,
    githubData,
    linkedinData,
  };
}

