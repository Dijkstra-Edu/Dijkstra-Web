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
  Loader2,
  XCircle,
  Search,
  X,
  Check,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BackgroundPaths from "../../components/kokonutui/background-paths";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { CAREER_PATHS, type CareerPathKey } from "@/data/career-paths";
import { CompanyAutoComplete } from "@/components/company-autocomplete";

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
    id: "linkedin",
    title: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "from-blue-700 to-blue-800",
  },
  {
    id: "leetcode",
    title: "LeetCode",
    icon: "leetcode",
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: "career",
    title: "General Info",
    icon: "career",
    color: "from-purple-500 to-pink-500",
  }
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
    id: "linkedin",
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "from-blue-700 to-blue-800",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    icon: "leetcode",
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: "career",
    name: "Career Planning",
    icon: "career",
    color: "from-purple-500 to-pink-500",
  },
];

interface OnboardingState {
  github: boolean | null;
  gitSetup: boolean | null;
  cliKnowledge: boolean | null;
  discordJoined: boolean | null;
  leetcodeHandle: string;
  linkedinHandle: string;
  expandedSections: Record<string, boolean>;
  // Career planning fields
  primarySpecialization: string;
  secondarySpecializations: string[];
  timeToUpskill: number;
  expectedSalary: string;
  selectedTools: string[];
  dreamCompany: string;
  dreamRole: string;
}

const STORAGE_KEY = "dijkstra-onboarding-state";
const COMPLETED_STEPS_KEY = "dijkstra-completed-steps";

const TOOLS_LIST = [
  "JAVA", "C", "CPP", "PYTHON", "CSHARP", "RUST", "JAVASCRIPT", "TYPESCRIPT", "GO", "GROOVY", "RUBY", "PHP", "SWIFT",
  "REACTJS", "ANGULARJS", "NEXTJS", "VUEJS", "SVELTE", "NODEJS", "DJANGO", "FLASK", "SPRINGBOOT",
  "GIT", "MARKDOWN", "DOCKER", "KUBERNETES", "HTML", "CSS", "POSTMAN", "FIREBASE", "SUPABASE",
  "AWS", "AZURE", "GCP", "HEROKU", "DIGITALOCEAN", "VERCEL", "RAILWAY", "NETLIFY", "JENKINS",
  "REDIS", "MONGODB", "MYSQL", "MSSQL", "POSTGRESQL", "SQLITE", "ELASTICSEARCH", "KAFKA", "RABBITMQ", "GRAPHQL", "COUCHDB", "CASSANDRA"
];

const TIME_OPTIONS = [
  { value: 1, label: "1 month" },
  { value: 2, label: "2 months" },
  { value: 3, label: "3 months" },
  { value: 4, label: "4 months" },
  { value: 5, label: "5 months" },
  { value: 6, label: "6 months" },
  { value: 7, label: "7 months" },
  { value: 8, label: "8 months" },
  { value: 9, label: "9 months" },
  { value: 10, label: "10 months" },
  { value: 11, label: "11 months" },
  { value: 12, label: "12 months" },
  { value: 18, label: "18 months" },
  { value: 24, label: "24 months" },
  { value: 30, label: "30 months" },
  { value: 36, label: "36 months" },
  { value: 42, label: "42 months" },
  { value: 48, label: "48 months" },
  { value: 54, label: "54 months" },
  { value: 60, label: "60 months" },
  { value: 72, label: "72 months" },
  { value: 84, label: "84 months" },
  { value: 96, label: "96 months" },
  { value: 108, label: "108 months" },
  { value: 120, label: "120 months" },
];

// Career Path Card Component for onboarding
interface CareerPathCardProps {
  pathKey: CareerPathKey;
  isPrimary?: boolean;
  isSecondary?: boolean;
  onClick: () => void;
  showBadge?: boolean;
}

function CareerPathCard({
  pathKey,
  isPrimary = false,
  isSecondary = false,
  onClick,
  showBadge = true,
}: CareerPathCardProps) {
  const path = CAREER_PATHS[pathKey];

  return (
    <div
      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
        isPrimary
          ? "border-primary bg-primary/10 ring-2 ring-primary/50"
          : isSecondary
          ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/50"
          : "border-white/20 hover:border-white/40 hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center p-2 shadow-lg`}>
          <img 
            src={`/${path.icon}`} 
            alt={path.label}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to shortLabel if image doesn't exist
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = 'text-white text-xs font-bold';
                span.textContent = path.shortLabel;
                parent.appendChild(span);
              }
            }}
          />
        </div>
        <h4 className="text-xs font-medium text-foreground mb-1">{path.label}</h4>
        
        {/* Selection Indicators */}
        {showBadge && (isPrimary || isSecondary) && (
          <div className="flex justify-center">
            {isPrimary && (
              <Badge variant="default" className="text-xs bg-primary px-2 py-0.5">
                Primary
              </Badge>
            )}
            {isSecondary && (
              <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5">
                Secondary
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to format months into years and months
const formatTimeDisplay = (months: number): string => {
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

const SALARY_RANGES = [
  { value: "UNRANKED", label: "₹0 L (Unranked)" },
  { value: "IRON_1", label: "₹0 L - ₹1 L (Iron 1)" },
  { value: "IRON_2", label: "₹1 L - ₹2 L (Iron 2)" },
  { value: "IRON_3", label: "₹2 L - ₹3 L (Iron 3)" },
  { value: "BRONZE_1", label: "₹3 L - ₹4 L (Bronze 1)" },
  { value: "BRONZE_2", label: "₹4 L - ₹5 L (Bronze 2)" },
  { value: "BRONZE_3", label: "₹5 L - ₹6 L (Bronze 3)" },
  { value: "SILVER_1", label: "₹6 L - ₹7 L (Silver 1)" },
  { value: "SILVER_2", label: "₹7 L - ₹8 L (Silver 2)" },
  { value: "SILVER_3", label: "₹8 L - ₹10 L (Silver 3)" },
  { value: "GOLD_1", label: "₹10 L - ₹12 L (Gold 1)" },
  { value: "GOLD_2", label: "₹12 L - ₹13 L (Gold 2)" },
  { value: "GOLD_3", label: "₹13 L - ₹14 L (Gold 3)" },
  { value: "PLATINUM_1", label: "₹14 L - ₹15 L (Platinum 1)" },
  { value: "PLATINUM_2", label: "₹15 L - ₹16 L (Platinum 2)" },
  { value: "PLATINUM_3", label: "₹16 L - ₹18 L (Platinum 3)" },
  { value: "DIAMOND_1", label: "₹18 L - ₹20 L (Diamond 1)" },
  { value: "DIAMOND_2", label: "₹20 L - ₹22 L (Diamond 2)" },
  { value: "DIAMOND_3", label: "₹22 L - ₹24 L (Diamond 3)" },
  { value: "EMERALD_1", label: "₹24 L - ₹26 L (Emerald 1)" },
  { value: "EMERALD_2", label: "₹26 L - ₹28 L (Emerald 2)" },
  { value: "EMERALD_3", label: "₹28 L - ₹30 L (Emerald 3)" },
  { value: "LAPIS_1", label: "₹30 L - ₹35 L (Lapis 1)" },
  { value: "LAPIS_2", label: "₹35 L - ₹40 L (Lapis 2)" },
  { value: "LAPIS_3", label: "₹40 L - ₹45 L (Lapis 3)" },
  { value: "QUARTZ_1", label: "₹45 L - ₹55 L (Quartz 1)" },
  { value: "QUARTZ_2", label: "₹55 L - ₹60 L (Quartz 2)" },
  { value: "QUARTZ_3", label: "₹60 L - ₹70 L (Quartz 3)" },
  { value: "AMETHYST_1", label: "₹70 L - ₹80 L (Amethyst 1)" },
  { value: "AMETHYST_2", label: "₹80 L - ₹90 L (Amethyst 2)" },
  { value: "AMETHYST_3", label: "₹90 L - ₹1 Cr (Amethyst 3)" },
  { value: "OBSIDIAN", label: "₹1 Cr+ (Obsidian)" }
];

// Custom Multiselect Component
interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  maxHeight?: string;
}

const MultiSelect = ({ options, selected, onChange, placeholder = "Select options", maxHeight = "200px" }: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleRemove = (option: string) => {
    onChange(selected.filter(item => item !== option));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white/10 border-white/20 hover:bg-white/20"
        >
          <div className="flex flex-wrap gap-1 max-w-[calc(100%-2rem)]">
            {selected.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              selected.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="text-xs bg-primary/20 text-primary border-primary/30"
                >
                  {item}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item);
                    }}
                  />
                </Badge>
              ))
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20"
            />
          </div>
          {selected.length > 0 && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                {selected.length} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No tools found
            </div>
          ) : (
            <div className="p-1">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer"
                  onClick={() => handleToggle(option)}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                      selected.includes(option) 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : "border-muted-foreground"
                    }`}>
                      {selected.includes(option) && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                    <span className="text-sm">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

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
    leetcode: "https://img.icons8.com/?size=100&id=PZknXs9seWCp&format=png&color=FFFFFF",
    career: "https://img.icons8.com/?size=100&id=123456&format=png&color=FFFFFF",
  };

  switch (iconType) {
    case "git":
    case "vscode":
    case "leetcode":
    case "career":
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
  const [authRedirecting, setAuthRedirecting] = useState(false);
  const [authRedirectingProvider, setAuthRedirectingProvider] = useState<"github" | "linkedin" | null>(null);
  const [state, setState] = useState<OnboardingState>({
    github: null,
    gitSetup: null,
    cliKnowledge: null,
    discordJoined: null,
    leetcodeHandle: "",
    linkedinHandle: "",
    expandedSections: {},
    // Career planning fields
    primarySpecialization: "",
    secondarySpecializations: [],
    timeToUpskill: 0,
    expectedSalary: "",
    selectedTools: [],
    dreamCompany: "",
    dreamRole: "",
  });
  const router = useRouter();
  const { data: session } = useSession();
  
  // Get GitHub username from session or localStorage
  const sessionGithubUsername = session?.user?.login || "";
  const storedGithubData = localStorage.getItem("githubData");
  const storedGithubUsername = storedGithubData ? JSON.parse(storedGithubData).login : "";
  const githubUsername = sessionGithubUsername || storedGithubUsername;
  
  // Check both session and localStorage for connection status
  const githubConnected = Boolean(githubUsername) || Boolean(localStorage.getItem("githubData"));
  const linkedinConnected = Boolean((session as any)?.user?.linkedinId) || Boolean(localStorage.getItem("linkedinData"));

  // Store account data in localStorage when session changes
  useEffect(() => {
    if (session?.user) {
      const user = session.user as any;
      
      // Store GitHub data
      if (user.id && user.login) {
        const githubData = {
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          bio: user.bio,
          followers: user.followers,
          following: user.following,
          public_repos: user.public_repos,
          company: user.company,
          location: user.location,
          blog: user.blog,
          created_at: user.created_at,
          updated_at: user.updated_at,
          organization: user.organization,
          hireable: user.hireable,
        };
        localStorage.setItem("githubData", JSON.stringify(githubData));
        
        // Also store in server-side cookies for persistence
        fetch('/api/auth/link-accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: 'github', data: githubData })
        }).catch(console.error);
      }
      
      // Store LinkedIn data
      if (user.linkedinId) {
        const linkedinData = {
          linkedinId: user.linkedinId,
          linkedinName: user.linkedinName,
          linkedinImage: user.linkedinImage,
        };
        localStorage.setItem("linkedinData", JSON.stringify(linkedinData));
        
        // Also store in server-side cookies for persistence
        fetch('/api/auth/link-accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: 'linkedin', data: linkedinData })
        }).catch(console.error);
      }
    }
  }, [session]);


  const handleLogin = async () => {
    try {
      // Store current LinkedIn data before GitHub login
      const currentLinkedInData = localStorage.getItem("linkedinData");
      
      const result = await signIn("github", {
        callbackUrl: "/onboarding?step=2",
        redirect: false, // Let NextAuth handle the redirect
      });

      if (result?.error) {
        console.error("GitHub login failed:", result.error);
        alert("Login failed. Please try again.");
        // Show error to user
      }

      // If login is successful
      if (result?.ok && result.url) {
        if (!localStorage.getItem("githubActionsDone")) {
          try {
            await fetch("/api/github-actions");
            localStorage.setItem("githubActionsDone", "true");
          } catch (err) {
            console.warn("GitHub actions failed", err);
          }
        }

        // Restore LinkedIn data after GitHub login
        if (currentLinkedInData) {
          localStorage.setItem("linkedinData", currentLinkedInData);
        }

        // Now manually redirect
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      // Store current GitHub data before LinkedIn login
      const currentGitHubData = localStorage.getItem("githubData");
      
      const result = await signIn("linkedin", {
        callbackUrl: "/onboarding?step=5",
        redirect: false,
      });

      if (result?.error) {
        console.error("LinkedIn login failed:", result.error);
        alert("LinkedIn login failed. Please try again.");
        return;
      }

      if (result?.ok && result.url) {
        // Restore GitHub data after LinkedIn login
        if (currentGitHubData) {
          localStorage.setItem("githubData", currentGitHubData);
        }
        
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("LinkedIn login error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };



  // Load account data from server on mount
  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const response = await fetch('/api/auth/link-accounts');
        if (response.ok) {
          const data = await response.json();
          
          // Store GitHub data if available
          if (data.github) {
            localStorage.setItem("githubData", JSON.stringify(data.github));
          }
          
          // Store LinkedIn data if available
          if (data.linkedin) {
            localStorage.setItem("linkedinData", JSON.stringify(data.linkedin));
          }
        }
      } catch (error) {
        console.error('Failed to load account data:', error);
      }
    };
    
    loadAccountData();
  }, []);

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
      if (stepNumber >= 1 && stepNumber <= 7) {
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

  const toggleSection = useCallback((section: string) => {
    setState((prev) => ({
      ...prev,
      expandedSections: {
        ...prev.expandedSections,
        [section]: !prev.expandedSections[section],
      },
    }));
  }, []);

  const isValidLeetCodeUsername = useCallback((value: string) => {
    // Simple validation: 3-20 chars, letters, numbers, underscore, or hyphen
    const normalized = value.trim();
    if (normalized.length === 0) return false;
    const pattern = /^[A-Za-z0-9_-]{3,20}$/;
    return pattern.test(normalized);
  }, []);

  const handleGetStarted = useCallback(() => {
    setShowOnboarding(true);
    setCurrentStep(1); // Start with GitHub step
  }, []);

  const updateUrlStep = useCallback(
    (step: number) => {
      router.replace(`/onboarding?step=${step}`, { scroll: false });
    },
    [router]
  );

  const nextStep = useCallback(() => {
    if (currentStep < 8) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      updateUrlStep(newStep);
    }
  }, [currentStep, updateUrlStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      updateUrlStep(newStep);
    } else if (currentStep === 1) {
      setShowOnboarding(false);
      setCurrentStep(0);
      router.replace("/onboarding", { scroll: false });
    }
  }, [currentStep, updateUrlStep, router]);

  const goToStep = useCallback(
    (stepIndex: number) => {
      setCurrentStep(stepIndex);
      updateUrlStep(stepIndex);
    },
    [updateUrlStep]
  );

  const markStepComplete = useCallback(
    (stepId: string) => {
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps((prev) => [...prev, stepId]);
        setTimeout(() => {
          setCurrentStep((prev) => {
            const stepOrder = steps.map((s) => s.id);
            const completedIndex = stepOrder.indexOf(stepId);

            const prevIndex = prev;

            if (prevIndex <= completedIndex && prev < 8) {
              const next = prev + 1;
              updateUrlStep(next);
              return next;
            }
            // If we're already past, do not change the current step
            return prev;
          });
        }, 1000);
      }
    },
    [completedSteps, updateUrlStep]
  );

  useEffect(() => {
    if (githubConnected && !completedSteps.includes("github")) {
      markStepComplete("github");
    }
  }, [githubConnected, completedSteps, markStepComplete]);

  // Auto-complete LinkedIn when connected via OAuth
  useEffect(() => {
    if (linkedinConnected && !completedSteps.includes("linkedin")) {
      markStepComplete("linkedin");
    }
  }, [linkedinConnected, completedSteps, markStepComplete]);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 5: // LinkedIn
        return linkedinConnected;
      case 6: // LeetCode
        return isValidLeetCodeUsername(state.leetcodeHandle);
      case 7: // Career Planning
        return state.primarySpecialization !== "" && 
               state.secondarySpecializations.length === 3 && 
               state.timeToUpskill > 0 && 
               state.timeToUpskill <= 120 && 
               state.expectedSalary !== "" && 
               state.selectedTools.length > 0 &&
               state.dreamCompany !== "" &&
               state.dreamRole !== "";
      default:
        return true;
    }
  }, [currentStep, state.leetcodeHandle, state.linkedinHandle, linkedinConnected, isValidLeetCodeUsername, state.primarySpecialization, state.secondarySpecializations, state.timeToUpskill, state.expectedSalary, state.selectedTools, state.dreamCompany, state.dreamRole]);

  // Step Indicator Component with clickable steps
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-4 sm:mb-6 px-4">
      <div className="flex items-center justify-between w-full max-w-md sm:max-w-lg">
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
                    w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 cursor-pointer hover:scale-105
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
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : Icon ? (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <CustomIcon
                      iconType={step.icon as string}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  )}
                </button>
                <span
                  className={`
                    mt-1 text-xs font-medium cursor-pointer text-center leading-tight
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
                    flex-1 h-0.5 mx-2 sm:mx-3 transition-all duration-200
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
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
        >
          Welcome to Dijkstra
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Let's get you set up with all the essential tools for your coding
          journey
        </motion.p>

        {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl mx-auto"
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
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto px-4">
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
            className="px-6 sm:px-8 py-4 sm:py-6 cursor-pointer text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200"
            size="lg"
          >
            Get Started
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
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
    <div className="space-y-6 h-[600px]">
      {/* Step Indicator */}
      <StepIndicator />

      {/* Header Section */}
      <div className="text-center space-y-4 pt-12 sm:pt-16 lg:pt-24">
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
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Connect GitHub</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
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
              {githubConnected ? (
                <Button
                  className="w-full h-12 text-base cursor-default font-semibold bg-green-600 text-white rounded-xl transition-all duration-200"
                  size="lg"
                  disabled
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  GitHub Connected @{githubUsername}
                </Button>
              ) : (
                <Button
                  className="w-full h-12 text-base cursor-pointer font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  size="lg"
                  disabled={authRedirecting}
                  onClick={() => {
                    setAuthRedirecting(true);
                    setAuthRedirectingProvider("github");
                    handleLogin();
                  }}
                >
                  {authRedirecting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <Github className="w-5 h-5 mr-2" />
                      Sign in with GitHub
                    </>
                  )}
                </Button>
              )}

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

      {/* Header Section */}
      <div className="text-center space-y-4 pt-12 sm:pt-16 lg:pt-24">
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
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Setup Git</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Ensure Git is properly configured on your system
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4 px-4 sm:px-0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-3 text-gray-900 dark:text-white">
                Have you set up Git?
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant={state.gitSetup === true ? "default" : "outline"}
                  onClick={() => {
                    updateState({ gitSetup: true });
                    markStepComplete("git");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  Yes
                </Button>
                <Button
                  variant={state.gitSetup === false ? "default" : "outline"}
                  onClick={() => updateState({ gitSetup: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
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

      {/* Header Section */}
      <div className="text-center space-y-4 pt-12 sm:pt-16 lg:pt-24">
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
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Setup VS Code</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Set up your development environment
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4 px-4 sm:px-0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-3 text-gray-900 dark:text-white">
                Are you familiar with the CLI?
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant={state.cliKnowledge === true ? "default" : "outline"}
                  onClick={() => {
                    updateState({ cliKnowledge: true });
                    markStepComplete("vscode");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  Yes
                </Button>
                <Button
                  variant={state.cliKnowledge === false ? "default" : "outline"}
                  onClick={() => updateState({ cliKnowledge: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
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

      {/* Header Section */}
      <div className="text-center space-y-4 pt-12 sm:pt-16 lg:pt-24">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <IconBrandDiscord className="w-8 h-8 text-white" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Join Discord</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Join our community for support and collaboration
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto space-y-4 px-4 sm:px-0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-3 text-gray-900 dark:text-white">
                Have you joined our Discord?
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant={state.discordJoined === true ? "default" : "outline"}
                  onClick={() => {
                    updateState({ discordJoined: true });
                    markStepComplete("discord");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  Yes
                </Button>
                <Button
                  variant={
                    state.discordJoined === false ? "default" : "outline"
                  }
                  onClick={() => updateState({ discordJoined: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
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
    const [checking, setChecking] = useState(false);
    const [exists, setExists] = useState<boolean | null>(null);
    const [lastCheckedUsername, setLastCheckedUsername] = useState<string>("");

    // Update local state when global state changes (e.g., from localStorage)
    useEffect(() => {
      setLocalLeetCodeHandle(state.leetcodeHandle);
    }, [state.leetcodeHandle]);

    // Debounced existence check
    useEffect(() => {
      const value = localLeetCodeHandle.trim();
      
      if (!isValidLeetCodeUsername(value)) {
        setExists(null);
        setChecking(false);
        setLastCheckedUsername("");
        return;
      }

      // If we already checked this username, don't check again
      if (value === lastCheckedUsername) {
        return;
      }

      setChecking(true);
      setExists(null);
      
      const id = setTimeout(async () => {
        try {
          const res = await fetch(`/api/leetcode-user-exists?u=${encodeURIComponent(value)}`);
          const data = await res.json();
          
          if (!res.ok) {
            setExists(false);
          } else {
            setExists(Boolean(data.exists));
            setLastCheckedUsername(value);
          }
        } catch (error) {
          setExists(false);
        } finally {
          setChecking(false);
        }
      }, 500);
      
      return () => clearTimeout(id);
    }, [localLeetCodeHandle, isValidLeetCodeUsername, lastCheckedUsername]);

    const handleSave = () => {
      updateState({ leetcodeHandle: localLeetCodeHandle });
      markStepComplete("leetcode");
    };

    return (
      <div className="space-y-6 h-[600px]">
        {/* Step Indicator */}
        <StepIndicator />

        {/* Header Section */}
        <div className="text-center space-y-4 pt-12 sm:pt-16 lg:pt-24">
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Setup LeetCode
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
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
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center">
                  <Input
                    id="leetcode-handle"
                    placeholder="Enter your LeetCode username"
                    value={localLeetCodeHandle}
                    onChange={(e) => setLocalLeetCodeHandle(e.target.value)}
                    className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 text-sm h-10 sm:h-9"
                  />
                  {localLeetCodeHandle.trim() !== "" && (
                    !isValidLeetCodeUsername(localLeetCodeHandle) ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : checking ? (
                      <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    ) : exists === true ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : exists === false ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : null
                  )}
                  <Button
                    onClick={handleSave}
                    disabled={!(isValidLeetCodeUsername(localLeetCodeHandle) && exists === true)}
                    className="px-4 h-10 sm:h-9 w-full sm:w-auto"
                    size="sm"
                  >
                    Save
                  </Button>
                </div>
              </div>

              {/* Removed LeetCode help dropdown */}
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

  // LinkedIn Step simplified to OAuth-only
  const LinkedInStep = () => {
    return (
      <div className="space-y-6 h-[600px]">
        {/* Step Indicator */}
        <StepIndicator />

        {/* Header Section */}
        <div className="text-center space-y-4 pt-12 sm:pt-16 lg:pt-24">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
          >
            <IconBrandLinkedin className="w-8 h-8 text-white" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Setup LinkedIn
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
              Build your professional network
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-sm mx-auto space-y-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="space-y-4">
              {/* LinkedIn connect button */}
              <div className="space-y-2">
                {linkedinConnected ? (
                  <Button
                    className="w-full h-10 text-base cursor-default font-semibold bg-green-600 text-white rounded-xl transition-all duration-200"
                    size="lg"
                    disabled
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    LinkedIn Connected
                  </Button>
                ) : (
                  <Button
                    className="w-full h-10 text-base font-semibold bg-[#0A66C2] hover:bg-[#0a66c2]/90 text-white rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    size="lg"
                    disabled={authRedirecting}
                    onClick={() => {
                      setAuthRedirecting(true);
                      setAuthRedirectingProvider("linkedin");
                      handleLinkedInLogin();
                    }}
                  >
                    {authRedirecting && authRedirectingProvider === "linkedin" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      <>
                        <IconBrandLinkedin className="w-4 h-4 mr-2" />
                        Connect LinkedIn
                      </>
                    )}
                  </Button>
                )}

                <p className="text-xs text-gray-500 text-center">
                  Connecting LinkedIn confirms you have a LinkedIn account. Your GitHub connection will be preserved.
                </p>
              </div>

              {/* Removed LinkedIn profile help dropdown */}
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

  // Career Planning Step
  const CareerPlanningStep = () => {
    const [localPrimarySpec, setLocalPrimarySpec] = useState(state.primarySpecialization);
    const [localSecondarySpecs, setLocalSecondarySpecs] = useState(state.secondarySpecializations);
    const [localTimeToUpskill, setLocalTimeToUpskill] = useState(state.timeToUpskill);
    const [localExpectedSalary, setLocalExpectedSalary] = useState(state.expectedSalary);
    const [localSelectedTools, setLocalSelectedTools] = useState(state.selectedTools);
    const [localDreamCompany, setLocalDreamCompany] = useState(state.dreamCompany);
    const [localDreamRole, setLocalDreamRole] = useState(state.dreamRole);
    const [selectedCompanyData, setSelectedCompanyData] = useState<{name: string, logo_url?: string} | null>(null);

    const handleSave = () => {
      updateState({
        primarySpecialization: localPrimarySpec,
        secondarySpecializations: localSecondarySpecs,
        timeToUpskill: localTimeToUpskill,
        expectedSalary: localExpectedSalary,
        selectedTools: localSelectedTools,
        dreamCompany: localDreamCompany,
        dreamRole: localDreamRole,
      });
      markStepComplete("career");
    };

    const handlePrimarySpecChange = (spec: string) => {
      setLocalPrimarySpec(spec);
      // Remove from secondary if it was there
      setLocalSecondarySpecs(prev => prev.filter(s => s !== spec));
    };

    const handleSecondarySpecChange = (spec: string) => {
      if (localSecondarySpecs.includes(spec)) {
        setLocalSecondarySpecs(prev => prev.filter(s => s !== spec));
      } else if (localSecondarySpecs.length < 3) {
        setLocalSecondarySpecs(prev => [...prev, spec]);
      }
    };

    return (
      <div className="space-y-6 h-[600px] overflow-y-auto">
        {/* Step Indicator */}
        <StepIndicator />

        {/* Header Section */}
        <div className="text-center space-y-4 pt-12 sm:pt-16 lg:pt-24">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
          >
            <CustomIcon iconType="career" className="w-8 h-8" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Career Planning</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
              Let's plan your career path and set your goals
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
          {/* Specializations */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Career Specializations</h3>
            <p className="text-sm text-muted-foreground mb-6">Choose your primary specialization and 3 secondary areas of interest</p>
            
            {/* Selection Status */}
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Selection Progress</span>
                <span className="text-xs text-muted-foreground">
                  {localPrimarySpec ? "1" : "0"}/1 Primary • {localSecondarySpecs.length}/3 Secondary
                </span>
              </div>
              <div className="flex gap-2">
                <div className={`flex-1 h-2 rounded-full ${localPrimarySpec ? "bg-primary" : "bg-white/20"}`}></div>
                <div className={`flex-1 h-2 rounded-full ${localSecondarySpecs.length >= 1 ? "bg-primary" : "bg-white/20"}`}></div>
                <div className={`flex-1 h-2 rounded-full ${localSecondarySpecs.length >= 2 ? "bg-primary" : "bg-white/20"}`}></div>
                <div className={`flex-1 h-2 rounded-full ${localSecondarySpecs.length >= 3 ? "bg-primary" : "bg-white/20"}`}></div>
              </div>
            </div>

            {/* Career Paths Grid - Grouped by Factions */}
            <div className="space-y-6">
              {/* Group paths by faction */}
              {Object.entries(
                Object.entries(CAREER_PATHS).reduce((acc, [key, path]) => {
                  const faction = path.faction || "Other";
                  if (!acc[faction]) acc[faction] = [];
                  acc[faction].push([key, path]);
                  return acc;
                }, {} as Record<string, Array<[string, typeof CAREER_PATHS[keyof typeof CAREER_PATHS]]>>)
              ).map(([faction, paths]) => {
                // Get the gradient from the first path in this faction
                const factionGradient = paths[0][1].gradient;
                
                return (
                  <div key={faction} className="space-y-3">
                    {/* Faction Header */}
                    <div className={`flex items-center gap-2 pb-2 border-b border-white/20`}>
                      <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${factionGradient}`}></div>
                      <h4 className="text-base font-semibold text-foreground">{faction}</h4>
                      <span className="text-xs text-muted-foreground">({paths.length} paths)</span>
                    </div>
                    
                    {/* Faction Paths Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {paths.map(([key, path]) => {
                        const isPrimary = localPrimarySpec === key;
                        const isSecondary = localSecondarySpecs.includes(key);
                        const isDisabled = !isPrimary && !isSecondary && localSecondarySpecs.length >= 3 && localPrimarySpec !== "";
                        
                        return (
                          <div
                            key={key}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              isPrimary
                                ? "border-primary bg-primary/10 ring-2 ring-primary/50"
                                : isSecondary
                                ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/50"
                                : isDisabled
                                ? "border-white/10 opacity-50 cursor-not-allowed"
                                : "border-white/20 hover:border-white/40 hover:bg-white/5"
                            }`}
                            onClick={() => {
                              if (isDisabled) return;
                              
                              if (!localPrimarySpec) {
                                // First selection is always primary
                                handlePrimarySpecChange(key);
                              } else if (isPrimary) {
                                // Allow deselection of primary
                                setLocalPrimarySpec("");
                              } else if (isSecondary) {
                                // Deselect secondary
                                handleSecondarySpecChange(key);
                              } else {
                                // Select as secondary (if we have space)
                                if (localSecondarySpecs.length < 3) {
                                  handleSecondarySpecChange(key);
                                }
                              }
                            }}
                          >
                            <div className="text-center">
                              <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center p-2 shadow-lg`}>
                                <img 
                                  src={`/${path.icon}`} 
                                  alt={path.label}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    // Fallback to shortLabel if image doesn't exist
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                      const span = document.createElement('span');
                                      span.className = 'text-white text-xs font-bold';
                                      span.textContent = path.shortLabel;
                                      parent.appendChild(span);
                                    }
                                  }}
                                />
                              </div>
                              <h4 className="text-xs font-medium text-foreground mb-1">{path.label}</h4>
                              
                              {/* Selection Indicators */}
                              {(isPrimary || isSecondary) && (
                                <div className="flex justify-center">
                                  {isPrimary && (
                                    <Badge variant="default" className="text-xs bg-primary px-2 py-0.5">
                                      Primary
                                    </Badge>
                                  )}
                                  {isSecondary && (
                                    <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5">
                                      Secondary
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-600 mb-1">Step 1: Choose Primary Specialization</h4>
                  <p className="text-xs text-blue-500/80">
                    {!localPrimarySpec 
                      ? "Click on any career path to set it as your primary specialization"
                      : `${CAREER_PATHS[localPrimarySpec as keyof typeof CAREER_PATHS]?.label} is your primary specialization`
                    }
                  </p>
                </div>
              </div>
              
              {localPrimarySpec && (
                <div className="flex items-start gap-3 mt-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-1">Step 2: Choose 3 Secondary Specializations</h4>
                    <p className="text-xs text-green-500/80">
                      {localSecondarySpecs.length === 0
                        ? "Now select 3 additional areas of interest from the remaining options"
                        : `Selected ${localSecondarySpecs.length}/3 secondary specializations`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Time to Upskill and Expected Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Time to Upskill</h3>
              <p className="text-sm text-muted-foreground mb-4">How much time do you have until you start applying?</p>
              <Select 
                value={localTimeToUpskill > 0 ? localTimeToUpskill.toString() : ""} 
                onValueChange={(value) => setLocalTimeToUpskill(parseInt(value))}
              >
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Select timeframe from dropdown" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem key={time.value} value={time.value.toString()}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Time Display */}
              {localTimeToUpskill > 0 && (
                <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-600 font-medium">
                      That's {formatTimeDisplay(localTimeToUpskill)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Expected Salary</h3>
              <p className="text-sm text-muted-foreground mb-4">What's your target salary range?</p>
              <Select value={localExpectedSalary} onValueChange={setLocalExpectedSalary}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Select salary range" />
                </SelectTrigger>
                <SelectContent>
                  {SALARY_RANGES.map((salary) => (
                    <SelectItem key={salary.value} value={salary.value}>
                      {salary.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dream Company and Dream Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Dream Company</h3>
              <p className="text-sm text-muted-foreground mb-4">Which company would you love to work for?</p>
              <CompanyAutoComplete
                value={localDreamCompany}
                onChange={(company) => {
                  setLocalDreamCompany(company.name);
                  setSelectedCompanyData(company);
                }}
                selectedCompany={selectedCompanyData}
              />
              
              {/* Selected Company Display */}
              {localDreamCompany && (
                <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    {selectedCompanyData?.logo_url ? (
                      <img 
                        src={selectedCompanyData.logo_url} 
                        alt={`${localDreamCompany} logo`}
                        className="w-8 h-8 rounded-lg object-contain border bg-white"
                      />
                    ) : (
                      <img
                        src={`/abstract-geometric-shapes.png?key=kh3mj&height=32&width=32&query=${encodeURIComponent(`${localDreamCompany} company logo`)}`}
                        alt={`${localDreamCompany} logo`}
                        className="w-8 h-8 rounded-lg object-contain border bg-white"
                      />
                    )}
                    <span className="text-sm text-blue-600 font-medium">
                      Selected: {localDreamCompany}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Dream Role</h3>
              <p className="text-sm text-muted-foreground mb-4">What's your ideal job title or position?</p>
              <Input
                value={localDreamRole}
                onChange={(e) => setLocalDreamRole(e.target.value)}
                placeholder="e.g., Senior Software Engineer, Product Manager..."
                className="bg-white/10 border-white/20"
              />
            </div>
          </div>

          {/* Tools Selection */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Tools & Technologies</h3>
            <p className="text-sm text-muted-foreground mb-4">Select the tools you'd like to upskill in (choose as many as you want)</p>
            
            <MultiSelect
              options={TOOLS_LIST}
              selected={localSelectedTools}
              onChange={setLocalSelectedTools}
              placeholder="Search and select tools..."
            />
            
            <div className="mt-4 text-sm text-muted-foreground">
              Selected: {localSelectedTools.length} tools
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <Button
              onClick={handleSave}
              disabled={!(
                localPrimarySpec !== "" &&
                localSecondarySpecs.length === 3 &&
                localTimeToUpskill > 0 &&
                localTimeToUpskill <= 120 &&
                localExpectedSalary !== "" &&
                localSelectedTools.length > 0 &&
                localDreamCompany !== "" &&
                localDreamRole !== ""
              )}
              className="px-8 py-3"
              size="lg"
            >
              Save Career Plan
            </Button>
          </div>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Congratulations! 🎉
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto px-4">
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
            <div className="text-2xl font-bold text-foreground">7</div>
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
                github: null,
                gitSetup: null,
                cliKnowledge: null,
                discordJoined: null,
                leetcodeHandle: "",
                linkedinHandle: "",
                expandedSections: {},
                // Career planning fields
                primarySpecialization: "",
                secondarySpecializations: [],
                timeToUpskill: 0,
                expectedSalary: "",
                selectedTools: [],
                dreamCompany: "",
                dreamRole: "",
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
        return <LinkedInStep />;
      case 6:
        return <LeetCodeStep />;
      case 7:
        return <CareerPlanningStep />;
      case 8:
        return <CompletionStep />;
      default:
        return <WelcomeContent />;
    }
  };

  return (
    <BackgroundPaths title="" showButton={false}>
      <div className="w-full max-w-6xl h-[85vh] sm:h-[90vh] relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Semi-transparent background rectangle */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl" />

        {/* Scrollable content container */}
        <div className="relative h-full overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex items-center justify-center">
          {/* Main Content */}
          <div className="w-full flex flex-col">
            <div className="flex-1">{renderStep()}</div>

            {/* OAuth Redirect Overlay */}
            {authRedirecting && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl">
                <div className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/20 rounded-xl">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Redirecting to {authRedirectingProvider === "linkedin" ? "LinkedIn" : "GitHub"}…</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons - Only show when in onboarding flow */}
            {showOnboarding && currentStep > 0 && currentStep < 8 && (
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 lg:p-8 border-t border-white/10 mt-6 space-y-4 sm:space-y-0">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 w-full sm:w-auto"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>

                <div className="flex flex-col items-center gap-2 order-first sm:order-none">
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
                  className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 w-full sm:w-auto"
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
