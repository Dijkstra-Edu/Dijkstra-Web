"use client"

import { useState, type ReactNode, Suspense } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BackgroundPaths from "@/components/kokonutui/background-paths"

export type OnboardingGuideStep = {
  id: number
  title: string
  description: string
  image?: string
  link?: string
  details: string
}

export type OnboardingGuideShellProps = {
  backgroundTitle: string
  steps: OnboardingGuideStep[]
  defaultReturnStep: string
  imagePlaceholderSlug: string
  extendedGuide: (ctx: { returnStep: string }) => ReactNode
}

function GuideInner({
  backgroundTitle,
  steps,
  defaultReturnStep,
  imagePlaceholderSlug,
  extendedGuide,
}: OnboardingGuideShellProps) {
  const searchParams = useSearchParams()
  const returnStep = searchParams.get("step") || defaultReturnStep
  const [currentStep, setCurrentStep] = useState(0)
  const currentStepData = steps[currentStep]
  const onboardingUrl = `/onboarding/?step=${returnStep}`

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  return (
    <BackgroundPaths title={backgroundTitle} showButton={false}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-foreground hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
            asChild
          >
            <a href={onboardingUrl}>
              <ArrowLeft className="w-4 h-4" />
              Back to Onboarding
            </a>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-white/20 text-foreground">
                  {currentStepData.id}
                </div>
                <div>
                  <CardTitle className="text-foreground">
                    Step {currentStepData.id} of {steps.length}: {currentStepData.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{currentStepData.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded transition-all duration-300 ${
                      index === currentStep ? "bg-primary" : index < currentStep ? "bg-primary/60" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex h-[380px] w-full items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={currentStepData.image || "/placeholder.svg"}
                    alt={currentStepData.title}
                    className="max-h-full max-w-full object-contain rounded-sm shadow-lg border border-white/20"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=300&width=600&text=${encodeURIComponent(
                        `${imagePlaceholderSlug} Step ${currentStepData.id} Screenshot`
                      )}`
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-lg">{currentStepData.details}</p>
                {currentStepData.link && (
                  <div className="flex justify-center">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90" size="lg" asChild>
                      <a href={currentStepData.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Link
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>

            <div className="border-t border-white/10 p-6">
              <div className="flex justify-between items-center gap-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 bg-white/10 border-white/20 text-foreground hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground shrink-0">
                  {currentStep + 1} / {steps.length}
                </div>
                <Button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="space-y-8 pt-2">{extendedGuide({ returnStep })}</div>
      </div>
    </BackgroundPaths>
  )
}

export function OnboardingGuideShell(props: OnboardingGuideShellProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
      <GuideInner {...props} />
    </Suspense>
  )
}
