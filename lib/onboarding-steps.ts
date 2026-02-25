import { IconBrandDiscord, IconBrandLinkedin } from "@tabler/icons-react";
import { Github } from "lucide-react";
import type { StepId } from "@/hooks/onboarding/use-onboarding-steps";

export interface StepMetadata {
  id: StepId;
  stepNumber: number;
  title: string;
  icon: React.ComponentType<any> | string;
  color: string;
}

export const ONBOARDING_STEPS_METADATA: StepMetadata[] = [
  {
    id: "welcome",
    stepNumber: 0,
    title: "Welcome",
    icon: "Sparkles", // This should be imported from lucide-react when used
    color: "from-gray-900 to-gray-700",
  },
  {
    id: "github",
    stepNumber: 1,
    title: "GitHub",
    icon: Github,
    color: "from-gray-900 to-gray-700",
  },
  {
    id: "git",
    stepNumber: 2,
    title: "Git",
    icon: "git",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "vscode",
    stepNumber: 3,
    title: "VS Code",
    icon: "vscode",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "discord",
    stepNumber: 4,
    title: "Discord",
    icon: IconBrandDiscord,
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "linkedin",
    stepNumber: 5,
    title: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "from-blue-700 to-blue-800",
  },
  {
    id: "leetcode",
    stepNumber: 6,
    title: "LeetCode",
    icon: "leetcode",
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: "career",
    stepNumber: 7,
    title: "General Info",
    icon: "career",
    color: "from-purple-500 to-pink-500",
  },
];

