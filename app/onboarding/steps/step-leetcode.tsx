"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { CustomIcon } from "./shared-components";
import type { StepProps } from "@/types/onboarding";
import type { StepId } from "@/lib/Zustand/onboarding-store";

interface LeetCodeStepProps extends StepProps {
  currentStep: number;
  completedSteps: StepId[];
  onStepClick?: (step: number) => void;
  onMarkComplete: (stepId: StepId) => void;
}

function isValidLeetCodeUsername(value: string): boolean {
  const normalized = value.trim();
  if (normalized.length === 0) return false;
  const pattern = /^[A-Za-z0-9_-]{3,20}$/;
  return pattern.test(normalized);
}

export function LeetCodeStep({
  currentStep,
  completedSteps,
  formData,
  updateFormData,
  onStepClick,
  onMarkComplete,
}: LeetCodeStepProps) {
  const [localLeetCodeHandle, setLocalLeetCodeHandle] = useState(
    formData.leetcodeHandle
  );
  const [checking, setChecking] = useState(false);
  const [exists, setExists] = useState<boolean | null>(null);
  const [lastCheckedUsername, setLastCheckedUsername] = useState<string>("");

  useEffect(() => {
    setLocalLeetCodeHandle(formData.leetcodeHandle);
  }, [formData.leetcodeHandle]);

  // Debounced existence check
  useEffect(() => {
    const value = localLeetCodeHandle.trim();

    if (!isValidLeetCodeUsername(value)) {
      setExists(null);
      setChecking(false);
      setLastCheckedUsername("");
      return;
    }

    if (value === lastCheckedUsername) {
      return;
    }

    setChecking(true);
    setExists(null);

    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/leetcode-user-exists?u=${encodeURIComponent(value)}`
        );
        const data = await res.json();

        if (!res.ok) {
          setExists(false);
        } else {
          setExists(Boolean(data.exists));
          setLastCheckedUsername(value);
        }
      } catch (error) {
        setExists(false);
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(id);
  }, [localLeetCodeHandle, lastCheckedUsername]);

  const handleSave = () => {
    updateFormData({ leetcodeHandle: localLeetCodeHandle });
    onMarkComplete("leetcode");
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
          className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <CustomIcon iconType="leetcode" className="w-8 h-8" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Setup LeetCode
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Practice coding problems and improve your skills
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="leetcode-handle"
                className="text-gray-900 dark:text-white text-sm"
              >
                What's your LeetCode handle?
              </Label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center">
                <Input
                  id="leetcode-handle"
                  placeholder="Enter your LeetCode username"
                  value={localLeetCodeHandle}
                  onChange={(e) => setLocalLeetCodeHandle(e.target.value)}
                  className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 text-sm h-10 sm:h-9"
                />
                {localLeetCodeHandle.trim() !== "" && (
                  !isValidLeetCodeUsername(localLeetCodeHandle) ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : checking ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  ) : exists === true ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : exists === false ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : null
                )}
                <Button
                  onClick={handleSave}
                  disabled={
                    !(
                      isValidLeetCodeUsername(localLeetCodeHandle) &&
                      exists === true
                    )
                  }
                  className="px-4 h-10 sm:h-9 w-full sm:w-auto"
                  size="sm"
                >
                  Save
                </Button>
              </div>
            </div>
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
          <a href={`/onboarding/leetcode?step=${currentStep}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View LeetCode Setup Guide
          </a>
        </Button>
      </div>
    </div>
  );
}

