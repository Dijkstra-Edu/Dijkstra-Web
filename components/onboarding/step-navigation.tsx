"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrev: () => void;
  onNext: () => void;
  isLastStep?: boolean;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  canProceed,
  onPrev,
  onNext,
  isLastStep = false,
}: StepNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 lg:p-8 border-t border-white/10 mt-6 space-y-4 sm:space-y-0">
      <Button
        variant="outline"
        onClick={onPrev}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 w-full sm:w-auto"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>

      <div className="flex flex-col items-center gap-2 order-first sm:order-none">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i + 1 === currentStep
                  ? "bg-blue-500 w-6"
                  : i + 1 < currentStep
                  ? "bg-green-500"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {!isLastStep && (
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 w-full sm:w-auto"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

