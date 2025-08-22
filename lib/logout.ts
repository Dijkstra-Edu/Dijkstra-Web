// lib/logout.ts
import { signOut } from "next-auth/react";

interface LogoutOptions {
  callbackUrl?: string;
  redirect?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const handleLogout = async (options: LogoutOptions = {}) => {
  const {
    callbackUrl = "/login",
    redirect = true,
    onSuccess,
    onError
  } = options;

  try {
    console.log("Starting logout process...");
    console.log("Current cookies before clear:", document.cookie);
   
    // Clearing the QA cookie (if it exists)
    const qaLogoutResponse = await fetch("/api/qa-logout", {
      method: "POST",
      credentials: "include"
    });
   
    if (qaLogoutResponse.ok) {
      const data = await qaLogoutResponse.json();
      console.log("QA logout response:", data);
      console.log("Current cookies after clear:", document.cookie);
    } else {
      console.warn("QA logout failed:", qaLogoutResponse.status);
    }
   
    console.log("Proceeding with NextAuth signout");
   
    // Sign out from NextAuth
    await signOut({
      callbackUrl,
      redirect
    });

    // Call success callback if provided
    onSuccess?.();
    
  } catch (error) {
    console.error("Logout error:", error);
    
    const logoutError = error instanceof Error ? error : new Error("Unknown logout error");
    
    // Call error callback if provided
    onError?.(logoutError);
    
    // Fallback: still try to sign out even if QA clear fails
    try {
      await signOut({
        callbackUrl,
        redirect
      });
    } catch (fallbackError) {
      console.error("Fallback logout also failed:", fallbackError);
    }
  }
};

