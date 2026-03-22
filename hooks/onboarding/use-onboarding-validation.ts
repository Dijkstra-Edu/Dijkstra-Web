import { useMemo } from "react";
import type { OnboardingFormData } from "@/types/client/onboarding/onboarding";
import { isValidLeetCodeUsername } from "@/lib/onboarding/leetcode-username";

/** Passed from the parent so useOAuthAccounts runs once per page. */
export interface OAuthConnectionFlags {
  githubConnected: boolean;
  linkedinConnected: boolean;
  discordConnected: boolean;
}

/**
 * Hook for validating onboarding steps
 * Returns validation status and errors for each step
 */
export function useOnboardingValidation(
  formData: OnboardingFormData,
  currentStep: number,
  oauth: OAuthConnectionFlags
) {
  const { githubConnected, linkedinConnected, discordConnected } = oauth;

  const validation = useMemo(() => {
    const errors: Record<number, string[]> = {};
    const isValid: Record<number, boolean> = {};

    // Step 1: GitHub
    isValid[1] = githubConnected;
    if (!isValid[1]) {
      errors[1] = ["GitHub account must be connected"];
    }

    // Step 2: Git — must confirm setup (Yes)
    isValid[2] = formData.gitSetup === true;
    if (!isValid[2]) {
      errors[2] =
        formData.gitSetup === false
          ? ["Please set up Git using the guide below, then choose Yes to continue"]
          : ["Please confirm you have set up Git (select Yes)"];
    }

    // Step 3: VS Code / CLI — must confirm familiarity (Yes)
    isValid[3] = formData.cliKnowledge === true;
    if (!isValid[3]) {
      errors[3] =
        formData.cliKnowledge === false
          ? [
              "Please review the VS Code guide below, then choose Yes when you are comfortable with the CLI",
            ]
          : ["Please confirm you are familiar with the CLI (select Yes)"];
    }

    // Step 4: Discord (OAuth link — same pattern as LinkedIn step 5)
    isValid[4] = discordConnected;
    if (!isValid[4]) {
      errors[4] = ["Discord account must be linked"];
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
      formData.timeToUpskill <= 60 &&
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
      if (formData.timeToUpskill <= 0 || formData.timeToUpskill > 60) {
        errors[7].push("Time to upskill must be between 1 and 60 months (5 years)");
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
  }, [formData, githubConnected, linkedinConnected, discordConnected]);

  const canProceed = validation.isValid[currentStep] ?? false;
  const errors = validation.errors[currentStep] ?? [];

  return {
    canProceed,
    errors,
    isValid: validation.isValid,
    allErrors: validation.errors,
  };
}

