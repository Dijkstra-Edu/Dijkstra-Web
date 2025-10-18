"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { checkOnboardingStatusQuery } from "@/server/dataforge/User/QueryOptions/user.queryOptions";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Check if we just came back from OAuth
  const justLoggedIn = searchParams.get('callback') === 'true';
  const githubUsername = (session?.user as any)?.login;

  // Query onboarding status after successful OAuth
  const { data: onboardingStatus, isLoading: isCheckingStatus } = useQuery({
    ...checkOnboardingStatusQuery(githubUsername),
    enabled: !!githubUsername && justLoggedIn,
  });

  // Redirect based on onboarding status
  useEffect(() => {
    if (justLoggedIn && onboardingStatus) {
      console.log('🔍 Login verification:', { githubUsername, onboarded: onboardingStatus.onboarded });
      
      if (onboardingStatus.onboarded) {
        console.log('✅ User onboarded, redirecting to dashboard');
        window.location.href = '/dashboard';
      } else {
        console.log('➡️ User not onboarded, redirecting to onboarding');
        window.location.href = '/onboarding';
      }
    }
  }, [onboardingStatus, justLoggedIn, githubUsername]);

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      const result = await signIn("github", {
        callbackUrl: "/login?callback=true",
        redirect: false,
      });

      if (result?.error) {
        console.error("GitHub login failed:", result.error);
        alert("Login failed. Please try again.");
        setIsLoggingIn(false);
        return;
      }

      // If login is successful
      if (result?.ok && result.url) {
        if (!localStorage.getItem("githubActionsDone")) {
          try {
            await fetch("/api/github-actions");
            localStorage.setItem("githubActionsDone", "true");
          } catch (err) {
            console.warn("GitHub actions failed", err);
          }
        }

        // Now manually redirect
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred. Please try again later.");
      setIsLoggingIn(false);
    }
  };

  // Show loading state during callback verification
  if (justLoggedIn && githubUsername) {
    return (
      <div className={cn("flex flex-col gap-6", className)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <img src="/icon.png" alt="Dijkstra GPT logo" className="h-32 w-32" />
          <h1 className="text-2xl font-bold">Verifying your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Please wait while we check your account status...
          </p>
        </div>
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <a href="#" className="flex items-center font-medium text-lg">
          <img src="/icon.png" alt="Dijkstra GPT logo" className="h-32 w-32" />
        </a>
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Dijkstra identities work primarily though GitHub.
        </p>
      </div>
      <div className="grid gap-6">
        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
          onClick={handleLogin}
          disabled={isLoggingIn || isCheckingStatus}
        >
          {isCheckingStatus ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying your account...
            </>
          ) : isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Redirecting to GitHub...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              Login with GitHub
            </>
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Do not have GitHub (or) First Time User?{" "}
        <a href="/onboarding" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
