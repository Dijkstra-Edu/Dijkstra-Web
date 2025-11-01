"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { CustomIcon, MultiSelect } from "./shared-components";
import { CompanyAutoComplete } from "@/components/autocompletes/company-autocomplete";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  onboardUserMutation,
  checkOnboardingStatusQuery,
} from "@/server/dataforge/User/QueryOptions/user.queryOptions";
import { Domain, Tools, Rank } from "@/types/server/dataforge/enums";
import { CAREER_PATHS, type CareerPathKey } from "@/data/career-paths";
import {
  TOOLS_LIST,
  TIME_OPTIONS,
  SALARY_RANGES,
  formatTimeDisplay,
} from "./shared-constants";
import type { StepProps } from "@/types/onboarding";
import type { StepId } from "@/lib/Zustand/onboarding-store";

interface CareerStepProps extends StepProps {
  currentStep: number;
  completedSteps: StepId[];
  onStepClick?: (step: number) => void;
  onMarkComplete: (stepId: StepId) => void;
}

export function CareerStep({
  currentStep,
  completedSteps,
  formData,
  updateFormData,
  onStepClick,
  onMarkComplete,
}: CareerStepProps) {
  const { data: session } = useSession();
  const [localPrimarySpec, setLocalPrimarySpec] = useState(
    formData.primarySpecialization
  );
  const [localSecondarySpecs, setLocalSecondarySpecs] = useState(
    formData.secondarySpecializations
  );
  const [localTimeToUpskill, setLocalTimeToUpskill] = useState(
    formData.timeToUpskill
  );
  const [localExpectedSalary, setLocalExpectedSalary] = useState(
    formData.expectedSalary
  );
  const [localSelectedTools, setLocalSelectedTools] = useState(
    formData.selectedTools
  );
  const [localDreamCompany, setLocalDreamCompany] = useState(
    formData.dreamCompany
  );
  const [localDreamRole, setLocalDreamRole] = useState(formData.dreamRole);
  const [selectedCompanyData, setSelectedCompanyData] = useState<{
    name: string;
    logo_url?: string;
  } | null>(null);

  // Check onboarding status
  const { data: onboardingStatus, isLoading: isCheckingStatus } = useQuery({
    ...checkOnboardingStatusQuery(session?.user?.login || ""),
    enabled: !!session?.user?.login,
  });

  const mutation = useMutation({
    ...onboardUserMutation,
    onSuccess: () => {
      updateFormData({
        primarySpecialization: localPrimarySpec,
        secondarySpecializations: localSecondarySpecs,
        timeToUpskill: localTimeToUpskill,
        expectedSalary: localExpectedSalary,
        selectedTools: localSelectedTools,
        dreamCompany: localDreamCompany,
        dreamRole: localDreamRole,
      });
      onMarkComplete("career");
      // Navigate to completion page after successful submission
      if (onStepClick) {
        onStepClick(8);
      }
    },
  });

  const handleSave = () => {
    const githubUsername = session?.user?.login;

    if (!githubUsername) {
      console.error("GitHub username not found in session");
      return;
    }

    if (!formData.linkedinHandle || !formData.leetcodeHandle) {
      console.error("LinkedIn or LeetCode username not found");
      return;
    }

    mutation.mutate({
      first_name: session?.user?.name?.split(" ")[0] || session?.user?.name,
      middle_name: session?.user?.name?.split(" ")[1] || undefined,
      last_name: session?.user?.name?.split(" ")[2] || undefined,
      github_user_name: githubUsername,
      linkedin_user_name: formData.linkedinHandle,
      leetcode_user_name: formData.leetcodeHandle,
      primary_specialization: localPrimarySpec as Domain,
      secondary_specializations: localSecondarySpecs as Domain[],
      expected_salary_bucket: localExpectedSalary as any,
      time_left: localTimeToUpskill,
      primary_email: session?.user?.email || "",
      tools_to_learn: localSelectedTools as Tools[],
      dream_company: localDreamCompany,
      dream_company_logo: selectedCompanyData?.logo_url || "",
      dream_position: localDreamRole,
      rank: Rank.UNRANKED,
      streak: 0,
    });
  };

  const handlePrimarySpecChange = (spec: string) => {
    setLocalPrimarySpec(spec);
    setLocalSecondarySpecs((prev) => prev.filter((s) => s !== spec));
  };

  const handleSecondarySpecChange = (spec: string) => {
    if (localSecondarySpecs.includes(spec)) {
      setLocalSecondarySpecs((prev) => prev.filter((s) => s !== spec));
    } else if (localSecondarySpecs.length < 3) {
      setLocalSecondarySpecs((prev) => [...prev, spec]);
    }
  };

  return (
    <div className="space-y-6 h-[600px] overflow-y-auto">
      <StepIndicator
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={onStepClick}
      />

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
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Career Planning
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Let's plan your career path and set your goals
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
        {/* Specializations */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Career Specializations
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Choose your primary specialization and 3 secondary areas of interest
          </p>

          {/* Selection Status */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Selection Progress
              </span>
              <span className="text-xs text-muted-foreground">
                {localPrimarySpec ? "1" : "0"}/1 Primary •{" "}
                {localSecondarySpecs.length}/3 Secondary
              </span>
            </div>
            <div className="flex gap-2">
              <div
                className={`flex-1 h-2 rounded-full ${
                  localPrimarySpec ? "bg-primary" : "bg-white/20"
                }`}
              ></div>
              <div
                className={`flex-1 h-2 rounded-full ${
                  localSecondarySpecs.length >= 1 ? "bg-primary" : "bg-white/20"
                }`}
              ></div>
              <div
                className={`flex-1 h-2 rounded-full ${
                  localSecondarySpecs.length >= 2 ? "bg-primary" : "bg-white/20"
                }`}
              ></div>
              <div
                className={`flex-1 h-2 rounded-full ${
                  localSecondarySpecs.length >= 3 ? "bg-primary" : "bg-white/20"
                }`}
              ></div>
            </div>
          </div>

          {/* Career Paths Grid - Grouped by Factions */}
          <div className="space-y-6">
            {Object.entries(
              Object.entries(CAREER_PATHS).reduce(
                (acc, [key, path]) => {
                  const faction = path.faction || "Other";
                  if (!acc[faction]) acc[faction] = [];
                  acc[faction].push([key, path]);
                  return acc;
                },
                {} as Record<
                  string,
                  Array<[string, typeof CAREER_PATHS[keyof typeof CAREER_PATHS]]>
                >
              )
            ).map(([faction, paths]) => {
              const factionGradient = paths[0][1].gradient;

              return (
                <div key={faction} className="space-y-3">
                  {/* Faction Header */}
                  <div
                    className={`flex items-center gap-2 pb-2 border-b border-white/20`}
                  >
                    <div
                      className={`w-1 h-6 rounded-full bg-gradient-to-b ${factionGradient}`}
                    ></div>
                    <h4 className="text-base font-semibold text-foreground">
                      {faction}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      ({paths.length} paths)
                    </span>
                  </div>

                  {/* Faction Paths Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {paths.map(([key, path]) => {
                      const isPrimary = localPrimarySpec === key;
                      const isSecondary = localSecondarySpecs.includes(key);
                      const isDisabled =
                        !isPrimary &&
                        !isSecondary &&
                        localSecondarySpecs.length >= 3 &&
                        localPrimarySpec !== "";

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
                              handlePrimarySpecChange(key);
                            } else if (isPrimary) {
                              setLocalPrimarySpec("");
                            } else if (isSecondary) {
                              handleSecondarySpecChange(key);
                            } else {
                              if (localSecondarySpecs.length < 3) {
                                handleSecondarySpecChange(key);
                              }
                            }
                          }}
                        >
                          <div className="text-center">
                            <div
                              className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center p-2 shadow-lg`}
                            >
                              <img
                                src={`/${path.icon}`}
                                alt={path.label}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    const span = document.createElement("span");
                                    span.className =
                                      "text-white text-xs font-bold";
                                    span.textContent = path.shortLabel;
                                    parent.appendChild(span);
                                  }
                                }}
                              />
                            </div>
                            <h4 className="text-xs font-medium text-foreground mb-1">
                              {path.label}
                            </h4>

                            {/* Selection Indicators */}
                            {(isPrimary || isSecondary) && (
                              <div className="flex justify-center">
                                {isPrimary && (
                                  <Badge
                                    variant="default"
                                    className="text-xs bg-primary px-2 py-0.5"
                                  >
                                    Primary
                                  </Badge>
                                )}
                                {isSecondary && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5"
                                  >
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
                <h4 className="text-sm font-medium text-blue-600 mb-1">
                  Step 1: Choose Primary Specialization
                </h4>
                <p className="text-xs text-blue-500/80">
                  {!localPrimarySpec
                    ? "Click on any career path to set it as your primary specialization"
                    : `${CAREER_PATHS[localPrimarySpec as keyof typeof CAREER_PATHS]?.label} is your primary specialization`}
                </p>
              </div>
            </div>

            {localPrimarySpec && (
              <div className="flex items-start gap-3 mt-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-1">
                    Step 2: Choose 3 Secondary Specializations
                  </h4>
                  <p className="text-xs text-green-500/80">
                    {localSecondarySpecs.length === 0
                      ? "Now select 3 additional areas of interest from the remaining options"
                      : `Selected ${localSecondarySpecs.length}/3 secondary specializations`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Time to Upskill and Expected Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Time to Upskill
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              How much time do you have until you start applying?
            </p>
            <Select
              value={
                localTimeToUpskill > 0
                  ? localTimeToUpskill.toString()
                  : ""
              }
              onValueChange={(value) =>
                setLocalTimeToUpskill(parseInt(value))
              }
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
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Expected Salary
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              What's your target salary range?
            </p>
            <Select
              value={localExpectedSalary}
              onValueChange={setLocalExpectedSalary}
            >
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
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Dream Company
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Which company would you love to work for?
            </p>
            <CompanyAutoComplete
              value={localDreamCompany}
              onChange={(company) => {
                setLocalDreamCompany(company.name);
                setSelectedCompanyData(company);
              }}
              selectedCompany={selectedCompanyData}
            />

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
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Dream Role
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              What's your ideal job title or position?
            </p>
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
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Tools & Technologies
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the tools you'd like to upskill in (choose as many as you
            want)
          </p>

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

        {/* Error Alert */}
        {mutation.isError && (
          <div className="max-w-2xl mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : "An error occurred. Please try again"}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Save Button */}
        <div className="text-center">
          <Button
            onClick={handleSave}
            disabled={
              !(
                localPrimarySpec !== "" &&
                localSecondarySpecs.length === 3 &&
                localTimeToUpskill > 0 &&
                localTimeToUpskill <= 120 &&
                localExpectedSalary !== "" &&
                localSelectedTools.length > 0 &&
                localDreamCompany !== "" &&
                localDreamRole !== ""
              ) || mutation.isPending
            }
            className="px-8 py-3"
            size="lg"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Save Career Plan"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

