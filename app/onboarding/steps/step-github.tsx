"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import type { StepProps } from "@/types/onboarding";
import type { StepId } from "@/lib/Zustand/onboarding-store";

interface GitHubStepProps extends StepProps {
  currentStep: number;
  completedSteps: StepId[];
  githubConnected: boolean;
  githubUsername: string;
  onStepClick?: (step: number) => void;
}

export function GitHubStep({
  currentStep,
  completedSteps,
  githubConnected,
  githubUsername,
  onStepClick,
  onComplete,
}: GitHubStepProps) {
  const [authRedirecting, setAuthRedirecting] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await signIn("github", {
        callbackUrl: "/onboarding?step=2",
        redirect: false,
      });

      if (result?.error) {
        console.error("GitHub login failed:", result.error);
        alert("Login failed. Please try again.");
        return;
      }

      if (result?.ok && result.url) {
        // LinkedIn data is stored in cookies, so it will be preserved automatically
        // GitHub actions trigger (optional)
        if (!localStorage.getItem("githubActionsDone")) {
          try {
            await fetch("/api/github-actions");
            localStorage.setItem("githubActionsDone", "true");
          } catch (err) {
            console.warn("GitHub actions failed", err);
          }
        }

        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="space-y-6 h-[600px]">
      <StepIndicator
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={onStepClick}
      />

      {/* Header Section */}
      <div className="text-center space-y-4 pt-12 sm:pt-16 lg:pt-24">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <Github className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-2"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Connect GitHub
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Connect your GitHub account to get started with your coding journey
          </p>
        </motion.div>
      </div>

      {/* Main Action Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-sm mx-auto"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            {/* Sign in button */}
            <div className="space-y-3">
              {githubConnected ? (
                <Button
                  className="w-full h-12 text-base cursor-default font-semibold bg-green-600 text-white rounded-xl transition-all duration-200"
                  size="lg"
                  disabled
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  GitHub Connected @{githubUsername}
                </Button>
              ) : (
                <Button
                  className="w-full h-12 text-base cursor-pointer font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  size="lg"
                  disabled={authRedirecting}
                  onClick={() => {
                    setAuthRedirecting(true);
                    handleLogin();
                  }}
                >
                  {authRedirecting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <Github className="w-5 h-5 mr-2" />
                      Sign in with GitHub
                    </>
                  )}
                </Button>
              )}

              <p className="text-sm text-gray-500 text-center">
                We'll redirect you to GitHub's secure sign-in page
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-transparent text-gray-400">
                  New To GitHub?
                </span>
              </div>
            </div>

            {/* Setup Guide Link */}
            <div className="text-center">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm"
                asChild
              >
                <a href={`/onboarding/github?step=${currentStep}`}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View GitHub Setup Guide
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Note */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          🔒 Your data is secure. We only access basic profile information to
          personalize your experience.
        </p>
      </motion.div>
    </div>
  );
}

