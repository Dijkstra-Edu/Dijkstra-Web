import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OnboardingFormData, OnboardingUIState } from '@/types/onboarding';

export type StepId =
  | "welcome"
  | "github"
  | "git"
  | "vscode"
  | "discord"
  | "linkedin"
  | "leetcode"
  | "career";

interface OnboardingState {
  // Form data
  formData: OnboardingFormData;
  
  // UI state (not persisted)
  uiState: OnboardingUIState;
  
  // Step management
  currentStep: number;
  showOnboarding: boolean;
  completedSteps: StepId[];
  
  // Actions
  updateFormData: (updates: Partial<OnboardingFormData>) => void;
  updateUIState: (updates: Partial<OnboardingUIState>) => void;
  toggleSection: (section: string) => void;
  
  // Step navigation
  setCurrentStep: (step: number) => void;
  setShowOnboarding: (show: boolean) => void;
  markStepComplete: (stepId: StepId) => void;
  reset: () => void;
  clear: () => void;
}

const DEFAULT_FORM_DATA: OnboardingFormData = {
  gitSetup: null,
  cliKnowledge: null,
  discordJoined: null,
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

const DEFAULT_UI_STATE: OnboardingUIState = {
  expandedSections: {},
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      // Initial state
      formData: DEFAULT_FORM_DATA,
      uiState: DEFAULT_UI_STATE,
      currentStep: 0,
      showOnboarding: false,
      completedSteps: [],

      // Form data actions
      updateFormData: (updates) =>
        set((state) => ({
          formData: { ...state.formData, ...updates },
        })),

      // UI state actions (not persisted by default)
      updateUIState: (updates) =>
        set((state) => ({
          uiState: { ...state.uiState, ...updates },
        })),

      toggleSection: (section) =>
        set((state) => ({
          uiState: {
            ...state.uiState,
            expandedSections: {
              ...state.uiState.expandedSections,
              [section]: !state.uiState.expandedSections[section],
            },
          },
        })),

      // Step navigation actions
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setShowOnboarding: (show) => set({ showOnboarding: show }),

      markStepComplete: (stepId) =>
        set((state) => {
          if (state.completedSteps.includes(stepId)) {
            return state;
          }
          return {
            completedSteps: [...state.completedSteps, stepId],
          };
        }),

      reset: () =>
        set({
          formData: DEFAULT_FORM_DATA,
          uiState: DEFAULT_UI_STATE,
          currentStep: 0,
          showOnboarding: false,
          completedSteps: [],
        }),

      clear: () =>
        set({
          formData: DEFAULT_FORM_DATA,
          uiState: DEFAULT_UI_STATE,
          currentStep: 0,
          showOnboarding: false,
          completedSteps: [],
        }),
    }),
    {
      name: 'dijkstra-onboarding-state',
      version: 1,
      // Only persist form data and step state, not UI state
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        showOnboarding: state.showOnboarding,
        completedSteps: state.completedSteps,
      }),
      // Migration logic if we need to update schema in future
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Handle migration from old localStorage format if needed
          return {
            formData: persistedState.formData || DEFAULT_FORM_DATA,
            currentStep: persistedState.currentStep || 0,
            showOnboarding: persistedState.showOnboarding || false,
            completedSteps: persistedState.completedSteps || [],
          };
        }
        return persistedState;
      },
    }
  )
);

