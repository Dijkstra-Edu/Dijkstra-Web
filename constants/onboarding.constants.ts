export const ONBOARDING_CONCEPT_GUIDES = {
  github: {
    href: "/onboarding/guides/github",
    label: "Understanding GitHub",
  },
  git: {
    href: "/onboarding/guides/git",
    label: "Understanding Git",
  },
  vscode: {
    href: "/onboarding/guides/vscode",
    label: "Understanding VS Code",
  },
  discord: {
    href: "/onboarding/guides/discord",
    label: "Understanding Discord",
  },
  linkedin: {
    href: "/onboarding/guides/linkedin",
    label: "Understanding LinkedIn",
  },
  leetcode: {
    href: "/onboarding/guides/leetcode",
    label: "Understanding LeetCode",
  },
} as const;

export type OnboardingGuideKey = keyof typeof ONBOARDING_CONCEPT_GUIDES;

export const VS_CODE_DOWNLOAD = "https://code.visualstudio.com/download";
