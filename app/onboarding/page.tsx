"use client";

import { useEffect } from "react";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import { StepNavigation } from "@/components/onboarding/step-navigation";
import { useOnboardingState } from "@/hooks/onboarding/use-onboarding-state";
import { useOnboardingSteps } from "@/hooks/onboarding/use-onboarding-steps";
import type { StepId } from "@/lib/Zustand/onboarding-store";
import { useOAuthAccounts } from "@/hooks/onboarding/use-oauth-accounts";
import { useOnboardingValidation } from "@/hooks/onboarding/use-onboarding-validation";
import { WelcomeStep } from "./steps/step-welcome";
import { GitHubStep } from "./steps/step-github";
import { GitStep } from "./steps/step-git";
import { VSCodeStep } from "./steps/step-vscode";
import { DiscordStep } from "./steps/step-discord";
import { LinkedInStep } from "./steps/step-linkedin";
import { LeetCodeStep } from "./steps/step-leetcode";
import { CareerStep } from "./steps/step-career";
import { CompletionStep } from "./steps/step-completion";

export default function Page() {
  // State management
  const {
    formData,
    uiState,
    updateFields,
    updateUIState,
    toggleSection,
  } = useOnboardingState();

  // OAuth account connections
  const {
    githubConnected,
    linkedinConnected,
    githubUsername,
  } = useOAuthAccounts();

  // Step navigation
  const {
    showOnboarding,
    currentStep,
    completedSteps,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    markStepComplete,
    handleGetStarted,
    isStepCompleted,
  } = useOnboardingSteps(formData);

  // Validation
  const { canProceed } = useOnboardingValidation(formData, currentStep);

  // Guard: Ensure GitHub is connected before allowing onboarding progress
  // Exclude step 5 (LinkedIn) to prevent race condition during session update
  useEffect(() => {
    if (showOnboarding && !githubConnected && currentStep > 1 && currentStep !== 5) {
      // If user tries to progress without GitHub, redirect to GitHub step
      goToStep(1);
    }
  }, [showOnboarding, githubConnected, currentStep, goToStep]);

  // Auto-complete steps when OAuth connects
  useEffect(() => {
    if (githubConnected && !isStepCompleted("github")) {
      markStepComplete("github");
    }
  }, [githubConnected, isStepCompleted, markStepComplete]);

  useEffect(() => {
    if (linkedinConnected && !isStepCompleted("linkedin")) {
      markStepComplete("linkedin");
    }
  }, [linkedinConnected, isStepCompleted, markStepComplete]);

  // Render current step
  const renderStep = () => {
    if (!showOnboarding) {
      return <WelcomeStep onGetStarted={handleGetStarted} />;
    }

    const stepProps = {
      formData,
      updateFormData: updateFields,
      canProceed,
      uiState,
      updateUIState,
      onComplete: () => markStepComplete("github" as StepId),
      currentStep,
      completedSteps,
      onStepClick: goToStep,
      onMarkComplete: markStepComplete,
      onNext: nextStep,
    };

    switch (currentStep) {
      case 1:
        return (
          <GitHubStep
            {...stepProps}
            githubConnected={githubConnected}
            githubUsername={githubUsername}
            onComplete={() => markStepComplete("github")}
          />
        );
      case 2:
        return <GitStep {...stepProps} />;
      case 3:
        return <VSCodeStep {...stepProps} />;
      case 4:
        return <DiscordStep {...stepProps} />;
      case 5:
        return (
          <LinkedInStep
            {...stepProps}
            linkedinConnected={linkedinConnected}
          />
        );
      case 6:
        return <LeetCodeStep {...stepProps} />;
      case 7:
        return <CareerStep {...stepProps} />;
      case 8:
        return <CompletionStep />;
      default:
        return <WelcomeStep onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <BackgroundPaths title="" showButton={false}>
      <div className="w-full max-w-6xl h-[85vh] sm:h-[90vh] relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Semi-transparent background rectangle */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl" />

        {/* Scrollable content container */}
        <div className="relative h-full overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex items-center justify-center">
          {/* Main Content */}
          <div className="w-full flex flex-col">
            <div className="flex-1">{renderStep()}</div>

            {/* Navigation Buttons - Only show when in onboarding flow */}
            {showOnboarding && currentStep > 0 && currentStep < 8 && (
              <StepNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                canProceed={canProceed}
                onPrev={prevStep}
                onNext={nextStep}
                isLastStep={currentStep === 7}
              />
            )}
          </div>
        </div>
      </div>
    </BackgroundPaths>
  );
}
