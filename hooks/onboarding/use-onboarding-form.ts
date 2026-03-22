import { useCallback, useState } from "react";
import type { OnboardingFormData } from "@/types/client/onboarding/onboarding";

const INITIAL: OnboardingFormData = {
  gitSetup: null,
  cliKnowledge: null,
  leetcodeHandle: "",
  linkedinHandle: "",
  primarySpecialization: "",
  secondarySpecializations: [],
  timeToUpskill: 0,
  expectedSalary: "",
  selectedTools: [],
  dreamCompany: "",
  dreamRole: "",
};

/** Ephemeral form state for onboarding (not persisted). */
export function useOnboardingForm() {
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL);

  const updateFields = useCallback((updates: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  return { formData, updateFields };
}
