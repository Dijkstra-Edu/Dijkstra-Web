import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { updateOnboardingUserState } from "@/lib/onboarding/onboarding-auth";
import {
  useOnboardingValidation,
  type OAuthConnectionFlags,
} from "./use-onboarding-validation";

export type { OAuthConnectionFlags };
import type { OnboardingFormData } from "@/types/client/onboarding/onboarding";
import type { StepId } from "@/lib/onboarding/onboarding-steps";
import { ONBOARDING_STEPS_METADATA } from "@/lib/onboarding/onboarding-steps";
const TOTAL_STEPS = 7;

export interface SessionUserFields {
  username: string;
  onboardingStep: number;
  completedOnboarding: boolean;
}

export function useOnboardingNavigation(
  formData: OnboardingFormData,
  sessionFields: SessionUserFields | null,
  oauth: OAuthConnectionFlags
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetch } = authClient.useSession();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { canProceed, errors: stepValidationErrors } =
    useOnboardingValidation(formData, currentStep, oauth);

  const completedSteps = useMemo((): StepId[] => {
    return ONBOARDING_STEPS_METADATA.filter(
      (s) => s.stepNumber > 0 && s.stepNumber < currentStep
    ).map((s) => s.id);
  }, [currentStep]);

  const lastSyncedUsername = useRef<string | null>(null);

  useEffect(() => {
    const un = sessionFields?.username ?? null;
    if (un !== null && un === lastSyncedUsername.current) return;
    lastSyncedUsername.current = un;
    if (!sessionFields?.username) return;
    if (sessionFields.completedOnboarding) return;
    const s = sessionFields.onboardingStep;
    if (s >= 2) {
      setShowOnboarding(true);
      setCurrentStep(Math.min(Math.max(s, 1), TOTAL_STEPS));
    }
  }, [sessionFields]);

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (!stepParam) return;
    const n = Number.parseInt(stepParam, 10);
    if (Number.isNaN(n) || n < 1 || n > TOTAL_STEPS) return;
    setShowOnboarding(true);
    setCurrentStep(n);
    const url = new URL(window.location.href);
    url.searchParams.delete("step");
    if (url.searchParams.toString() === "") {
      window.history.replaceState({}, "", "/onboarding");
    } else {
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const persistStep = useCallback(
    async (step: number) => {
      await updateOnboardingUserState(authClient, { onboardingStep: step });
      await refetch();
    },
    [refetch]
  );

  const handleGetStarted = useCallback(async () => {
    setShowOnboarding(true);
    setCurrentStep(1);
    router.replace("/onboarding?step=1", { scroll: false });
    await persistStep(1);
  }, [router, persistStep]);

  const nextStep = useCallback(async () => {
    if (!canProceed) return;
    if (currentStep >= TOTAL_STEPS) return;
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    router.replace(`/onboarding?step=${newStep}`, { scroll: false });
    await persistStep(newStep);
  }, [canProceed, currentStep, router, persistStep]);

  const prevStep = useCallback(async () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      router.replace(`/onboarding?step=${newStep}`, { scroll: false });
      await persistStep(newStep);
    } else if (currentStep === 1) {
      setShowOnboarding(false);
      setCurrentStep(0);
      router.replace("/onboarding", { scroll: false });
      await persistStep(1);
    }
  }, [currentStep, router, persistStep]);

  const currentStepConfig = ONBOARDING_STEPS_METADATA.find(
    (s) => s.stepNumber === currentStep
  );

  return {
    showOnboarding,
    currentStep,
    completedSteps,
    canProceed,
    stepValidationErrors,
    totalSteps: TOTAL_STEPS,
    steps: ONBOARDING_STEPS_METADATA,
    currentStepConfig,
    nextStep,
    prevStep,
    handleGetStarted,
    persistStep,
  };
}
