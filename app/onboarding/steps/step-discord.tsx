"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { IconBrandDiscord } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import type { StepProps } from "@/types/onboarding";
import type { StepId } from "@/lib/Zustand/onboarding-store";

interface DiscordStepProps extends StepProps {
  currentStep: number;
  completedSteps: StepId[];
  onStepClick?: (step: number) => void;
  onMarkComplete: (stepId: StepId) => void;
}

export function DiscordStep({
  currentStep,
  completedSteps,
  formData,
  updateFormData,
  uiState,
  updateUIState,
  onStepClick,
  onMarkComplete,
}: DiscordStepProps) {
  return (
    <div className="space-y-6 h-[600px]">
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
          className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
        >
          <IconBrandDiscord className="w-8 h-8 text-white" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Join Discord
          </h2>
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
                  variant={formData.discordJoined === true ? "default" : "outline"}
                  onClick={() => {
                    updateFormData({ discordJoined: true });
                    onMarkComplete("discord");
                  }}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  Yes
                </Button>
                <Button
                  variant={
                    formData.discordJoined === false ? "default" : "outline"
                  }
                  onClick={() => updateFormData({ discordJoined: false })}
                  className="flex-1 bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9"
                >
                  No
                </Button>
              </div>
            </div>

            {formData.discordJoined === false && (
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
                  open={uiState.expandedSections.discordHelp}
                  onOpenChange={() =>
                    updateUIState({
                      expandedSections: {
                        ...uiState.expandedSections,
                        discordHelp:
                          !uiState.expandedSections.discordHelp,
                      },
                    })
                  }
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-0 text-sm"
                    >
                      {uiState.expandedSections.discordHelp ? (
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
}

