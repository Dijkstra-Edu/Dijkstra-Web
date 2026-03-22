/**
 * Type definitions for onboarding system
 */

export interface OnboardingFormData {
  gitSetup: boolean | null;
  cliKnowledge: boolean | null;
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
