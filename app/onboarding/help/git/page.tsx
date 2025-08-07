"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import {
  GitBranch,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Terminal,
  Download,
  Settings,
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
    title: "Download and install Git",
    description: "Get Git installed on your operating system",
    image: "/images/git-step1.png",
    link: "https://git-scm.com/downloads",
    details:
      "Visit git-scm.com/downloads and download the appropriate version for your operating system. Follow the installation wizard with default settings for the best experience.",
  },
  {
    id: 2,
    title: "Configure your identity",
    description: "Set up your name and email for commits",
    image: "/images/git-step2.png",
    details:
      "Open your terminal or command prompt and run 'git config --global user.name \"Your Name\"' and 'git config --global user.email \"your.email@example.com\"' to set up your identity.",
  },
  {
    id: 3,
    title: "Learn basic commands",
    description: "Master the essential Git commands",
    image: "/images/git-step3.png",
    details:
      "Familiarize yourself with basic commands like 'git init', 'git add', 'git commit', 'git status', and 'git log'. These are the foundation of version control with Git.",
  },
  {
    id: 4,
    title: "Create your first repository",
    description: "Initialize a new Git repository",
    image: "/images/git-step4.png",
    details:
      "Create a new folder for your project, navigate to it in terminal, and run 'git init' to initialize a new Git repository. This creates a .git folder to track your changes.",
  },
  {
    id: 5,
    title: "Make your first commit",
    description: "Save your first changes to Git history",
    image: "/images/git-step5.png",
    details:
      "Create a file, add it with 'git add filename', and commit it with 'git commit -m \"Initial commit\"'. Congratulations, you've made your first commit!",
  },
]

function GitHelpContent() {
  const searchParams = useSearchParams()
  const returnStep = searchParams.get("step") || "2"
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
    <BackgroundPaths title="Git Setup Guide" showButton={false}>
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
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Git Setup Progress</h2>
              <p className="text-muted-foreground">Master version control fundamentals</p>
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
                    e.currentTarget.src = `/placeholder.svg?height=300&width=600&text=Git+Step+${currentStepData.id}+Screenshot`
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
            <h3 className="text-xl font-bold text-foreground mb-2">🎉 Git Mastery Unlocked!</h3>
            <p className="text-muted-foreground mb-4">
              You've successfully set up Git and learned the basics! You're now ready to track changes and collaborate
              on projects with confidence.
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
          {/* What is Git */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <GitBranch className="w-6 h-6" />
                What is Git?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Git is a distributed version control system that tracks changes in your code over time. It allows you to
                save different versions of your project and collaborate with others.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <Terminal className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Version Control</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Track changes in your code</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <Download className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Backup</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Never lose your work again</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <Settings className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Collaboration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Work with team members</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Guide */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Installing Git</CardTitle>
              <CardDescription>Choose your operating system and follow the installation steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Windows */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Badge variant="secondary">Windows</Badge>
                </h3>
                <div className="space-y-3 pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Download Git from{" "}
                      <a
                        href="https://git-scm.com/download/win"
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        git-scm.com/download/win
                      </a>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Run the installer and follow the setup wizard</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Accept the default settings (recommended for beginners)
                    </p>
                  </div>
                </div>
              </div>

              {/* macOS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Badge variant="secondary">macOS</Badge>
                </h3>
                <div className="space-y-3 pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Open Terminal and type:{" "}
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">git --version</code>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      If Git isn't installed, you'll be prompted to install Xcode Command Line Tools
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Alternatively, download from{" "}
                      <a
                        href="https://git-scm.com/download/mac"
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        git-scm.com/download/mac
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Linux */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Badge variant="secondary">Linux</Badge>
                </h3>
                <div className="space-y-3 pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ubuntu/Debian:{" "}
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">sudo apt install git</code>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      CentOS/RHEL:{" "}
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">sudo yum install git</code>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Arch Linux:{" "}
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">sudo pacman -S git</code>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Initial Configuration */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Initial Configuration</CardTitle>
              <CardDescription>Set up your Git identity for commits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                After installing Git, you need to configure it with your name and email address:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Set your name:</p>
                  <code className="text-sm">git config --global user.name "Your Name"</code>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Set your email:</p>
                  <code className="text-sm">git config --global user.email "your.email@example.com"</code>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 <strong>Tip:</strong> Use the same email address you used for your GitHub account
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Commands */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Essential Git Commands</CardTitle>
              <CardDescription>Basic commands you'll use every day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <code className="text-sm font-mono">git init</code>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Initialize a new Git repository</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <code className="text-sm font-mono">git add .</code>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Stage all changes for commit</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <code className="text-sm font-mono">git commit -m "message"</code>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Commit staged changes</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <code className="text-sm font-mono">git status</code>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Check repository status</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <code className="text-sm font-mono">git push</code>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Upload changes to remote repository</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <code className="text-sm font-mono">git pull</code>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Download changes from remote repository
                    </p>
                  </div>
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
                Once you've installed and configured Git, you're ready to move on to setting up VS Code!
              </p>
              <div className="flex gap-4">
                <Button className="flex-1" asChild>
                  <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Download Git
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

export default function GitHelpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHelpContent />
    </Suspense>
  )
}
