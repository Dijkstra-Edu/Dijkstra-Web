"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Play,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Home,
} from "lucide-react";
import { IconBrandDiscord, IconBrandLinkedin } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import BackgroundPaths from "../../components/kokonutui/background-paths";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: "welcome",
    title: "Welcome",
    icon: Sparkles,
    color: "from-gray-900 to-gray-700",
  },
  {
    id: "github",
    title: "GitHub",
    icon: Github,
    color: "from-gray-900 to-gray-700",
  },
  {
    id: "git",
    title: "Git",
    icon: "git",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "vscode",
    title: "VS Code",
    icon: "vscode",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "discord",
    title: "Discord",
    icon: IconBrandDiscord,
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "leetcode",
    title: "LeetCode",
    icon: "leetcode",
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "from-blue-700 to-blue-800",
  },
];

const platforms = [
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    color: "from-gray-900 to-gray-700",
  },
  {
    id: "git",
    name: "Git",
    icon: "git",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "vscode",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "discord",
    name: "Discord",
    icon: IconBrandDiscord,
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    icon: "leetcode",
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "from-blue-700 to-blue-800",
  },
];

interface OnboardingState {
  gitSetup: boolean | null;
  cliKnowledge: boolean | null;
  discordJoined: boolean | null;
  leetcodeHandle: string;
  linkedinHandle: string;
  expandedSections: Record<string, boolean>;
}

const STORAGE_KEY = "dijkstra-onboarding-state";
const COMPLETED_STEPS_KEY = "dijkstra-completed-steps";

// Custom icon component
const CustomIcon = ({
  iconType,
  className,
}: {
  iconType: string;
  className?: string;
}) => {
  const iconUrls = {
    git: "https://img.icons8.com/?size=100&id=38389&format=png&color=FFFFFF",
    vscode: "https://img.icons8.com/ios_filled/512/FFFFFF/visual-studio.png",
    leetcode:
      "https://img.icons8.com/?size=100&id=PZknXs9seWCp&format=png&color=FFFFFF",
  };

  switch (iconType) {
    case "git":
    case "vscode":
    case "leetcode":
      return (
        <img
          src={
            iconUrls[iconType as keyof typeof iconUrls] || "/placeholder.svg"
          }
          alt={iconType}
          className={`${className}`}
          style={{ width: "20px", height: "20px" }}
        />
      );
    default:
      return null;
  }
};

export default function Page() {
  const searchParams = useSearchParams();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [state, setState] = useState<OnboardingState>({
    gitSetup: null,
    cliKnowledge: null,
    discordJoined: null,
    leetcodeHandle: "",
    linkedinHandle: "",
    expandedSections: {},
  });
  const router = useRouter();

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      const savedCompletedSteps = localStorage.getItem(COMPLETED_STEPS_KEY);

      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setState(parsedState);
      }

      if (savedCompletedSteps) {
        const parsedCompletedSteps = JSON.parse(savedCompletedSteps);
        setCompletedSteps(parsedCompletedSteps);
      }
    } catch (error) {
      console.error("Error loading state from localStorage:", error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  }, [state]);

  // Save completed steps to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_STEPS_KEY, JSON.stringify(completedSteps));
    } catch (error) {
      console.error("Error saving completed steps to localStorage:", error);
    }
  }, [completedSteps]);

  // Check for step parameter in URL on component mount
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const stepNumber = Number.parseInt(stepParam);
      if (stepNumber >= 1 && stepNumber <= 6) {
        setShowOnboarding(true);
        setCurrentStep(stepNumber);
        // Clear the URL parameter after setting the state to avoid interference
        window.history.replaceState({}, "", "/");
      }
    }
  }, [searchParams]);

  const updateState = useCallback((updates: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleSection = useCallback(
    (section: string) => {
      updateState({
        expandedSections: {
          ...state.expandedSections,
          [section]: !state.expandedSections[section],
        },
      });
    },
    [state.expandedSections, updateState]
  );

  const handleGetStarted = useCallback(() => {
    setShowOnboarding(true);
    setCurrentStep(1); // Start with GitHub step
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 1) {
      // Go back to welcome page from first step
      setShowOnboarding(false);
      setCurrentStep(0);
    }
  }, [currentStep]);

  const goToStep = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
  }, []);

  const markStepComplete = useCallback(
    (stepId: string) => {
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps((prev) => [...prev, stepId]);
        // Auto-advance to next step after a short delay
        setTimeout(() => {
          if (currentStep < 6) {
            setCurrentStep(currentStep + 1);
          } else if (currentStep === 6) {
            // Go to completion step
            setCurrentStep(7);
          }
        }, 1000);
      }
    },
    [completedSteps, currentStep]
  );

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 5: // LeetCode
        return state.leetcodeHandle.trim() !== "";
      case 6: // LinkedIn
        return state.linkedinHandle.trim() !== "";
      default:
        return true;
    }
  }, [currentStep, state.leetcodeHandle, state.linkedinHandle]);

  // Step Indicator Component with clickable steps
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-2">
        {steps.slice(1).map((step, index) => {
          const Icon = typeof step.icon === "string" ? null : step.icon;
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = index + 1 === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => goToStep(index + 1)}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 cursor-pointer hover:scale-105
                    ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                        ? "bg-blue-500 border-blue-500 text-white"
                        : `bg-gradient-to-br ${step.color} border-white/30 text-white hover:border-gray-400`
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : Icon ? (
                    <Icon className="w-5 h-5" />
                  ) : (
                    <CustomIcon
                      iconType={step.icon as string}
                      className="w-5 h-5"
                    />
                  )}
                </button>
                <span
                  className={`
                    mt-1 text-xs font-medium cursor-pointer
                    ${
                      isCompleted || isCurrent
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500"
                    }
                  `}
                  onClick={() => goToStep(index + 1)}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.slice(1).length - 1 && (
                <div
                  className={`
                    w-12 h-0.5 mx-3 transition-all duration-200
                    ${
                      completedSteps.includes(steps[index + 2].id)
                        ? "bg-green-500"
                        : "bg-white/30"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // Original Welcome Content
  const WelcomeContent = () => (
    <div className="flex items-center justify-center h-full">
      <div className="space-y-8 text-center max-w-4xl">
        {/* Logo */}
        <motion.img
          src="/icon.png"
          alt="Dijkstra GPT logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-30 w-30 mx-auto"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-foreground"
        >
          Welcome to Dijkstra
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Let's get you set up with all the essential tools for your coding
          journey
        </motion.p>

        {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl"
        >
          <div className="flex items-center justify-between w-full max-w-2xl">
            {platforms.map((platform, index) => {
              const Icon =
                typeof platform.icon === "string" ? null : platform.icon;
              return (
                <div key={platform.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <CustomIcon
                          iconType={platform.icon as string}
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </motion.div>
                  {index < platforms.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="w-6 h-0.5 mx-3 bg-gradient-to-r from-border to-muted-foreground/30 backdrop-blur-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground max-w-lg mx-auto">
            We'll guide you through setting up GitHub, Git, VS Code, Discord,
            LeetCode, and LinkedIn - everything you need to start your
            development journey.
          </p>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleGetStarted}
            className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200"
            size="lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground/60 max-w-sm mx-auto">
            ✨ Interactive tutorials • Step-by-step guidance • Beginner-friendly
          </p>
        </motion.div>
      </div>
    </div>
  );

  // GitHub Step
  const GitHubStep = () => (
    <div className="space-y-3 h-[600px]">
      {/* Step Indicator */}
      <StepIndicator />

              {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl mt-24"
        >
          <div className="flex items-center justify-between w-full max-w-2xl">
            {platforms.map((platform, index) => {
              const Icon =
                typeof platform.icon === "string" ? null : platform.icon;
              return (
                <div key={platform.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <CustomIcon
                          iconType={platform.icon as string}
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground opacity-80 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </motion.div>
                  {index < platforms.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="w-6 h-0.5 mx-3 bg-gradient-to-r from-border to-muted-foreground/30 backdrop-blur-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

      {/* Header Section */}
      <div className="text-center space-y-4 pt-10 ">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <Github className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-bold text-foreground">Connect GitHub</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Connect your GitHub account to get started with your coding journey
          </p>
        </motion.div>
      </div>

      {/* Main Action Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-sm mx-auto"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            {/* Sign in button */}
            <div className="space-y-3">
              <Button
                className="w-full h-12 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200"
                size="lg"
                onClick={() => markStepComplete("github")}
              >
                <Github className="w-5 h-5 mr-2" />
                Sign in with GitHub
              </Button>

              <p className="text-sm text-gray-500 text-center">
                We'll redirect you to GitHub's secure sign-in page
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-transparent text-gray-400">
                  New To GitHub?
                </span>
              </div>
            </div>

            {/* Setup Guide Link */}
            <div className="text-center">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm"
                asChild
              >
                <a href={`/onboarding/github?step=${currentStep}`}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View GitHub Setup Guide
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Note */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          🔒 Your data is secure. We only access basic profile information to
          personalize your experience.
        </p>
      </motion.div>
    </div>
  );

  // Git Step
  const GitStep = () => (
    <div className="space-y-6 h-[600px]">
      {/* Step Indicator */}
      <StepIndicator />

              {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl mt-24"
        >
          <div className="flex items-center justify-between w-full max-w-2xl">
            {platforms.map((platform, index) => {
              const Icon =
                typeof platform.icon === "string" ? null : platform.icon;
              return (
                <div key={platform.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <CustomIcon
                          iconType={platform.icon as string}
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </motion.div>
                  {index < platforms.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="w-6 h-0.5 mx-3 bg-gradient-to-r from-border to-muted-foreground/30 backdrop-blur-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

      {/* Header Section */}
      <div className="text-center space-y-4 pt-24">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <img
            src="https://img.icons8.com/?size=100&id=38389&format=png&color=FFFFFF"
            alt="Git"
            className="w-8 h-8 object-contain"
          />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Setup Git</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ensure Git is properly configured on your system
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-3 text-gray-900 dark:text-white">
                Have you set up Git?
              </p>
              <div className="flex space-x-2">
                <Button
                  variant={state.gitSetup === true ? "default" : "outline"}
                  onClick={() => {
                    updateState({ gitSetup: true });
                    markStepComplete("git");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20"
                >
                  Yes
                </Button>
                <Button
                  variant={state.gitSetup === false ? "default" : "outline"}
                  onClick={() => updateState({ gitSetup: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20"
                >
                  No
                </Button>
              </div>
            </div>

            {state.gitSetup === false && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <div className="grid gap-3">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                      Documentation
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent border-white/30 text-gray-700 dark:text-gray-300 hover:bg-white/10"
                      asChild
                    >
                      <a
                        href="https://docs.dijkstra.org.in"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Dijkstra Docs
                      </a>
                    </Button>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                      Video Tutorial
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent border-white/30 text-gray-700 dark:text-gray-300 hover:bg-white/10"
                    >
                      <Play className="w-3 h-3 mr-2" />
                      Watch Tutorial
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                    Learn Git Basics
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Master the fundamentals of version control
                  </p>
                  <Button size="sm" className="w-full">
                    Start Learning
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Setup Guide Link */}
      <div className="text-center">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm"
          asChild
        >
          <a href={`/onboarding/git?step=${currentStep}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Git Setup Guide
          </a>
        </Button>
      </div>
    </div>
  );

  // VS Code Step
  const VSCodeStep = () => (
    <div className="space-y-6 h-[600px]">
      {/* Step Indicator */}
      <StepIndicator />

              {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl mt-24"
        >
          <div className="flex items-center justify-between w-full max-w-2xl">
            {platforms.map((platform, index) => {
              const Icon =
                typeof platform.icon === "string" ? null : platform.icon;
              return (
                <div key={platform.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <CustomIcon
                          iconType={platform.icon as string}
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </motion.div>
                  {index < platforms.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="w-6 h-0.5 mx-3 bg-gradient-to-r from-border to-muted-foreground/30 backdrop-blur-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

      {/* Header Section */}
      <div className="text-center space-y-4 pt-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <img
            src="https://img.icons8.com/ios_filled/512/FFFFFF/visual-studio.png"
            alt="VS Code"
            className="w-8 h-8 object-contain"
          />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Setup VS Code</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Set up your development environment
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            <Collapsible
              open={state.expandedSections.vscodeHelp}
              onOpenChange={() => toggleSection("vscodeHelp")}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-transparent border-white/30 text-gray-700 dark:text-gray-300 hover:bg-white/10 text-sm"
                >
                  How to use VS Code
                  {state.expandedSections.vscodeHelp ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                    <span className="text-gray-900 dark:text-white text-sm">
                      Installing VS Code
                    </span>
                    <Badge className="bg-blue-500 text-xs">Step 1</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                    <span className="text-gray-900 dark:text-white text-sm">
                      Essential Extensions
                    </span>
                    <Badge className="bg-blue-500 text-xs">Step 2</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                    <span className="text-gray-900 dark:text-white text-sm">
                      Customizing Your Workspace
                    </span>
                    <Badge className="bg-blue-500 text-xs">Step 3</Badge>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div>
              <p className="font-medium mb-3 text-gray-900 dark:text-white">
                Are you familiar with the CLI?
              </p>
              <div className="flex space-x-2">
                <Button
                  variant={state.cliKnowledge === true ? "default" : "outline"}
                  onClick={() => {
                    updateState({ cliKnowledge: true });
                    markStepComplete("vscode");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20"
                >
                  Yes
                </Button>
                <Button
                  variant={state.cliKnowledge === false ? "default" : "outline"}
                  onClick={() => updateState({ cliKnowledge: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20"
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Guide Link */}
      <div className="text-center">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm"
          asChild
        >
          <a href={`/onboarding/vscode?step=${currentStep}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View VS Code Setup Guide
          </a>
        </Button>
      </div>
    </div>
  );

  // Discord Step
  const DiscordStep = () => (
    <div className="space-y-6 h-[600px]">
      {/* Step Indicator */}
      <StepIndicator />

              {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl mt-24"
        >
          <div className="flex items-center justify-between w-full max-w-2xl">
            {platforms.map((platform, index) => {
              const Icon =
                typeof platform.icon === "string" ? null : platform.icon;
              return (
                <div key={platform.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <CustomIcon
                          iconType={platform.icon as string}
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </motion.div>
                  {index < platforms.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="w-6 h-0.5 mx-3 bg-gradient-to-r from-border to-muted-foreground/30 backdrop-blur-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

      {/* Header Section */}
      <div className="text-center space-y-4 pt-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <IconBrandDiscord className="w-8 h-8 text-white" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Join Discord</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join our community for support and collaboration
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-3 text-gray-900 dark:text-white">
                Have you joined our Discord?
              </p>
              <div className="flex space-x-2">
                <Button
                  variant={state.discordJoined === true ? "default" : "outline"}
                  onClick={() => {
                    updateState({ discordJoined: true });
                    markStepComplete("discord");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20"
                >
                  Yes
                </Button>
                <Button
                  variant={
                    state.discordJoined === false ? "default" : "outline"
                  }
                  onClick={() => updateState({ discordJoined: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20"
                >
                  No
                </Button>
              </div>
            </div>

            {state.discordJoined === false && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <Button
                  className="w-full h-10 text-base font-semibold"
                  size="lg"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <IconBrandDiscord className="w-4 h-4 mr-2" />
                    Join Discord
                  </a>
                </Button>

                <Collapsible
                  open={state.expandedSections.discordHelp}
                  onOpenChange={() => toggleSection("discordHelp")}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-0 text-sm"
                    >
                      {state.expandedSections.discordHelp ? (
                        <ChevronDown className="w-4 h-4 mr-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-2" />
                      )}
                      How to join Discord
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <div className="space-y-2">
                        {[
                          "Click the 'Join Discord' button above",
                          "Create a Discord account if you don't have one",
                          "Accept the server invite and introduce yourself",
                        ].map((step, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Badge variant="outline" className="mt-0.5 text-xs">
                              {index + 1}
                            </Badge>
                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Setup Guide Link */}
      <div className="text-center">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm"
          asChild
        >
          <a href={`/onboarding/discord?step=${currentStep}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Discord Setup Guide
          </a>
        </Button>
      </div>
    </div>
  );

  // LeetCode Step with proper input handling
  const LeetCodeStep = () => {
    const [localLeetCodeHandle, setLocalLeetCodeHandle] = useState(
      state.leetcodeHandle
    );

    // Update local state when global state changes (e.g., from localStorage)
    useEffect(() => {
      setLocalLeetCodeHandle(state.leetcodeHandle);
    }, [state.leetcodeHandle]);

    const handleSave = () => {
      updateState({ leetcodeHandle: localLeetCodeHandle });
      markStepComplete("leetcode");
    };

    return (
      <div className="space-y-6 h-[600px]">
        {/* Step Indicator */}
        <StepIndicator />

                {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl mt-24"
        >
          <div className="flex items-center justify-between w-full max-w-2xl">
            {platforms.map((platform, index) => {
              const Icon =
                typeof platform.icon === "string" ? null : platform.icon;
              return (
                <div key={platform.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <CustomIcon
                          iconType={platform.icon as string}
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </motion.div>
                  {index < platforms.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="w-6 h-0.5 mx-3 bg-gradient-to-r from-border to-muted-foreground/30 backdrop-blur-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Header Section */}
        <div className="text-center space-y-4 pt-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
            className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
          >
            <img
              src="https://img.icons8.com/?size=100&id=PZknXs9seWCp&format=png&color=FFFFFF"
              alt="LeetCode"
              className="w-8 h-8 object-contain"
            />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Setup LeetCode
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Practice coding problems and improve your skills
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-sm mx-auto space-y-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="leetcode-handle"
                  className="text-gray-900 dark:text-white text-sm"
                >
                  What's your LeetCode handle?
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="leetcode-handle"
                    placeholder="Enter your LeetCode username"
                    value={localLeetCodeHandle}
                    onChange={(e) => setLocalLeetCodeHandle(e.target.value)}
                    className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 text-sm"
                  />
                  <Button
                    onClick={handleSave}
                    disabled={!localLeetCodeHandle.trim()}
                    className="px-4"
                    size="sm"
                  >
                    Save
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <span className="text-gray-500 text-sm">or</span>
              </div>

              <Collapsible
                open={state.expandedSections.leetcodeHelp}
                onOpenChange={() => toggleSection("leetcodeHelp")}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent border-white/30 text-gray-700 dark:text-gray-300 hover:bg-white/10 text-sm"
                  >
                    How to create a LeetCode account
                    {state.expandedSections.leetcodeHelp ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="bg-orange-500/20 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                      Create Your LeetCode Account
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      Start solving coding problems today
                    </p>
                    <div className="space-y-2 mb-3">
                      {[
                        "Visit leetcode.com and click 'Sign Up'",
                        "Choose a unique username and create your profile",
                        "Start with easy problems and work your way up",
                      ].map((step, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Badge variant="outline" className="mt-0.5 text-xs">
                            {index + 1}
                          </Badge>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <a
                        href="https://leetcode.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Go to LeetCode
                      </a>
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>

        {/* Setup Guide Link */}
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm"
            asChild
          >
            <a href={`/onboarding/leetcode?step=${currentStep}`}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View LeetCode Setup Guide
            </a>
          </Button>
        </div>
      </div>
    );
  };

  // LinkedIn Step with proper input handling
  const LinkedInStep = () => {
    const [localLinkedInHandle, setLocalLinkedInHandle] = useState(
      state.linkedinHandle
    );

    // Update local state when global state changes (e.g., from localStorage)
    useEffect(() => {
      setLocalLinkedInHandle(state.linkedinHandle);
    }, [state.linkedinHandle]);

    const handleSave = () => {
      updateState({ linkedinHandle: localLinkedInHandle });
      markStepComplete("linkedin");
    };

    return (
      <div className="space-y-6 h-[600px]">
        {/* Step Indicator */}
        <StepIndicator />

                {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl mt-24"
        >
          <div className="flex items-center justify-between w-full max-w-2xl">
            {platforms.map((platform, index) => {
              const Icon =
                typeof platform.icon === "string" ? null : platform.icon;
              return (
                <div key={platform.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <CustomIcon
                          iconType={platform.icon as string}
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </motion.div>
                  {index < platforms.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="w-6 h-0.5 mx-3 bg-gradient-to-r from-border to-muted-foreground/30 backdrop-blur-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Header Section */}
        <div className="text-center space-y-4 pt-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
          >
            <IconBrandLinkedin className="w-8 h-8 text-white" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Setup LinkedIn
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Build your professional network
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-sm mx-auto space-y-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="linkedin-handle"
                  className="text-gray-900 dark:text-white text-sm"
                >
                  What's your LinkedIn handle?
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="linkedin-handle"
                    placeholder="Enter your LinkedIn username"
                    value={localLinkedInHandle}
                    onChange={(e) => setLocalLinkedInHandle(e.target.value)}
                    className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 text-sm"
                  />
                  <Button
                    onClick={handleSave}
                    disabled={!localLinkedInHandle.trim()}
                    className="px-4"
                    size="sm"
                  >
                    Save
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <span className="text-gray-500 text-sm">or</span>
              </div>

              <Collapsible
                open={state.expandedSections.linkedinHelp}
                onOpenChange={() => toggleSection("linkedinHelp")}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent border-white/30 text-gray-700 dark:text-gray-300 hover:bg-white/10 text-sm"
                  >
                    How to create and optimize your LinkedIn profile
                    {state.expandedSections.linkedinHelp ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="bg-blue-500/20 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                      Build Your Professional Presence
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      Create a compelling LinkedIn profile
                    </p>
                    <div className="grid grid-cols-1 gap-3 mb-3">
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900 dark:text-white text-xs">
                          Profile Setup
                        </h5>
                        <div className="space-y-1 text-xs">
                          {[
                            "Professional headshot",
                            "Compelling headline",
                            "Detailed summary",
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <Badge
                                variant="outline"
                                className="mt-0.5 text-xs"
                              >
                                {index + 1}
                              </Badge>
                              <span className="text-gray-600 dark:text-gray-300">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900 dark:text-white text-xs">
                          Optimization Tips
                        </h5>
                        <div className="space-y-1 text-xs">
                          {[
                            "Add relevant skills",
                            "Connect with peers",
                            "Share your projects",
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <Badge
                                variant="outline"
                                className="mt-0.5 text-xs"
                              >
                                {index + 4}
                              </Badge>
                              <span className="text-gray-600 dark:text-gray-300">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Go to LinkedIn
                      </a>
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>

        {/* Setup Guide Link */}
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm"
            asChild
          >
            <a href={`/onboarding/linkedin?step=${currentStep}`}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View LinkedIn Setup Guide
            </a>
          </Button>
        </div>
      </div>
    );
  };

  // Completion Step
  const CompletionStep = () => (
    <div className="flex items-center justify-center h-[600px]">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Success Icon */}
        <motion.img
          src="/icon.png"
          alt="Dijkstra GPT logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          className="h-30 w-30 mx-auto"
        />

        {/* Title and Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-foreground">
            Congratulations! 🎉
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            You've successfully completed the onboarding process. You're now
            ready to start your coding journey with Dijkstra!
          </p>
        </motion.div>

        {/* Completion Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 my-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">6</div>
            <div className="text-sm text-muted-foreground">Platforms Setup</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="text-sm text-muted-foreground">Setup Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">✓</div>
            <div className="text-sm text-muted-foreground">Ready to Code</div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-lg font-semibold text-foreground">
            What's Next?
          </h3>
          <div className="grid gap-3 text-left max-w-md mx-auto">
            {[
              "Explore our learning paths and courses",
              "Join study groups and coding challenges",
              "Connect with mentors and peers",
              "Start building your first project",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
              >
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button
            onClick={() => {
              // Clear localStorage and reset to welcome
              localStorage.removeItem(STORAGE_KEY);
              localStorage.removeItem(COMPLETED_STEPS_KEY);
              setShowOnboarding(false);
              setCurrentStep(0);
              setCompletedSteps([]);
              setState({
                gitSetup: null,
                cliKnowledge: null,
                discordJoined: null,
                leetcodeHandle: "",
                linkedinHandle: "",
                expandedSections: {},
              });
              router.push("/dashboard");
            }}
            className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200"
            size="lg"
          >
            Start Coding Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowOnboarding(false);
              setCurrentStep(0);
              router.push("/");
            }}
            className="px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/20 rounded-xl transition-all duration-200"
            size="lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );

  const renderStep = () => {
    if (!showOnboarding) {
      return <WelcomeContent />;
    }

    switch (currentStep) {
      case 1:
        return <GitHubStep />;
      case 2:
        return <GitStep />;
      case 3:
        return <VSCodeStep />;
      case 4:
        return <DiscordStep />;
      case 5:
        return <LeetCodeStep />;
      case 6:
        return <LinkedInStep />;
      case 7:
        return <CompletionStep />;
      default:
        return <WelcomeContent />;
    }
  };

  return (
    <BackgroundPaths title="" showButton={false}>
      <div className="w-full max-w-6xl h-[85vh] relative">
        {/* Semi-transparent background rectangle */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20 overflow-auto backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl" />

        {/* Scrollable content container */}
        <div className="relative overflow-auto h-full p-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex items-center justify-center">
          {/* Main Content */}
          <div className="w-full flex flex-col">
            <div className="flex-1">{renderStep()}</div>

            {/* Navigation Buttons - Only show when in onboarding flow */}
            {showOnboarding && currentStep > 0 && currentStep < 7 && (
              <div className="flex items-center justify-between p-24 border-t border-white/10 mt-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 px-6 py-3 rounded-xl transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>

                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Step {currentStep} of {steps.length - 1}
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: steps.length - 1 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i + 1 === currentStep
                            ? "bg-blue-500 w-6"
                            : i + 1 < currentStep
                            ? "bg-green-500"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </BackgroundPaths>
  );
}
