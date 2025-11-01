"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { CustomIcon } from "./shared-components";
import type { StepProps } from "@/types/onboarding";
import type { StepId } from "@/lib/Zustand/onboarding-store";

interface GitStepProps extends StepProps {
  currentStep: number;
  completedSteps: StepId[];
  onStepClick?: (step: number) => void;
  onMarkComplete: (stepId: StepId) => void;
}

export function GitStep({
  currentStep,
  completedSteps,
  formData,
  updateFormData,
  onStepClick,
  onMarkComplete,
}: GitStepProps) {
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
          className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <CustomIcon iconType="git" className="w-8 h-8" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Setup Git
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Ensure Git is properly configured on your system
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4 px-4 sm:px-0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-3 text-gray-900 dark:text-white">
                Have you set up Git?
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant={formData.gitSetup === true ? "default" : "outline"}
                  onClick={() => {
                    updateFormData({ gitSetup: true });
                    onMarkComplete("git");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  Yes
                </Button>
                <Button
                  variant={formData.gitSetup === false ? "default" : "outline"}
                  onClick={() => updateFormData({ gitSetup: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  No
                </Button>
              </div>
            </div>

            {formData.gitSetup === false && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <div className="grid gap-3">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                      Documentation
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent border-white/30 text-gray-700 dark:text-gray-300 hover:bg-white/10"
                      asChild
                    >
                      <a
                        href="https://docs.dijkstra.org.in"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Dijkstra Docs
                      </a>
                    </Button>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                      Video Tutorial
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent border-white/30 text-gray-700 dark:text-gray-300 hover:bg-white/10"
                    >
                      <Play className="w-3 h-3 mr-2" />
                      Watch Tutorial
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                    Learn Git Basics
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Master the fundamentals of version control
                  </p>
                  <Button size="sm" className="w-full">
                    Start Learning
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </motion.div>
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
          <a href={`/onboarding/git?step=${currentStep}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Git Setup Guide
          </a>
        </Button>
      </div>
    </div>
  );
}

