"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { CustomIcon } from "./shared-components";
import type { StepProps } from "@/types/onboarding";
import type { StepId } from "@/lib/Zustand/onboarding-store";

interface VSCodeStepProps extends StepProps {
  currentStep: number;
  completedSteps: StepId[];
  onStepClick?: (step: number) => void;
  onMarkComplete: (stepId: StepId) => void;
}

export function VSCodeStep({
  currentStep,
  completedSteps,
  formData,
  updateFormData,
  onStepClick,
  onMarkComplete,
}: VSCodeStepProps) {
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
          className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <CustomIcon iconType="vscode" className="w-8 h-8" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Setup VS Code
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Set up your development environment
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4 px-4 sm:px-0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-3 text-gray-900 dark:text-white">
                Are you familiar with the CLI?
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant={formData.cliKnowledge === true ? "default" : "outline"}
                  onClick={() => {
                    updateFormData({ cliKnowledge: true });
                    onMarkComplete("vscode");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  Yes
                </Button>
                <Button
                  variant={formData.cliKnowledge === false ? "default" : "outline"}
                  onClick={() => updateFormData({ cliKnowledge: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  No
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
          <a href={`/onboarding/vscode?step=${currentStep}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View VS Code Setup Guide
          </a>
        </Button>
      </div>
    </div>
  );
}

