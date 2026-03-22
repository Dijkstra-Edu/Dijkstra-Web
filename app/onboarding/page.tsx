"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import { StepNavigation } from "@/components/onboarding/step-navigation";
import { useOnboardingForm } from "@/hooks/onboarding/use-onboarding-form";
import { useOnboardingNavigation } from "@/hooks/onboarding/use-onboarding-navigation";
import { authClient } from "@/lib/auth/auth-client";
import { WelcomeStep } from "@/app/onboarding/Steps/step-welcome";
import { OnboardingFlowBody } from "@/components/onboarding/onboarding-flow-body";
import { useOAuthAccounts } from "@/hooks/onboarding/use-oauth-accounts";

type AuthUser = {
  username: string;
  onboardingStep: number;
  completedOnboarding: boolean;
};

export default function Page() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  const sessionFields = useMemo((): AuthUser | null => {
    const u = session?.user as
      | {
          username?: string;
          onboardingStep?: number;
          completedOnboarding?: boolean;
        }
      | undefined;
    if (!u?.username) return null;
    return {
      username: u.username,
      onboardingStep: u.onboardingStep ?? 1,
      completedOnboarding: u.completedOnboarding ?? false,
    };
  }, [session?.user]);

  const { formData, updateFields } = useOnboardingForm();
  const { githubConnected, linkedinConnected, discordConnected, refreshLinkedAccounts } =
    useOAuthAccounts();

  const oauthFlags = useMemo(
    () => ({
      githubConnected,
      linkedinConnected,
      discordConnected,
    }),
    [githubConnected, linkedinConnected, discordConnected]
  );

  const {
    showOnboarding,
    currentStep,
    completedSteps,
    totalSteps,
    nextStep,
    prevStep,
    handleGetStarted,
    canProceed,
    stepValidationErrors,
  } = useOnboardingNavigation(formData, sessionFields, oauthFlags);

  useEffect(() => {
    if (isPending) return;
    if (sessionFields?.completedOnboarding) {
      router.replace("/dashboard");
    }
  }, [isPending, sessionFields?.completedOnboarding, router]);

  useEffect(() => {
    if (isPending) return;
    if (session?.user && !sessionFields?.username) {
      router.replace("/login");
    }
  }, [isPending, session?.user, sessionFields?.username, router]);

  const handleCareerFinished = useCallback(async () => {
    await refetch();
    router.push("/dashboard");
  }, [refetch, router]);

  const renderStep = () => {
    if (!sessionFields?.username) {
      return (
        <p className="text-center text-muted-foreground">
          Sign in with GitHub to continue.
        </p>
      );
    }
    if (!showOnboarding) {
      return <WelcomeStep onGetStarted={handleGetStarted} />;
    }
    return (
      <OnboardingFlowBody
        currentStep={currentStep}
        completedSteps={completedSteps}
        formData={formData}
        updateFormData={updateFields}
        onCareerFinished={handleCareerFinished}
        githubConnected={githubConnected}
        githubUsername={sessionFields.username}
        linkedinConnected={linkedinConnected}
        discordConnected={discordConnected}
        refreshLinkedAccounts={refreshLinkedAccounts}
      />
    );
  };

  if (isPending) {
    return (
      <BackgroundPaths title="" showButton={false}>
        <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
          Loading…
        </div>
      </BackgroundPaths>
    );
  }

  return (
    <BackgroundPaths title="" showButton={false}>
      <div className="relative mx-auto h-[85vh] w-full max-w-6xl px-4 sm:h-[90vh] sm:px-6 lg:px-8">
        <div className="absolute inset-0 rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl dark:bg-black/20 sm:rounded-3xl" />

        <div className="relative flex h-full flex-col overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 sm:p-6 lg:p-8">
          <div className="flex w-full flex-1 flex-col justify-center">
            {renderStep()}
          </div>

          {showOnboarding && currentStep > 0 && currentStep <= totalSteps && (
            <StepNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              canProceed={canProceed}
              validationMessages={stepValidationErrors}
              onPrev={() => void prevStep()}
              onNext={() => void nextStep()}
              isLastStep={currentStep === totalSteps}
            />
          )}
        </div>
      </div>
    </BackgroundPaths>
  );
}
