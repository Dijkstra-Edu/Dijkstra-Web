import { useCallback } from "react";
import { useOnboardingStore } from "@/lib/Zustand/onboarding-store";

/**
 * Hook to manage onboarding form state and UI state
 * Uses Zustand store with localStorage persistence
 */
export function useOnboardingState() {
  const formData = useOnboardingStore((state) => state.formData);
  const uiState = useOnboardingStore((state) => state.uiState);
  const updateFormData = useOnboardingStore((state) => state.updateFormData);
  const updateUIState = useOnboardingStore((state) => state.updateUIState);
  const toggleSection = useOnboardingStore((state) => state.toggleSection);
  const reset = useOnboardingStore((state) => state.reset);
  const clear = useOnboardingStore((state) => state.clear);

  // Update form data (single field) - helper method
  const updateField = useCallback(
    <K extends keyof typeof formData>(
      field: K,
      value: typeof formData[K]
    ) => {
      updateFormData({ [field]: value } as Partial<typeof formData>);
    },
    [updateFormData, formData]
  );

  // Update form data (multiple fields) - alias for consistency
  const updateFields = useCallback(
    (updates: Partial<typeof formData>) => {
      updateFormData(updates);
    },
    [updateFormData]
  );

  return {
    formData,
    uiState,
    updateField,
    updateFields,
    updateFormData,
    updateUIState,
    toggleSection,
    reset,
    clear,
  };
}
