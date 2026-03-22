"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Github,
  Loader2,
  XCircle,
} from "lucide-react";
import { IconBrandDiscord, IconBrandLinkedin } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import type { OnboardingFormData } from "@/types/client/onboarding/onboarding";
import type { StepId } from "@/lib/onboarding/onboarding-steps";
import { OnboardingStepTemplate } from "@/components/onboarding/onboarding-step-template";
import {
  NewToConceptLink,
  VsCodeDownloadLink,
} from "@/components/onboarding/onboarding-concept-guides";
import { CustomIcon } from "@/components/custom-icon";
import { OnboardingCareerStep } from "@/components/onboarding/onboarding-career-step";
import { cn } from "@/lib/utils";
import { isValidLeetCodeUsername } from "@/lib/onboarding/leetcode-username";

type UpdateForm = (updates: Partial<OnboardingFormData>) => void;
interface OnboardingFlowBodyProps {
  currentStep: number;
  completedSteps: StepId[];
  formData: OnboardingFormData;
  updateFormData: UpdateForm;
  onCareerFinished: () => Promise<void>;
  githubConnected: boolean;
  githubUsername: string;
  linkedinConnected: boolean;
  discordConnected: boolean;
  refreshLinkedAccounts: () => void;
}

/** Yes/No controls on the glass card: avoid `outline`’s bg-background (often invisible here); grey out the active choice. */
function onboardingBinaryChoiceButtonClass(isSelected: boolean) {
  return cn(
    "flex-1 min-h-11 border shadow-none",
    isSelected
      ? "border-white/15 bg-white/[0.06] text-muted-foreground opacity-60 hover:opacity-80 hover:bg-white/[0.08]"
      : "border-white/25 bg-white/10 text-foreground opacity-100 hover:bg-white/18"
  );
}

export function OnboardingFlowBody({
  currentStep,
  completedSteps,
  formData,
  updateFormData,
  onCareerFinished,
  githubConnected,
  githubUsername,
  linkedinConnected,
  discordConnected,
  refreshLinkedAccounts,
}: OnboardingFlowBodyProps) {
  const [githubLoading, setGithubLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);

  const callbackBase = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.origin;
  }, []);

  const handleGithub = async () => {
    if (githubConnected) return;
    try {
      setGithubLoading(true);
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: `${callbackBase}/onboarding?step=1`,
      });
      if (error) {
        console.error(error);
        alert("GitHub sign-in failed. Try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong.");
    } finally {
      setGithubLoading(false);
    }
  };

  const handleDiscordLink = async () => {
    if (discordConnected) return;
    try {
      setDiscordLoading(true);
      const linkSocial = (
        authClient as unknown as {
          linkSocial: (args: {
            provider: "discord";
            callbackURL?: string;
          }) => Promise<{ error?: { message?: string } | null }>;
        }
      ).linkSocial;
      const { error } = await linkSocial({
        provider: "discord",
        callbackURL: `${callbackBase}/onboarding?step=4`,
      });
      if (error) {
        alert(error.message ?? "Could not start Discord linking.");
      }
    } catch (e) {
      console.error(e);
      alert("Could not start Discord linking.");
    } finally {
      setDiscordLoading(false);
    }
  };

  const handleLinkedInLink = async () => {
    if (linkedinConnected) return;
    try {
      setLinkedinLoading(true);
      const linkSocial = (
        authClient as unknown as {
          linkSocial: (args: {
            provider: "linkedin";
            callbackURL?: string;
          }) => Promise<{ error?: { message?: string } | null }>;
        }
      ).linkSocial;
      const { error } = await linkSocial({
        provider: "linkedin",
        callbackURL: `${callbackBase}/onboarding?step=5`,
      });
      if (error) {
        alert(error.message ?? "Could not start LinkedIn linking.");
      }
    } catch (e) {
      console.error(e);
      alert("Could not start LinkedIn linking.");
    } finally {
      setLinkedinLoading(false);
    }
  };

  useEffect(() => {
    void refreshLinkedAccounts();
  }, [currentStep, refreshLinkedAccounts]);

  const [localLeet, setLocalLeet] = useState(formData.leetcodeHandle);
  const [leetChecking, setLeetChecking] = useState(false);
  const [leetExists, setLeetExists] = useState<boolean | null>(null);
  const [leetChecked, setLeetChecked] = useState("");

  useEffect(() => {
    setLocalLeet(formData.leetcodeHandle);
  }, [formData.leetcodeHandle]);

  useEffect(() => {
    const value = localLeet.trim();
    if (!isValidLeetCodeUsername(value)) {
      setLeetExists(null);
      setLeetChecking(false);
      setLeetChecked("");
      return;
    }
    if (value === leetChecked) return;

    setLeetChecking(true);
    setLeetExists(null);
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/leetcode-user-exists?u=${encodeURIComponent(value)}`
        );
        const data = await res.json();
        if (!res.ok) setLeetExists(false);
        else {
          setLeetExists(Boolean(data.exists));
          setLeetChecked(value);
        }
      } catch {
        setLeetExists(false);
      } finally {
        setLeetChecking(false);
      }
    }, 500);
    return () => clearTimeout(id);
  }, [localLeet, leetChecked]);

  const saveLeetcode = useCallback(() => {
    if (!isValidLeetCodeUsername(localLeet) || leetExists !== true) return;
    updateFormData({ leetcodeHandle: localLeet.trim() });
  }, [localLeet, leetExists, updateFormData]);

  switch (currentStep) {
    case 1:
      return (
        <OnboardingStepTemplate
          currentStep={currentStep}
          completedSteps={completedSteps}
          title="Connect GitHub"
          description="Sign in with GitHub so we can personalize your profile."
          icon={
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-gray-900 to-gray-700 shadow-2xl"
            >
              <Github className="h-8 w-8 text-white" />
            </motion.div>
          }
          afterContent={<NewToConceptLink guideKey="github" step={currentStep} />}
        >
          <div className="mx-auto max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            {githubConnected ? (
              <Button
                className="h-12 w-full cursor-default bg-green-600 text-white"
                size="lg"
                disabled
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Connected @{githubUsername}
              </Button>
            ) : (
              <Button
                className="h-12 w-full bg-gray-900 text-white hover:bg-gray-800"
                size="lg"
                disabled={githubLoading}
                onClick={() => void handleGithub()}
              >
                {githubLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Continuing…
                  </>
                ) : (
                  <>
                    <Github className="mr-2 h-5 w-5" />
                    Sign in with GitHub
                  </>
                )}
              </Button>
            )}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              After signing in you&apos;ll return here—use <strong>Next</strong> when you&apos;re ready.
            </p>
          </div>
        </OnboardingStepTemplate>
      );

    case 2:
      return (
        <OnboardingStepTemplate
          currentStep={currentStep}
          completedSteps={completedSteps}
          title="Git"
          description="Have you installed and configured Git on your machine?"
          icon={
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 shadow-2xl">
              <CustomIcon iconType="git" className="h-8 w-8" />
            </div>
          }
          afterContent={<NewToConceptLink guideKey="git" step={currentStep} />}
        >
          <div className="mx-auto max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-center font-medium text-foreground">
              Have you set up Git?
            </p>
            <div className="flex flex-col gap-2 sm:flex-row" role="group" aria-label="Git setup">
              <Button
                type="button"
                variant="outline"
                className={onboardingBinaryChoiceButtonClass(formData.gitSetup === true)}
                aria-pressed={formData.gitSetup === true}
                onClick={() => updateFormData({ gitSetup: true })}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant="outline"
                className={onboardingBinaryChoiceButtonClass(formData.gitSetup === false)}
                aria-pressed={formData.gitSetup === false}
                onClick={() => updateFormData({ gitSetup: false })}
              >
                No
              </Button>
            </div>
          </div>
        </OnboardingStepTemplate>
      );

    case 3:
      return (
        <OnboardingStepTemplate
          currentStep={currentStep}
          completedSteps={completedSteps}
          title="VS Code"
          description="Are you comfortable using VS Code and the terminal?"
          icon={
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 shadow-2xl">
              <CustomIcon iconType="vscode" className="h-8 w-8" />
            </div>
          }
          afterContent={
            <div className="space-y-4">
              <VsCodeDownloadLink />
              <NewToConceptLink guideKey="vscode" step={currentStep} />
            </div>
          }
        >
          <div className="mx-auto max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-center font-medium text-foreground">
              Are you familiar with the CLI / integrated terminal?
            </p>
            <div
              className="flex flex-col gap-2 sm:flex-row"
              role="group"
              aria-label="CLI familiarity"
            >
              <Button
                type="button"
                variant="outline"
                className={onboardingBinaryChoiceButtonClass(formData.cliKnowledge === true)}
                aria-pressed={formData.cliKnowledge === true}
                onClick={() => updateFormData({ cliKnowledge: true })}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant="outline"
                className={onboardingBinaryChoiceButtonClass(formData.cliKnowledge === false)}
                aria-pressed={formData.cliKnowledge === false}
                onClick={() => updateFormData({ cliKnowledge: false })}
              >
                No
              </Button>
            </div>
          </div>
        </OnboardingStepTemplate>
      );

    case 4:
      return (
        <OnboardingStepTemplate
          currentStep={currentStep}
          completedSteps={completedSteps}
          title="Discord"
          description="Link Discord so you can join the community with the same account."
          icon={
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 shadow-2xl">
              <IconBrandDiscord className="h-8 w-8 text-white" />
            </div>
          }
          afterContent={<NewToConceptLink guideKey="discord" step={currentStep} />}
        >
          <div className="mx-auto max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            {discordConnected ? (
              <Button
                className="h-11 w-full cursor-default bg-green-600"
                disabled
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Discord linked
              </Button>
            ) : (
              <Button
                className="h-11 w-full bg-indigo-600 hover:bg-indigo-600/90"
                disabled={discordLoading}
                onClick={() => void handleDiscordLink()}
              >
                {discordLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <IconBrandDiscord className="mr-2 h-4 w-4" />
                )}
                Link Discord
              </Button>
            )}
            <p className="text-center text-xs text-muted-foreground">
              After linking you&apos;ll land back here—press <strong>Next</strong> to continue.
            </p>
          </div>
        </OnboardingStepTemplate>
      );

    case 5:
      return (
        <OnboardingStepTemplate
          currentStep={currentStep}
          completedSteps={completedSteps}
          title="LinkedIn"
          description="Connect LinkedIn and add your public profile name (vanity URL)."
          icon={
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-700 to-blue-800 shadow-2xl">
              <IconBrandLinkedin className="h-8 w-8 text-white" />
            </div>
          }
          afterContent={<NewToConceptLink guideKey="linkedin" step={currentStep} />}
        >
          <div className="mx-auto max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            {linkedinConnected ? (
              <Button className="h-10 w-full cursor-default bg-green-600" disabled>
                <CheckCircle className="mr-2 h-4 w-4" />
                LinkedIn connected
              </Button>
            ) : (
              <Button
                className="h-10 w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90"
                disabled={linkedinLoading}
                onClick={() => void handleLinkedInLink()}
              >
                {linkedinLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <IconBrandLinkedin className="mr-2 h-4 w-4" />
                )}
                Connect LinkedIn
              </Button>
            )}

            {linkedinConnected && (
              <div className="space-y-3 text-left">
                <Label htmlFor="li-handle">LinkedIn username (from linkedin.com/in/…)</Label>
                <Input
                  id="li-handle"
                  placeholder="e.g. jane-doe"
                  value={formData.linkedinHandle}
                  onChange={(e) =>
                    updateFormData({ linkedinHandle: e.target.value })
                  }
                  className="border-white/20 bg-white/10"
                />
              </div>
            )}
          </div>
        </OnboardingStepTemplate>
      );

    case 6:
      return (
        <OnboardingStepTemplate
          currentStep={currentStep}
          completedSteps={completedSteps}
          title="LeetCode"
          description="Enter the LeetCode username you use for practice."
          icon={
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-400 to-yellow-500 shadow-2xl">
              <CustomIcon iconType="leetcode" className="h-8 w-8" />
            </div>
          }
          afterContent={<NewToConceptLink guideKey="leetcode" step={currentStep} />}
        >
          <div className="mx-auto max-w-sm space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <Label htmlFor="lc">LeetCode username</Label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                id="lc"
                value={localLeet}
                onChange={(e) => setLocalLeet(e.target.value)}
                className="border-white/20 bg-white/10"
                placeholder="Your handle"
              />
              {localLeet.trim() !== "" &&
                (!isValidLeetCodeUsername(localLeet) ? (
                  <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                ) : leetChecking ? (
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin text-muted-foreground" />
                ) : leetExists === true ? (
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                ) : leetExists === false ? (
                  <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                ) : null)}
              <Button
                type="button"
                size="sm"
                disabled={
                  !isValidLeetCodeUsername(localLeet) || leetExists !== true
                }
                onClick={saveLeetcode}
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Save locks in your handle for the next step. Use <strong>Next</strong> after saving.
            </p>
          </div>
        </OnboardingStepTemplate>
      );

    case 7:
      return (
        <OnboardingStepTemplate
          currentStep={currentStep}
          completedSteps={completedSteps}
          contentClassName="max-w-6xl"
          hideHeader
        >
          <OnboardingCareerStep
            formData={formData}
            updateFormData={updateFormData}
            onFinished={onCareerFinished}
          />
        </OnboardingStepTemplate>
      );

    default:
      return null;
  }
}
