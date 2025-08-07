"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import {
  Github,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Users,
  Code,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import BackgroundPaths from "@/components/kokonutui/background-paths"

const steps = [
  {
    id: 1,
    title: "Sign up for GitHub",
    description: "Create your free GitHub account",
    image: "/images/github-step1.png",
    link: "https://github.com/signup",
    details:
      "Visit github.com/signup and create your account using your email address. Choose a professional username that you'll be comfortable sharing with employers and collaborators.",
  },
  {
    id: 2,
    title: "Verify your email address",
    description: "Complete the email verification process",
    image: "/images/github-step2.png",
    details:
      "Check your email inbox for a verification message from GitHub. Click the verification link to activate your account and unlock all GitHub features.",
  },
  {
    id: 3,
    title: "Complete your profile",
    description: "Add a profile picture, bio, and location",
    image: "/images/github-step3.png",
    details:
      "Upload a professional profile picture, write a brief bio describing your interests, and add your location. A complete profile makes a better first impression on potential collaborators.",
  },
  {
    id: 4,
    title: "Create your first repository",
    description: "Set up your first project repository",
    image: "/images/github-step4.png",
    details:
      "Click the 'New' button to create your first repository. Choose a descriptive name, add a README file, and select a license. This will be your first project on GitHub!",
  },
  {
    id: 5,
    title: "Explore GitHub features",
    description: "Discover issues, pull requests, and collaboration tools",
    image: "/images/github-step5.png",
    details:
      "Familiarize yourself with GitHub's key features: Issues for tracking bugs and features, Pull Requests for code collaboration, and Actions for automation. These tools are essential for professional development.",
  },
]

function GitHubHelpContent() {
  const searchParams = useSearchParams()
  const returnStep = searchParams.get("step") || "1"
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps((prev) => [...prev, stepId])
    }
  }

  const progress = (completedSteps.length / steps.length) * 100
  const currentStepData = steps[currentStep]

  return (
    <BackgroundPaths title="GitHub Setup Guide" showButton={false}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-foreground hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
            asChild
          >
            <a href={`/?step=${returnStep}`}>
              <ArrowLeft className="w-4 h-4" />
              Back to Onboarding
            </a>
          </Button>
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">GitHub Setup Progress</h2>
              <p className="text-muted-foreground">Get started with version control and collaboration</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Progress: {completedSteps.length} of {steps.length} steps completed
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        {/* Main Tutorial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      completedSteps.includes(currentStepData.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/20 text-muted-foreground"
                    }`}
                  >
                    {completedSteps.includes(currentStepData.id) ? "✓" : currentStepData.id}
                  </div>
                  <div>
                    <CardTitle className="text-foreground">
                      Step {currentStepData.id} of {steps.length}: {currentStepData.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">{currentStepData.description}</CardDescription>
                  </div>
                </div>
              </div>

              {/* Step Progress Indicator */}
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
              {/* Screenshot Area */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex justify-center">
                <img
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={currentStepData.title}
                  className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-lg border border-white/20"
                  onError={(e) => {
                    e.currentTarget.src = `/placeholder.svg?height=300&width=600&text=GitHub+Step+${currentStepData.id}+Screenshot`
                  }}
                />
              </div>

              {/* Step Details */}
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-lg">{currentStepData.details}</p>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  {currentStepData.link && (
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90" size="lg" asChild>
                      <a href={currentStepData.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Link
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => markStepComplete(currentStepData.id)}
                    disabled={completedSteps.includes(currentStepData.id)}
                    className="bg-white/10 border-white/20 text-foreground hover:bg-white/20"
                  >
                    {completedSteps.includes(currentStepData.id) ? "Completed ✓" : "Mark Complete"}
                  </Button>
                </div>
              </div>
            </CardContent>

            {/* Navigation Footer */}
            <div className="border-t border-white/10 p-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 bg-white/10 border-white/20 text-foreground hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Step
                </Button>

                <div className="text-sm text-muted-foreground">
                  {currentStep + 1} of {steps.length}
                </div>

                <Button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Completion Message */}
        {completedSteps.length === steps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 text-center shadow-2xl"
          >
            <h3 className="text-xl font-bold text-foreground mb-2">🎉 GitHub Account Ready!</h3>
            <p className="text-muted-foreground mb-4">
              You're all set up on GitHub! Start creating repositories, collaborating with others, and building your
              coding portfolio.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href={`/?step=${returnStep}`}>Continue Onboarding</a>
            </Button>
          </motion.div>
        )}

        {/* Comprehensive Guide Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-8"
        >
          {/* What is GitHub */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Github className="w-6 h-6" />
                What is GitHub?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                GitHub is a web platform that hosts Git repositories and provides collaboration tools for developers.
                It's where millions of developers store, share, and collaborate on code projects.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <Code className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Code Storage</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Store and version your code safely</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <Users className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Collaboration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Work with others on projects</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Portfolio</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Showcase your work to employers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step by Step Guide */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Creating Your GitHub Account</CardTitle>
              <CardDescription>Follow these steps to get started with GitHub</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Visit GitHub.com",
                  description: "Go to github.com and click the 'Sign up' button in the top right corner.",
                  tip: "Make sure you have a reliable email address ready",
                },
                {
                  step: 2,
                  title: "Choose Your Username",
                  description:
                    "Pick a professional username that represents you. This will be part of your GitHub profile URL.",
                  tip: "Your username will be visible to employers and collaborators",
                },
                {
                  step: 3,
                  title: "Verify Your Account",
                  description: "Complete the email verification process by clicking the link sent to your email.",
                  tip: "Check your spam folder if you don't see the email",
                },
                {
                  step: 4,
                  title: "Complete Your Profile",
                  description: "Add a profile picture, bio, and location to make your profile more professional.",
                  tip: "A complete profile makes a better first impression",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        💡 Tip
                      </Badge>
                      <span className="text-xs text-gray-500">{item.tip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Important Features */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Key GitHub Features to Know</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Repositories</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Repositories (or "repos") are where your project files are stored. Each project gets its own
                    repository.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Issues</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Issues are used to track bugs, feature requests, and other project-related discussions.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Pull Requests</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Pull requests let you propose changes to a project and collaborate with others on code reviews.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">GitHub Pages</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Host static websites directly from your GitHub repositories for free.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Ready to Continue?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Once you've created your GitHub account, you're ready to move on to the next step in your setup journey!
              </p>
              <div className="flex gap-4">
                <Button className="flex-1" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Go to GitHub
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={`/?step=${returnStep}`}>Continue Onboarding</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </BackgroundPaths>
  )
}

export default function GitHubHelpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHubHelpContent />
    </Suspense>
  )
}
