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
import { CAREER_PATHS, type CareerPathKey } from "@/data/career-paths";
import { CompanyAutoComplete } from "@/components/company-autocomplete";

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

interface CareerPathCardProps {
  pathKey: CareerPathKey;
  isPrimary?: boolean;
  isSecondary?: boolean;
  onClick: () => void;
  showBadge?: boolean;
  displayMode?: boolean; // New prop for display vs edit mode
}

function CareerPathCard({
  pathKey,
  isPrimary = false,
  isSecondary = false,
  onClick,
  showBadge = true,
  displayMode = false,
}: CareerPathCardProps) {
  const path = CAREER_PATHS[pathKey];

  return (
    <div
      className={`${displayMode ? 'w-32 h-40 p-4' : 'w-auto h-auto p-3'} rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
        displayMode
          ? `bg-gradient-to-br ${path.gradient} border-white/20 ${isPrimary ? 'shadow-2xl ring-2 ring-white/50' : 'shadow-lg'} backdrop-blur-sm`
          : isPrimary
          ? "border-primary bg-primary/10 ring-2 ring-primary/50"
          : isSecondary
          ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/50"
          : "border-white/20 hover:border-white/40 hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      <div className="text-center h-full flex flex-col justify-between">
        <div>
          <div className={`${displayMode ? 'w-12 h-12' : 'w-12 h-12'} mx-auto mb-3 rounded-2xl ${displayMode ? 'bg-white/30 backdrop-blur-sm border border-white/30' : `bg-gradient-to-br ${path.gradient}`} flex items-center justify-center p-2 shadow-lg`}>
            <img 
              src={`/${path.icon}`} 
              alt={path.label}
              className="w-full h-full object-contain filter drop-shadow-sm"
              onError={(e) => {
                // Fallback to shortLabel if image doesn't exist
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = `text-white ${displayMode ? 'text-xs font-bold' : 'text-xs font-bold'}`;
                  span.textContent = path.shortLabel;
                  parent.appendChild(span);
                }
              }}
            />
      </div>
          <h4 className={`${displayMode ? 'text-xs font-medium' : 'text-[10px] font-medium'} ${displayMode ? 'text-white drop-shadow-sm' : 'text-foreground'} mb-2 leading-tight px-1 break-words`}>{path.label}</h4>
    </div>
        
        {/* Selection Indicators */}
        {showBadge && (isPrimary || isSecondary) && (
          <div className="flex justify-center mt-auto">
            {isPrimary && (
              <Badge variant="default" className={`text-[10px] font-semibold px-2 py-0.5 ${displayMode ? 'bg-white/50 text-white border-white/70 shadow-lg backdrop-blur-sm' : 'bg-primary'}`}>
                ⭐ Primary
              </Badge>
            )}
            {isSecondary && (
              <Badge variant="secondary" className={`text-[10px] font-semibold px-2 py-0.5 ${displayMode ? 'bg-white/40 text-white border-white/50 shadow-md backdrop-blur-sm' : 'bg-blue-500/20 text-blue-600'}`}>
                Secondary
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
    );
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
    wantedSalary: "DIAMOND_1",
    timeFrame: 24,
    primaryPath: "FULLSTACK",
    secondaryPaths: ["FRONTEND", "BACKEND", "ML_ENGINEERING"],
  });

  const [selectedCompanyData, setSelectedCompanyData] = useState<{name: string, logo_url?: string} | null>(
    profile.dreamCompany ? { name: profile.dreamCompany } : null
  );

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
                    <div>
                      <label className="text-sm font-medium mb-2 block">Dream Company</label>
                      <CompanyAutoComplete
                      value={profile.dreamCompany}
                        onChange={(company) => {
                          setProfile({ ...profile, dreamCompany: company.name });
                          setSelectedCompanyData(company);
                        }}
                        selectedCompany={selectedCompanyData}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Dream Position</label>
                    <Input
                      value={profile.dreamPosition}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          dreamPosition: e.target.value,
                        })
                      }
                        placeholder="e.g., Senior Software Engineer"
                    />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Wanted Salary</label>
                    <Select
                      value={profile.wantedSalary}
                      onValueChange={(value) =>
                        setProfile({ ...profile, wantedSalary: value })
                      }
                    >
                      <SelectTrigger>
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
                    <div>
                      <label className="text-sm font-medium mb-2 block">Time Frame</label>
                    <Select
                        value={profile.timeFrame.toString()}
                      onValueChange={(value) =>
                          setProfile({ ...profile, timeFrame: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                          <SelectValue placeholder="Select time frame" />
                      </SelectTrigger>
                      <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time.value} value={time.value.toString()}>
                              {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    </div>
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
                                isPrimary={true}
                                onClick={() => setPathSelectionOpen("primary")}
                                showBadge={false}
                              />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-[600px] p-4 max-h-[600px] overflow-y-auto">
                            <h4 className="font-medium mb-4">
                              Select Primary Career Path
                            </h4>
                            <div className="space-y-4">
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
                                  <div key={faction} className="space-y-2">
                                    {/* Faction Header */}
                                    <div className={`flex items-center gap-2 pb-1 border-b border-border`}>
                                      <div className={`w-1 h-4 rounded-full bg-gradient-to-b ${factionGradient}`}></div>
                                      <h5 className="text-sm font-semibold">{faction}</h5>
                                      <span className="text-xs text-muted-foreground">({paths.length})</span>
                                    </div>
                                    
                                    {/* Faction Paths Grid */}
                                    <div className="grid grid-cols-5 gap-2">
                                      {paths.map(([key, path]) => (
                                  <CareerPathCard
                                          key={key}
                                          pathKey={key as CareerPathKey}
                                          isPrimary={profile.primaryPath === key}
                                    onClick={() =>
                                      handlePathSelection(
                                        "primary",
                                              key as CareerPathKey
                                      )
                                    }
                                          showBadge={false}
                                  />
                              ))}
                                    </div>
                                </div>
                                );
                              })}
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
                              className="relative group w-24 h-24"
                            >
                              <CareerPathCard
                                pathKey={pathKey as CareerPathKey}
                                isSecondary={true}
                                onClick={() => {}}
                                showBadge={false}
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
                                  className="w-24 h-24 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 bg-transparent hover:bg-muted/50 transition-all duration-200"
                                  onClick={() =>
                                    setPathSelectionOpen("secondary")
                                  }
                                >
                                  <div className="flex flex-col items-center gap-1">
                                    <X className="w-6 h-6 text-muted-foreground rotate-45" />
                                    <span className="text-xs text-muted-foreground">
                                      Add
                                    </span>
                                  </div>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[600px] p-4 max-h-[600px] overflow-y-auto">
                                <h4 className="font-medium mb-4">
                                  Add Secondary Career Path
                                </h4>
                                <div className="space-y-4">
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
                                      <div key={faction} className="space-y-2">
                                        {/* Faction Header */}
                                        <div className={`flex items-center gap-2 pb-1 border-b border-border`}>
                                          <div className={`w-1 h-4 rounded-full bg-gradient-to-b ${factionGradient}`}></div>
                                          <h5 className="text-sm font-semibold">{faction}</h5>
                                          <span className="text-xs text-muted-foreground">({paths.length})</span>
                                        </div>
                                        
                                        {/* Faction Paths Grid */}
                                        <div className="grid grid-cols-5 gap-2">
                                          {paths
                                            .filter(([key]) => 
                                              key !== profile.primaryPath &&
                                              !profile.secondaryPaths.includes(key)
                                            )
                                            .map(([key, path]) => (
                                        <CareerPathCard
                                                key={key}
                                                pathKey={key as CareerPathKey}
                                          onClick={() =>
                                            handlePathSelection(
                                              "secondary",
                                                    key as CareerPathKey
                                            )
                                          }
                                                showBadge={false}
                                        />
                                    ))}
                                        </div>
                                      </div>
                                    );
                                  })}
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

                  <div className="space-y-6">
                    {/* Dream Company and Position Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Dream Company:
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          {selectedCompanyData?.logo_url ? (
                            <img 
                              src={selectedCompanyData.logo_url} 
                              alt={`${profile.dreamCompany} logo`}
                              className="w-8 h-8 rounded-lg object-contain border bg-white"
                            />
                          ) : (
                            <img
                              src={`/abstract-geometric-shapes.png?key=kh3mj&height=32&width=32&query=${encodeURIComponent(`${profile.dreamCompany} company logo`)}`}
                              alt={`${profile.dreamCompany} logo`}
                              className="w-8 h-8 rounded-lg object-cover border bg-white"
                            />
                          )}
                        <p className="font-medium">{profile.dreamCompany}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Dream Position:
                        </span>
                        <p className="font-medium">{profile.dreamPosition}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Wanted Salary:
                        </span>
                        <p className="font-medium">
                          {SALARY_RANGES.find(s => s.value === profile.wantedSalary)?.label || profile.wantedSalary}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Time Frame:
                        </span>
                        <p className="font-medium">{formatTimeDisplay(profile.timeFrame)}</p>
                      </div>
                    </div>

                    {/* Career Paths Section */}
                      <div>
                      <span className="text-muted-foreground text-sm block mb-4">
                        Career Specializations:
                        </span>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Primary Specialization Column */}
                        <div>
                          <h5 className="text-sm font-semibold text-muted-foreground mb-3">Primary Specialization</h5>
                          <div className="flex justify-center lg:justify-start">
                          <CareerPathCard
                            pathKey={profile.primaryPath as CareerPathKey}
                              isPrimary={true}
                            onClick={() => {}}
                              showBadge={true}
                              displayMode={true}
                          />
                      </div>
                    </div>

                        {/* Secondary Specializations Column */}
                      <div>
                          <h5 className="text-sm font-semibold text-muted-foreground mb-3">Secondary Specializations</h5>
                          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                          {profile.secondaryPaths.map((pathKey) => (
                              <CareerPathCard
                                key={pathKey}
                                pathKey={pathKey as CareerPathKey}
                                isSecondary={true}
                                onClick={() => {}}
                                showBadge={true}
                                displayMode={true}
                              />
                          ))}
                          </div>
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
