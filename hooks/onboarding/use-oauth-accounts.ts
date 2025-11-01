import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { OAuthAccountData } from "@/types/onboarding";

/**
 * Hook to manage OAuth account connections (GitHub, LinkedIn)
 * Abstracts localStorage for OAuth data and provides helper methods
 */
export function useOAuthAccounts() {
  const { data: session } = useSession();
  const [oauthData, setOAuthData] = useState<OAuthAccountData>({});

  // Load account data from localStorage and session on mount
  useEffect(() => {
    const loadAccountData = async () => {
      try {
        // Try to load from server first
        const response = await fetch("/api/auth/link-accounts");
        if (response.ok) {
          const data = await response.json();
          const loaded: OAuthAccountData = {};
          
          if (data.github) {
            localStorage.setItem("githubData", JSON.stringify(data.github));
            loaded.github = data.github;
          } else {
            // Fallback to localStorage
            const stored = localStorage.getItem("githubData");
            if (stored) {
              loaded.github = JSON.parse(stored);
            }
          }
          
          if (data.linkedin) {
            localStorage.setItem("linkedinData", JSON.stringify(data.linkedin));
            loaded.linkedin = data.linkedin;
          } else {
            // Fallback to localStorage
            const stored = localStorage.getItem("linkedinData");
            if (stored) {
              loaded.linkedin = JSON.parse(stored);
            }
          }
          
          setOAuthData(loaded);
        }
      } catch (error) {
        console.error("Failed to load account data:", error);
        // Fallback to localStorage only
        const githubData = localStorage.getItem("githubData");
        const linkedinData = localStorage.getItem("linkedinData");
        setOAuthData({
          github: githubData ? JSON.parse(githubData) : undefined,
          linkedin: linkedinData ? JSON.parse(linkedinData) : undefined,
        });
      }
    };

    loadAccountData();
  }, []);

  // Sync session data with localStorage
  useEffect(() => {
    if (session?.user) {
      const user = session.user as any;
      
      // Store GitHub data
      if (user.id && user.login) {
        const githubData = {
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
        };
        
        localStorage.setItem("githubData", JSON.stringify(githubData));
        setOAuthData((prev) => ({ ...prev, github: githubData }));
        
        // Also store in server-side cookies for persistence
        fetch("/api/auth/link-accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: "github", data: githubData }),
        }).catch(console.error);
      }
      
      // Store LinkedIn data
      if (user.linkedinId) {
        const linkedinData = {
          linkedinId: user.linkedinId,
          linkedinName: user.linkedinName,
          linkedinImage: user.linkedinImage,
        };
        
        localStorage.setItem("linkedinData", JSON.stringify(linkedinData));
        setOAuthData((prev) => ({ ...prev, linkedin: linkedinData }));
        
        // Also store in server-side cookies for persistence
        fetch("/api/auth/link-accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: "linkedin", data: linkedinData }),
        }).catch(console.error);
      }
    }
  }, [session]);

  const githubUsername = 
    session?.user?.login || 
    oauthData.github?.login || 
    (() => {
      const stored = localStorage.getItem("githubData");
      return stored ? JSON.parse(stored).login : "";
    })();

  const githubConnected = Boolean(
    githubUsername || 
    oauthData.github || 
    localStorage.getItem("githubData")
  );

  const linkedinConnected = Boolean(
    (session?.user as any)?.linkedinId ||
    oauthData.linkedin ||
    localStorage.getItem("linkedinData")
  );

  return {
    githubConnected,
    linkedinConnected,
    githubUsername,
    githubData: oauthData.github,
    linkedinData: oauthData.linkedin,
  };
}

