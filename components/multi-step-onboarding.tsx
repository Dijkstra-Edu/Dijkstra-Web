"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import BackgroundPaths from "./kokonutui/background-paths"

interface Step {
  id: string
  title: string
  description: string
  image: string
  link?: string
  linkText?: string
  hasInput?: boolean
  inputLabel?: string
  inputPlaceholder?: string
  helpPage?: string
  helpText?: string
}

const steps: Step[] = [
  {
    id: "github",
    title: "Create a GitHub Account",
    description: "Sign up and complete your profile.",
    image: "/images/github.png",
    link: "https://github.com/signup",
    linkText: "Sign up on GitHub",
    helpPage: "/onboarding/help/github",
    helpText: "How to sign up on GitHub",
  },
  {
    id: "git",
    title: "Set Up Git Locally",
    description: "Install Git and configure your identity.",
    image: "/images/git.png",
    link: "https://docs.dijkstra.org.in/git-setup",
    linkText: "View Git Setup Docs",
    helpPage: "/onboarding/help/git",
    helpText: "How to set up Git",
  },
  {
    id: "vscode",
    title: "Install VS Code",
    description: "Get your development environment ready.",
    image: "/images/vscode.png",
    link: "https://code.visualstudio.com/",
    linkText: "Download VS Code",
    helpPage: "/onboarding/help/vscode",
    helpText: "How to install VS Code",
  },
  {
    id: "discord",
    title: "Join Our Discord",
    description: "Connect with peers and mentors.",
    image: "/images/discord.png",
    link: "https://discord.gg/dijkstra",
    linkText: "Join Discord Server",
    helpPage: "/onboarding/help/discord",
    helpText: "How to join Discord",
  },
  {
    id: "leetcode",
    title: "Set Up LeetCode Account",
    description: "Sign up or share your handle.",
    image: "/images/leetcode.png",
    hasInput: true,
    inputLabel: "LeetCode Handle",
    inputPlaceholder: "Enter your LeetCode handle",
    helpPage: "/onboarding/help/leetcode",
    helpText: "How to create a LeetCode account",
  },
  {
    id: "linkedin",
    title: "Create Your LinkedIn Profile",
    description: "Optimize your profile and connect.",
    image: "/images/linkedin.png",
    link: "https://www.linkedin.com",
    linkText: "Open LinkedIn",
    hasInput: true,
    inputLabel: "LinkedIn Handle",
    inputPlaceholder: "Enter your LinkedIn handle",
    helpPage: "/onboarding/help/linkedin",
    helpText: "How to create a LinkedIn profile",
  },
]

export default function MultiStepOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Redirect to completion page
      router.push("/onboarding/complete")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (stepId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [stepId]: value,
    }))
  }

  const handleHelpClick = (helpPage: string) => {
    router.push(helpPage)
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <BackgroundPaths title={currentStepData.title} showButton={false}>
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all backdrop-blur-sm
                    ${
                      index === currentStep
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : index < currentStep
                          ? "bg-primary/60 text-primary-foreground shadow-lg"
                          : "bg-white/20 text-muted-foreground border border-white/30"
                    }
                  `}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-8 h-0.5 mx-2 transition-all backdrop-blur-sm
                      ${index < currentStep ? "bg-primary/60" : "bg-white/30"}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                handleNext()
              } else if (swipe > swipeConfidenceThreshold) {
                handleBack()
              }
            }}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center"
          >
            {/* Step Image */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 150 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/30 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={currentStepData.title}
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.src = `/placeholder.svg?height=80&width=80&text=${currentStepData.id}`
                  }}
                />
              </div>
            </motion.div>

            {/* Step Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">{currentStepData.description}</p>
              </div>

              {/* Input Field */}
              {currentStepData.hasInput && (
                <div className="space-y-3 max-w-sm mx-auto">
                  <Label htmlFor={`input-${currentStepData.id}`} className="text-left block text-foreground">
                    {currentStepData.inputLabel}
                  </Label>
                  <Input
                    id={`input-${currentStepData.id}`}
                    placeholder={currentStepData.inputPlaceholder}
                    value={formData[currentStepData.id] || ""}
                    onChange={(e) => handleInputChange(currentStepData.id, e.target.value)}
                    className="text-center bg-white/10 backdrop-blur-sm border-white/20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                {currentStepData.link && (
                  <div
                    className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                              dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                              overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <Button
                      variant="ghost"
                      className="rounded-[1.15rem] px-8 py-3 text-lg font-semibold backdrop-blur-md 
                                  bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                  text-black dark:text-white transition-all duration-300 
                                  group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                  hover:shadow-md dark:hover:shadow-neutral-800/50"
                      asChild
                    >
                      <a href={currentStepData.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                          {currentStepData.linkText}
                        </span>
                      </a>
                    </Button>
                  </div>
                )}

                {currentStepData.helpPage && (
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => handleHelpClick(currentStepData.helpPage!)}
                      className="text-primary hover:text-primary/80 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
                    >
                      {currentStepData.helpText}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation and Progress */}
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/20 rounded-xl transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep ? "bg-primary w-8" : index < currentStep ? "bg-primary/60" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all duration-200"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </BackgroundPaths>
  )
}
