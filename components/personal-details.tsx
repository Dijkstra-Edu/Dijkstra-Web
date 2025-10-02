"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Edit,
  Save,
  X,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
} from "lucide-react";
import {
  IconBrandJavascript,
  IconCode,
  IconTestPipe,
  IconShieldCheck,
  IconRobot,
  IconCloud,
  IconServer,
  IconBrain,
  IconChartBar,
  IconDatabase,
  IconDeviceMobile,
  IconBrandApple,
  IconDeviceGamepad,
  IconShield,
  IconPalette,
  IconBulb,
  IconPencil,
  IconDots,
  IconActivity,
  IconApps,
  IconBrandUbuntu,
  IconBrandWindows,
  IconBug,
  IconCpu,
  IconDevices,
  IconGitBranch,
  IconNetwork,
  IconSearch,
  IconSettings,
  IconShieldCode,
  IconShieldLock,
  IconTerminal,
  IconTournament,
  IconDeviceImacHeart,
  IconSitemap,
} from "@tabler/icons-react";

const CAREER_PATHS = {
  FRONTEND: {
    label: "Frontend Engineer",
    shortLabel: "F.E",
    icon: IconBrandJavascript,
    gradient: "from-pink-500 via-blue-500 to-purple-500",
    iconColor: "text-pink-500",
    textGradient: "from-pink-500 to-purple-500",
    description:
      "Build user interfaces and web experiences using modern frameworks like React, Vue, or Angular.",
  },
  BACKEND: {
    label: "Backend Engineer",
    shortLabel: "B.E",
    icon: IconServer,
    gradient: "from-green-500 via-teal-500 to-blue-500",
    iconColor: "text-green-500",
    textGradient: "from-green-500 to-blue-500",
    description:
      "Design and develop server-side applications, APIs, and database systems.",
  },
  FULLSTACK: {
    label: "Fullstack Engineer",
    shortLabel: "F.S",
    icon: IconCode,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    iconColor: "text-orange-500",
    textGradient: "from-orange-500 to-pink-500",
    description:
      "Work on both frontend and backend development, handling the complete web application stack.",
  },
  SDE_TEST: {
    label: "SDE in Test",
    shortLabel: "SDET",
    icon: IconTestPipe,
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
    iconColor: "text-purple-500",
    textGradient: "from-purple-500 to-blue-500",
    description:
      "Develop automated testing frameworks and ensure software quality through comprehensive testing.",
  },
  QUALITY_ASSURANCE: {
    label: "Quality Assurance",
    shortLabel: "QA",
    icon: IconShieldCheck,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    iconColor: "text-emerald-500",
    textGradient: "from-emerald-500 to-teal-500",
    description:
      "Ensure software quality through manual and automated testing processes.",
  },
  TEST_AUTOMATION: {
    label: "Test Automation",
    shortLabel: "TA",
    icon: IconBug,
    gradient: "from-red-500 via-orange-500 to-yellow-500",
    iconColor: "text-red-500",
    textGradient: "from-red-500 to-yellow-500",
    description:
      "Create and maintain automated testing suites and frameworks for continuous testing.",
  },
  DEVOPS: {
    label: "DevOps Engineer",
    shortLabel: "DevOps",
    icon: IconRobot,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    iconColor: "text-blue-500",
    textGradient: "from-blue-500 to-teal-500",
    description:
      "Automate deployment pipelines and manage infrastructure for continuous integration and delivery.",
  },
  MLOPS: {
    label: "MLOps Engineer",
    shortLabel: "MLOps",
    icon: IconGitBranch,
    gradient: "from-purple-600 via-pink-600 to-red-600",
    iconColor: "text-purple-600",
    textGradient: "from-purple-600 to-red-600",
    description:
      "Manage machine learning model deployment, monitoring, and lifecycle in production environments.",
  },
  CI_CD: {
    label: "CI/CD Engineer",
    shortLabel: "CI/CD",
    icon: IconActivity,
    gradient: "from-green-600 via-blue-600 to-purple-600",
    iconColor: "text-green-600",
    textGradient: "from-green-600 to-purple-600",
    description:
      "Design and maintain continuous integration and deployment pipelines for software delivery.",
  },
  CLOUD: {
    label: "Cloud Engineer",
    shortLabel: "Cloud",
    icon: IconCloud,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    iconColor: "text-sky-500",
    textGradient: "from-sky-500 to-indigo-500",
    description:
      "Design and manage cloud infrastructure using AWS, Azure, or Google Cloud Platform.",
  },
  SITE_RELIABILITY: {
    label: "Site Reliability",
    shortLabel: "SRE",
    icon: IconActivity,
    gradient: "from-orange-600 via-red-600 to-pink-600",
    iconColor: "text-orange-600",
    textGradient: "from-orange-600 to-pink-600",
    description:
      "Ensure system reliability, performance, and scalability through engineering practices.",
  },
  SOFTWARE_INFRASTRUCTURE: {
    label: "Software Infrastructure",
    shortLabel: "Infra",
    icon: IconNetwork,
    gradient: "from-slate-600 via-gray-600 to-zinc-600",
    iconColor: "text-slate-600",
    textGradient: "from-slate-600 to-zinc-600",
    description:
      "Build and maintain the foundational software systems that support applications and services.",
  },
  SYSTEMS: {
    label: "Systems Engineer",
    shortLabel: "Sys",
    icon: IconCpu,
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    iconColor: "text-indigo-600",
    textGradient: "from-indigo-600 to-pink-600",
    description:
      "Design and optimize low-level systems, operating systems, and system-level software.",
  },
  EMBEDDED_IOT: {
    label: "Embedded/IoT",
    shortLabel: "IoT",
    icon: IconSitemap,
    gradient: "from-teal-600 via-green-600 to-emerald-600",
    iconColor: "text-teal-600",
    textGradient: "from-teal-600 to-emerald-600",
    description:
      "Develop software for embedded systems, IoT devices, and hardware-software integration.",
  },
  ML_ENGINEERING: {
    label: "ML Engineer",
    shortLabel: "ML Eng",
    icon: IconBrain,
    gradient: "from-violet-500 via-purple-500 to-pink-500",
    iconColor: "text-violet-500",
    textGradient: "from-violet-500 to-pink-500",
    description:
      "Build and deploy machine learning models and AI systems at scale.",
  },
  ML_RESEARCH: {
    label: "ML Research",
    shortLabel: "ML Res",
    icon: IconSearch,
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    iconColor: "text-blue-600",
    textGradient: "from-blue-600 to-purple-600",
    description:
      "Conduct research in machine learning, develop new algorithms, and advance AI capabilities.",
  },
  DATA_SCIENCE_ANALYSIS: {
    label: "Data Scientist",
    shortLabel: "DS",
    icon: IconChartBar,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    iconColor: "text-amber-500",
    textGradient: "from-amber-500 to-red-500",
    description:
      "Analyze complex data to extract insights and build predictive models.",
  },
  DATA_ENGINEERING: {
    label: "Data Engineer",
    shortLabel: "DE",
    icon: IconDatabase,
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    iconColor: "text-teal-500",
    textGradient: "from-teal-500 to-blue-500",
    description:
      "Build and maintain data pipelines and infrastructure for large-scale data processing.",
  },
  APPLICATION: {
    label: "Application Developer",
    shortLabel: "App Dev",
    icon: IconApps,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    iconColor: "text-cyan-500",
    textGradient: "from-cyan-500 to-indigo-500",
    description:
      "Develop desktop and web applications for various platforms and use cases.",
  },
  ANDROID: {
    label: "Android Developer",
    shortLabel: "Android",
    icon: IconDeviceMobile,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    iconColor: "text-green-500",
    textGradient: "from-green-500 to-teal-500",
    description: "Develop native Android applications using Kotlin or Java.",
  },
  IOS: {
    label: "iOS Developer",
    shortLabel: "iOS",
    icon: IconBrandApple,
    gradient: "from-gray-500 via-slate-500 to-zinc-500",
    iconColor: "text-gray-500",
    textGradient: "from-gray-500 to-zinc-500",
    description: "Build native iOS applications using Swift or Objective-C.",
  },
  CROSS_PLATFORM_MOBILE: {
    label: "Cross-Platform Mobile",
    shortLabel: "X-Mobile",
    icon: IconDevices,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    iconColor: "text-purple-500",
    textGradient: "from-purple-500 to-rose-500",
    description:
      "Develop mobile applications that work across multiple platforms using frameworks like React Native or Flutter.",
  },
  WINDOWS: {
    label: "Windows Developer",
    shortLabel: "Windows",
    icon: IconBrandWindows,
    gradient: "from-blue-600 via-sky-600 to-cyan-600",
    iconColor: "text-blue-600",
    textGradient: "from-blue-600 to-cyan-600",
    description:
      "Develop applications specifically for Windows platforms using .NET, C#, or other Windows technologies.",
  },
  MACOS: {
    label: "macOS Developer",
    shortLabel: "macOS",
    icon: IconDeviceImacHeart,
    gradient: "from-gray-600 via-slate-600 to-zinc-600",
    iconColor: "text-gray-600",
    textGradient: "from-gray-600 to-zinc-600",
    description:
      "Build native macOS applications using Swift, Objective-C, or other Apple development tools.",
  },
  LINUX: {
    label: "Linux Developer",
    shortLabel: "Linux",
    icon: IconBrandUbuntu,
    gradient: "from-orange-600 via-red-600 to-pink-600",
    iconColor: "text-orange-600",
    textGradient: "from-orange-600 to-pink-600",
    description:
      "Develop applications and systems for Linux distributions and open-source environments.",
  },
  CROSS_PLATFORM_PC: {
    label: "Cross-Platform PC",
    shortLabel: "X-PC",
    icon: IconDevices,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    iconColor: "text-emerald-600",
    textGradient: "from-emerald-600 to-cyan-600",
    description:
      "Create desktop applications that run across multiple operating systems using frameworks like Electron or Qt.",
  },
  COMPUTER_SYSTEMS: {
    label: "Computer Systems",
    shortLabel: "Comp Sys",
    icon: IconTerminal,
    gradient: "from-slate-700 via-gray-700 to-zinc-700",
    iconColor: "text-slate-700",
    textGradient: "from-slate-700 to-zinc-700",
    description:
      "Work on computer architecture, system design, and low-level system programming.",
  },
  COMPILERS: {
    label: "Compiler Engineer",
    shortLabel: "Compiler",
    icon: IconTournament,
    gradient: "from-violet-600 via-indigo-600 to-blue-600",
    iconColor: "text-violet-600",
    textGradient: "from-violet-600 to-blue-600",
    description:
      "Design and develop compilers, interpreters, and programming language tools.",
  },
  GAME_DEV: {
    label: "Game Developer",
    shortLabel: "Game",
    icon: IconDeviceGamepad,
    gradient: "from-red-500 via-pink-500 to-purple-500",
    iconColor: "text-red-500",
    textGradient: "from-red-500 to-purple-500",
    description:
      "Create interactive games and entertainment software using engines like Unity or Unreal.",
  },
  APPLICATION_SECURITY: {
    label: "App Security",
    shortLabel: "AppSec",
    icon: IconShield,
    gradient: "from-red-600 via-orange-600 to-yellow-600",
    iconColor: "text-red-600",
    textGradient: "from-red-600 to-yellow-600",
    description:
      "Secure applications by identifying vulnerabilities and implementing security measures.",
  },
  PLATFORM_SECURITY: {
    label: "Platform Security",
    shortLabel: "PlatSec",
    icon: IconShieldLock,
    gradient: "from-red-700 via-pink-700 to-purple-700",
    iconColor: "text-red-700",
    textGradient: "from-red-700 to-purple-700",
    description:
      "Secure entire platforms and infrastructure against threats and vulnerabilities.",
  },
  DEVSECOPS: {
    label: "DevSecOps",
    shortLabel: "DevSec",
    icon: IconShieldCode,
    gradient: "from-orange-700 via-red-700 to-pink-700",
    iconColor: "text-orange-700",
    textGradient: "from-orange-700 to-pink-700",
    description:
      "Integrate security practices into DevOps workflows and development processes.",
  },
  UI_UX: {
    label: "UI/UX Designer",
    shortLabel: "UI/UX",
    icon: IconPalette,
    gradient: "from-pink-500 via-rose-500 to-red-500",
    iconColor: "text-pink-500",
    textGradient: "from-pink-500 to-red-500",
    description:
      "Design user interfaces and experiences that are both beautiful and functional.",
  },
  PRODUCT_MANAGEMENT: {
    label: "Product Manager",
    shortLabel: "PM",
    icon: IconBulb,
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    iconColor: "text-yellow-500",
    textGradient: "from-yellow-500 to-orange-500",
    description:
      "Define product strategy and work with engineering teams to build user-focused products.",
  },
  PRODUCT_ENGINEERING: {
    label: "Product Engineer",
    shortLabel: "PE",
    icon: IconSettings,
    gradient: "from-amber-600 via-orange-600 to-red-600",
    iconColor: "text-amber-600",
    textGradient: "from-amber-600 to-red-600",
    description:
      "Bridge product management and engineering to build scalable, user-centric technical solutions.",
  },
  TECHNICAL_WRITING: {
    label: "Technical Writer",
    shortLabel: "TW",
    icon: IconPencil,
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    iconColor: "text-indigo-500",
    textGradient: "from-indigo-500 to-cyan-500",
    description:
      "Create clear documentation and technical content for developers and users.",
  },
  OTHER: {
    label: "Other",
    shortLabel: "Other",
    icon: IconDots,
    gradient: "from-gray-500 via-slate-500 to-zinc-500",
    iconColor: "text-gray-500",
    textGradient: "from-gray-500 to-zinc-500",
    description:
      "Explore other career paths in technology and software development.",
  },
};

const SALARY_RANGES = [
  "1-2 LPA",
  "2-6 LPA",
  "6-10 LPA",
  "10-14 LPA",
  "14-18 LPA",
  "18-24 LPA",
  "24-30 LPA",
  "30-48 LPA",
  "48-64 LPA",
  "64 LPA - 1Cr",
  "1Cr+",
];

const TIME_FRAMES = [
  "6 months",
  "1 year",
  "1.5 years",
  "2 years",
  "2.5 years",
  "3 years",
  "3.5 years",
  "4 years",
  "4.5 years",
  "5 years",
  "6 years",
  "7 years",
  "8 years",
  "9 years",
  "10 years",
];

type CareerPathKey = keyof typeof CAREER_PATHS;

interface CareerPathCardProps {
  pathKey: CareerPathKey;
  isSelected: boolean;
  onClick: () => void;
  showTooltip?: boolean;
}

function CareerPathCard({
  pathKey,
  isSelected,
  onClick,
  showTooltip = true,
}: CareerPathCardProps) {
  const path = CAREER_PATHS[pathKey];
  const IconComponent = path.icon;

  const card = (
    <div
      className={`flex flex-col items-center justify-center p-[2px] rounded-lg border-2 cursor-pointer transition-all
                  ${isSelected ? "border-primary" : "border-transparent"}
                  bg-gradient-to-r ${
                    path.gradient
                  } bg-origin-border hover:scale-105`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center w-full h-full bg-background rounded-md py-2 px-3">
        <IconComponent className={`h-12 w-12 mb-1 ${path.iconColor}`} />
        <span
          className={`text-xs font-bold text-transparent bg-clip-text text-center
                     bg-gradient-to-r ${path.textGradient}`}
        >
          {path.shortLabel}
        </span>
      </div>
    </div>
  );

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{card}</TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">
            <p className="font-semibold">{path.label}</p>
            <p className="text-sm text-muted-foreground">{path.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return card;
}

export function PersonalDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    title: "Computer Science Student",
    bio: "Passionate computer science student with a focus on full-stack development and machine learning. Always eager to learn new technologies and contribute to meaningful projects.",
    location: "San Francisco, CA",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    website: "alexjohnson.dev",
    github: "alexjohnson",
    linkedin: "alex-johnson-dev",
    dreamCompany: "Google",
    dreamPosition: "Senior Software Engineer",
    wantedSalary: "18-24 LPA",
    timeFrame: "2 years",
    primaryPath: "FULLSTACK",
    secondaryPaths: ["FRONTEND", "BACKEND", "ML_ENGINEERING"],
  });

  const [pathSelectionOpen, setPathSelectionOpen] = useState<
    "primary" | "secondary" | null
  >(null);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handlePathSelection = (type: string, pathKey: CareerPathKey) => {
    if (type === "primary") {
      setProfile({ ...profile, primaryPath: pathKey });
    } else {
      const newSecondaryPaths = [...profile.secondaryPaths];
      const index = newSecondaryPaths.indexOf(pathKey);
      if (index > -1) {
        newSecondaryPaths.splice(index, 1);
      } else if (newSecondaryPaths.length < 3) {
        newSecondaryPaths.push(pathKey);
      }
      setProfile({ ...profile, secondaryPaths: newSecondaryPaths });
    }
    setPathSelectionOpen(null);
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Personal Details</CardTitle>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  placeholder="Full Name"
                />
                <Input
                  value={profile.title}
                  onChange={(e) =>
                    setProfile({ ...profile, title: e.target.value })
                  }
                  placeholder="Title/Position"
                />
                <Textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  placeholder="Bio"
                  rows={3}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                    placeholder="Location"
                  />
                  <Input
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                  <Input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    placeholder="Phone"
                  />
                  <Input
                    value={profile.website}
                    onChange={(e) =>
                      setProfile({ ...profile, website: e.target.value })
                    }
                    placeholder="Website"
                  />
                  <Input
                    value={profile.github}
                    onChange={(e) =>
                      setProfile({ ...profile, github: e.target.value })
                    }
                    placeholder="GitHub Username"
                  />
                  <Input
                    value={profile.linkedin}
                    onChange={(e) =>
                      setProfile({ ...profile, linkedin: e.target.value })
                    }
                    placeholder="LinkedIn Username"
                  />
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Career Goals</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={profile.dreamCompany}
                      onChange={(e) =>
                        setProfile({ ...profile, dreamCompany: e.target.value })
                      }
                      placeholder="Dream Company"
                    />
                    <Input
                      value={profile.dreamPosition}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          dreamPosition: e.target.value,
                        })
                      }
                      placeholder="Dream Position"
                    />
                    <Select
                      value={profile.wantedSalary}
                      onValueChange={(value) =>
                        setProfile({ ...profile, wantedSalary: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wanted Salary" />
                      </SelectTrigger>
                      <SelectContent>
                        {SALARY_RANGES.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={profile.timeFrame}
                      onValueChange={(value) =>
                        setProfile({ ...profile, timeFrame: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Time Frame" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_FRAMES.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <label className="text-sm font-medium mb-3 block">
                          Primary Career Path
                        </label>
                        <Popover
                          open={pathSelectionOpen === "primary"}
                          onOpenChange={(open) =>
                            setPathSelectionOpen(open ? "primary" : null)
                          }
                        >
                          <PopoverTrigger asChild>
                            <div className="w-24 h-24 cursor-pointer">
                              <CareerPathCard
                                pathKey={profile.primaryPath as CareerPathKey}
                                isSelected={true}
                                onClick={() => setPathSelectionOpen("primary")}
                                showTooltip={false}
                              />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-[420px] p-4">
                            <h4 className="font-medium mb-3">
                              Select Primary Career Path
                            </h4>
                            <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto p-2">
                              {Object.keys(CAREER_PATHS).map((pathKey) => (
                                <div key={pathKey} className="w-20 h-20">
                                  <CareerPathCard
                                    pathKey={pathKey as CareerPathKey}
                                    isSelected={profile.primaryPath === pathKey}
                                    onClick={() =>
                                      handlePathSelection(
                                        "primary",
                                        pathKey as CareerPathKey
                                      )
                                    }
                                    showTooltip={false}
                                  />
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-3 block">
                          Secondary Career Paths (up to 3)
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {profile.secondaryPaths.map((pathKey, index) => (
                            <div
                              key={pathKey}
                              className="relative group w-20 h-20"
                            >
                              <CareerPathCard
                                pathKey={pathKey as CareerPathKey}
                                isSelected={true}
                                onClick={() => {}}
                                showTooltip={false}
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                  const newSecondaryPaths =
                                    profile.secondaryPaths.filter(
                                      (_, i) => i !== index
                                    );
                                  setProfile({
                                    ...profile,
                                    secondaryPaths: newSecondaryPaths,
                                  });
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                          {profile.secondaryPaths.length < 3 && (
                            <Popover
                              open={pathSelectionOpen === "secondary"}
                              onOpenChange={(open) =>
                                setPathSelectionOpen(open ? "secondary" : null)
                              }
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-20 h-20 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 bg-transparent hover:bg-muted/50 transition-all duration-200"
                                  onClick={() =>
                                    setPathSelectionOpen("secondary")
                                  }
                                >
                                  <div className="flex flex-col items-center gap-1">
                                    <IconDots className="w-6 h-6 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      Add
                                    </span>
                                  </div>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[420px] p-4">
                                <h4 className="font-medium mb-3">
                                  Add Secondary Career Path
                                </h4>
                                <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto p-2">
                                  {Object.keys(CAREER_PATHS)
                                    .filter(
                                      (pathKey) =>
                                        pathKey !== profile.primaryPath &&
                                        !profile.secondaryPaths.includes(
                                          pathKey
                                        )
                                    )
                                    .map((pathKey) => (
                                      <div key={pathKey} className="w-20 h-20">
                                        <CareerPathCard
                                          pathKey={pathKey as CareerPathKey}
                                          isSelected={false}
                                          onClick={() =>
                                            handlePathSelection(
                                              "secondary",
                                              pathKey as CareerPathKey
                                            )
                                          }
                                          showTooltip={false}
                                        />
                                      </div>
                                    ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{profile.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {profile.title}
                  </Badge>
                </div>

                <p className="text-muted-foreground">{profile.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.website}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-muted-foreground" />
                    <span>github.com/{profile.github}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                    <span>linkedin.com/in/{profile.linkedin}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Career Goals</h4>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Column 1: Dream Company and Wanted Salary */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Dream Company:
                        </span>
                        <p className="font-medium">{profile.dreamCompany}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Wanted Salary:
                        </span>
                        <p className="font-medium">{profile.wantedSalary}</p>
                      </div>
                    </div>

                    {/* Column 2: Dream Position and Time Frame */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Dream Position:
                        </span>
                        <p className="font-medium">{profile.dreamPosition}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Time Frame:
                        </span>
                        <p className="font-medium">{profile.timeFrame}</p>
                      </div>
                    </div>

                    {/* Column 3: Primary Career Path */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-muted-foreground text-sm block mb-3">
                          Primary Career Path:
                        </span>
                        <div className="w-24 h-24">
                          <CareerPathCard
                            pathKey={profile.primaryPath as CareerPathKey}
                            isSelected={false}
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Column 4: Secondary Career Paths */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-muted-foreground text-sm block mb-3">
                          Secondary Career Paths:
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {profile.secondaryPaths.map((pathKey) => (
                            <div key={pathKey} className="w-20 h-20">
                              <CareerPathCard
                                pathKey={pathKey as CareerPathKey}
                                isSelected={false}
                                onClick={() => {}}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
