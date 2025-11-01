/**
 * Type definitions for onboarding system
 */

export interface OnboardingFormData {
  gitSetup: boolean | null;
  cliKnowledge: boolean | null;
  discordJoined: boolean | null;
  leetcodeHandle: string;
  linkedinHandle: string;
  primarySpecialization: string;
  secondarySpecializations: string[];
  timeToUpskill: number;
  expectedSalary: string;
  selectedTools: string[];
  dreamCompany: string;
  dreamRole: string;
}

export interface OnboardingUIState {
  expandedSections: Record<string, boolean>;
}

export interface OAuthAccountData {
  github?: {
    id: string;
    login: string;
    avatar_url?: string;
    bio?: string;
    followers?: number;
    following?: number;
    public_repos?: number;
    company?: string;
    location?: string;
    blog?: string;
    created_at?: string;
    updated_at?: string;
    organization?: string;
    hireable?: boolean;
  };
  linkedin?: {
    linkedinId: string;
    linkedinName: string;
    linkedinImage?: string;
  };
}

export interface StepProps {
  onComplete: () => void;
  formData: OnboardingFormData;
  updateFormData: (updates: Partial<OnboardingFormData>) => void;
  canProceed: boolean;
  uiState: OnboardingUIState;
  updateUIState: (updates: Partial<OnboardingUIState>) => void;
}

// Alias for consistency with hook naming
export type UpdateFormData = StepProps["updateFormData"];

