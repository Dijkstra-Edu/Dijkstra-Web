"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import type { StepProps } from "@/types/onboarding";
import type { StepId } from "@/lib/Zustand/onboarding-store";

interface LinkedInStepProps extends StepProps {
  currentStep: number;
  completedSteps: StepId[];
  linkedinConnected: boolean;
  onStepClick?: (step: number) => void;
  onMarkComplete: (stepId: StepId) => void;
}

export function LinkedInStep({
  currentStep,
  completedSteps,
  formData,
  updateFormData,
  linkedinConnected,
  onStepClick,
  onMarkComplete,
}: LinkedInStepProps) {
  const searchParams = useSearchParams();
  const [localLinkedInHandle, setLocalLinkedInHandle] = useState(
    formData.linkedinHandle
  );
  const [authRedirecting, setAuthRedirecting] = useState(false);
  const hasProcessedCallbackRef = useRef(false);

  useEffect(() => {
    setLocalLinkedInHandle(formData.linkedinHandle);
  }, [formData.linkedinHandle]);

  // Handle LinkedIn OAuth callback success/error
  useEffect(() => {
    if (hasProcessedCallbackRef.current) {
      return;
    }
    
    const success = searchParams.get("linkedin_success");
    const error = searchParams.get("linkedin_error");
    
    if (success === "true") {
      const timer = setTimeout(() => {
        if (hasProcessedCallbackRef.current) {
          return;
        }
        hasProcessedCallbackRef.current = true;
        
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = decodeURIComponent(value);
          return acc;
        }, {} as Record<string, string>);
        
        const linkedinDataStr = cookies['linkedinData'];
        
        if (linkedinDataStr) {
          try {
            JSON.parse(linkedinDataStr);
            
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete("linkedin_success");
            window.history.replaceState({}, "", newUrl.toString());
            
            setAuthRedirecting(false);
            window.location.reload();
          } catch (err) {
            alert("Failed to verify LinkedIn connection. Please try again.");
            setAuthRedirecting(false);
            hasProcessedCallbackRef.current = false;
          }
        } else {
          alert("LinkedIn connection may not have been saved. Please refresh the page to check.");
          setAuthRedirecting(false);
          hasProcessedCallbackRef.current = false;
        }
      }, 300);
      
      return () => clearTimeout(timer);
    } else if (error) {
      hasProcessedCallbackRef.current = true;
      setAuthRedirecting(false);
      alert(`LinkedIn connection failed: ${error}`);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("linkedin_error");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [searchParams]);

  const handleLinkedInLogin = async () => {
    try {
      setAuthRedirecting(true);
      window.location.href = "/api/auth/linkedin-link";
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
      setAuthRedirecting(false);
    }
  };

  const handleSave = () => {
    updateFormData({ linkedinHandle: localLinkedInHandle });
    onMarkComplete("linkedin");
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
          className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <IconBrandLinkedin className="w-8 h-8 text-white" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Setup LinkedIn
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Build your professional network
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            {/* LinkedIn connect button */}
            <div className="space-y-2">
              {linkedinConnected ? (
                <Button
                  className="w-full h-10 text-base cursor-default font-semibold bg-green-600 text-white rounded-xl transition-all duration-200"
                  size="lg"
                  disabled
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  LinkedIn Connected
                </Button>
              ) : (
                <Button
                  className="w-full h-10 text-base font-semibold bg-[#0A66C2] hover:bg-[#0a66c2]/90 text-white rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  size="lg"
                  disabled={authRedirecting}
                  onClick={() => {
                    setAuthRedirecting(true);
                    handleLinkedInLogin();
                  }}
                >
                  {authRedirecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <IconBrandLinkedin className="w-4 h-4 mr-2" />
                      Connect LinkedIn
                    </>
                  )}
                </Button>
              )}

              <p className="text-xs text-gray-500 text-center">
                Connecting LinkedIn confirms you have a LinkedIn account. Your
                GitHub connection will be preserved.
              </p>
            </div>

            {/* LinkedIn Username Input */}
            {linkedinConnected && (
              <div className="space-y-2">
                <Label
                  htmlFor="linkedin-handle"
                  className="text-gray-900 dark:text-white text-sm"
                >
                  What's your LinkedIn username?
                </Label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center">
                  <Input
                    id="linkedin-handle"
                    placeholder="e.g., john-doe (from linkedin.com/in/john-doe)"
                    value={localLinkedInHandle}
                    onChange={(e) => setLocalLinkedInHandle(e.target.value)}
                    className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 text-sm h-10 sm:h-9"
                  />
                  <Button
                    onClick={handleSave}
                    disabled={!localLinkedInHandle.trim()}
                    className="px-4 h-10 sm:h-9 w-full sm:w-auto"
                    size="sm"
                  >
                    Save
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter your custom LinkedIn URL (e.g., "john-doe" from
                  linkedin.com/in/john-doe)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Setup Guide Link */}
      <div className="text-center">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm"
          asChild
        >
          <a href={`/onboarding/linkedin?step=${currentStep}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View LinkedIn Setup Guide
          </a>
        </Button>
      </div>
    </div>
  );
}

