import { useMemo } from "react";
import type { OnboardingFormData } from "@/types/onboarding";
import { useOAuthAccounts } from "./use-oauth-accounts";

/**
 * Validates LeetCode username format
 */
function isValidLeetCodeUsername(value: string): boolean {
  const normalized = value.trim();
  if (normalized.length === 0) return false;
  const pattern = /^[A-Za-z0-9_-]{3,20}$/;
  return pattern.test(normalized);
}

/**
 * Hook for validating onboarding steps
 * Returns validation status and errors for each step
 */
export function useOnboardingValidation(
  formData: OnboardingFormData,
  currentStep: number
) {
  const { githubConnected, linkedinConnected } = useOAuthAccounts();

  const validation = useMemo(() => {
    const errors: Record<number, string[]> = {};
    const isValid: Record<number, boolean> = {};

    // Step 1: GitHub
    isValid[1] = githubConnected;
    if (!isValid[1]) {
      errors[1] = ["GitHub account must be connected"];
    }

    // Step 2: Git
    isValid[2] = formData.gitSetup !== null;
    if (!isValid[2]) {
      errors[2] = ["Please indicate if you have set up Git"];
    }

    // Step 3: VS Code
    isValid[3] = formData.cliKnowledge !== null;
    if (!isValid[3]) {
      errors[3] = ["Please indicate if you are familiar with CLI"];
    }

    // Step 4: Discord
    isValid[4] = formData.discordJoined !== null;
    if (!isValid[4]) {
      errors[4] = ["Please indicate if you have joined Discord"];
    }

    // Step 5: LinkedIn
    isValid[5] = linkedinConnected && formData.linkedinHandle.trim() !== "";
    if (!linkedinConnected) {
      errors[5] = errors[5] || [];
      errors[5].push("LinkedIn account must be connected");
    }
    if (linkedinConnected && formData.linkedinHandle.trim() === "") {
      errors[5] = errors[5] || [];
      errors[5].push("LinkedIn username is required");
    }

    // Step 6: LeetCode
    isValid[6] = isValidLeetCodeUsername(formData.leetcodeHandle);
    if (!isValid[6] && formData.leetcodeHandle.trim() !== "") {
      errors[6] = [
        "LeetCode username must be 3-20 characters and contain only letters, numbers, underscores, or hyphens",
      ];
    } else if (!isValid[6]) {
      errors[6] = ["Valid LeetCode username is required"];
    }

    // Step 7: Career Planning
    isValid[7] =
      formData.primarySpecialization !== "" &&
      formData.secondarySpecializations.length === 3 &&
      formData.timeToUpskill > 0 &&
      formData.timeToUpskill <= 120 &&
      formData.expectedSalary !== "" &&
      formData.selectedTools.length > 0 &&
      formData.dreamCompany !== "" &&
      formData.dreamRole !== "";

    if (!isValid[7]) {
      errors[7] = [];
      if (formData.primarySpecialization === "") {
        errors[7].push("Primary specialization is required");
      }
      if (formData.secondarySpecializations.length !== 3) {
        errors[7].push("Exactly 3 secondary specializations are required");
      }
      if (formData.timeToUpskill <= 0 || formData.timeToUpskill > 120) {
        errors[7].push("Time to upskill must be between 1 and 120 months");
      }
      if (formData.expectedSalary === "") {
        errors[7].push("Expected salary range is required");
      }
      if (formData.selectedTools.length === 0) {
        errors[7].push("At least one tool must be selected");
      }
      if (formData.dreamCompany === "") {
        errors[7].push("Dream company is required");
      }
      if (formData.dreamRole === "") {
        errors[7].push("Dream role is required");
      }
    }

    return { isValid, errors };
  }, [formData, githubConnected, linkedinConnected]);

  const canProceed = validation.isValid[currentStep] ?? false;
  const errors = validation.errors[currentStep] ?? [];

  return {
    canProceed,
    errors,
    isValid: validation.isValid,
    allErrors: validation.errors,
  };
}

