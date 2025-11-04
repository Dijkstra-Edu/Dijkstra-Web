import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOnboardingValidation } from "./use-onboarding-validation";
import { useOnboardingStore, type StepId } from "@/lib/Zustand/onboarding-store";

export interface StepConfig {
  id: StepId;
  stepNumber: number;
  title: string;
}

const STEPS: StepConfig[] = [
  { id: "welcome", stepNumber: 0, title: "Welcome" },
  { id: "github", stepNumber: 1, title: "GitHub" },
  { id: "git", stepNumber: 2, title: "Git" },
  { id: "vscode", stepNumber: 3, title: "VS Code" },
  { id: "discord", stepNumber: 4, title: "Discord" },
  { id: "linkedin", stepNumber: 5, title: "LinkedIn" },
  { id: "leetcode", stepNumber: 6, title: "LeetCode" },
  { id: "career", stepNumber: 7, title: "General Info" },
];

const TOTAL_STEPS = 7; // Excluding welcome step

/**
 * Hook to manage onboarding step navigation and completion
 * Uses Zustand store for state persistence
 */
export function useOnboardingSteps(formData: Parameters<typeof useOnboardingValidation>[0]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get state from store
  const showOnboarding = useOnboardingStore((state) => state.showOnboarding);
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const completedSteps = useOnboardingStore((state) => state.completedSteps);
  
  // Validation
  const { canProceed } = useOnboardingValidation(formData, currentStep);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const setShowOnboarding = useOnboardingStore((state) => state.setShowOnboarding);
  const markStepComplete = useOnboardingStore((state) => state.markStepComplete);

  // Check for step parameter in URL on mount
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const stepNumber = Number.parseInt(stepParam);
      if (stepNumber >= 1 && stepNumber <= TOTAL_STEPS) {
        setShowOnboarding(true);
        setCurrentStep(stepNumber);
        // Don't clear URL parameters - preserve linkedin_success and other OAuth callback params
        // Only clear the 'step' param while keeping others
        const url = new URL(window.location.href);
        url.searchParams.delete("step");
        // Only update URL if there are no other important params (like linkedin_success)
        // Otherwise let the components handle their own URL cleanup
        if (url.searchParams.toString() === "") {
          window.history.replaceState({}, "", "/onboarding");
        } else {
          // Keep other params like linkedin_success=true
          window.history.replaceState({}, "", url.toString());
        }
      }
    }
  }, [searchParams, setShowOnboarding, setCurrentStep]);

  // Update URL with current step
  const updateUrlStep = useCallback(
    (step: number) => {
      router.replace(`/onboarding?step=${step}`, { scroll: false });
    },
    [router]
  );

  // Enhanced markStepComplete that also handles auto-advance
  const markStepCompleteWithAdvance = useCallback(
    (stepId: StepId) => {
      const state = useOnboardingStore.getState();
      if (!state.completedSteps.includes(stepId)) {
        markStepComplete(stepId);
        
        // Auto-advance if we're on this step or before it
        setTimeout(() => {
          const currentState = useOnboardingStore.getState();
          const stepConfig = STEPS.find((s) => s.id === stepId);
          if (!stepConfig) return;

          const stepNumber = stepConfig.stepNumber;

          // Only advance if we're on or before this step and not on the last step
          if (currentState.currentStep <= stepNumber && currentState.currentStep < TOTAL_STEPS) {
            const next = currentState.currentStep + 1;
            updateUrlStep(next);
            setCurrentStep(next);
          }
        }, 1000);
      }
    },
    [markStepComplete, setCurrentStep, updateUrlStep]
  );

  // Navigation functions
  const nextStep = useCallback(() => {
    const state = useOnboardingStore.getState();
    if (state.currentStep < TOTAL_STEPS) {
      const newStep = state.currentStep + 1;
      setCurrentStep(newStep);
      updateUrlStep(newStep);
    }
  }, [setCurrentStep, updateUrlStep]);

  const prevStep = useCallback(() => {
    const state = useOnboardingStore.getState();
    if (state.currentStep > 1) {
      const newStep = state.currentStep - 1;
      setCurrentStep(newStep);
      updateUrlStep(newStep);
    } else if (state.currentStep === 1) {
      setShowOnboarding(false);
      setCurrentStep(0);
      router.replace("/onboarding", { scroll: false });
    }
  }, [setCurrentStep, setShowOnboarding, updateUrlStep, router]);

  const goToStep = useCallback(
    (stepIndex: number) => {
      // Allow navigation to step 8 (completion page)
      if (stepIndex >= 0 && stepIndex <= TOTAL_STEPS + 1) {
        setCurrentStep(stepIndex);
        updateUrlStep(stepIndex);
      }
    },
    [setCurrentStep, updateUrlStep]
  );

  const handleGetStarted = useCallback(() => {
    setShowOnboarding(true);
    setCurrentStep(1);
    updateUrlStep(1);
  }, [setShowOnboarding, setCurrentStep, updateUrlStep]);

  // Get current step config
  const currentStepConfig = STEPS.find((s) => s.stepNumber === currentStep);

  return {
    showOnboarding,
    currentStep,
    completedSteps,
    canProceed,
    totalSteps: TOTAL_STEPS,
    steps: STEPS,
    currentStepConfig,
    nextStep,
    prevStep,
    goToStep,
    markStepComplete: markStepCompleteWithAdvance,
    handleGetStarted,
    isStepCompleted: (stepId: StepId) => completedSteps.includes(stepId),
  };
}
export { StepId };

