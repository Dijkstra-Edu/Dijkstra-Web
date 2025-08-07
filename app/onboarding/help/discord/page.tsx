"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, MessageCircle, ChevronLeft, ChevronRight, Users, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"
import BackgroundPaths from "@/components/kokonutui/background-paths"

const steps = [
  {
    id: 1,
    title: "Create a Discord account",
    description: "Sign up for Discord to join our community",
    image: "/images/discord-step1.png",
    link: "https://discord.com/register",
    details:
      "Visit discord.com/register and create your account using an email address and password. Choose a username that represents you well in our community.",
  },
  {
    id: 2,
    title: "What is a server and what are channels",
    description: "Understand Discord's basic structure",
    image: "/images/discord-step2.png",
    details:
      "Servers are communities where people gather around topics. Channels are like rooms within servers for specific conversations. Text channels are for messaging, voice channels are for talking.",
  },
  {
    id: 3,
    title: "How to join our Discord server",
    description: "Use our invite link to join the Dijkstra community",
    image: "/images/discord-step3.png",
    link: "https://discord.gg/dijkstra",
    details:
      "Click our invite link to join the Dijkstra Discord server. You'll automatically be added to our community where you can ask questions, share projects, and connect with other learners.",
  },
  {
    id: 4,
    title: "Understanding voice channels and muting",
    description: "Learn about voice features and audio controls",
    image: "/images/discord-step4.png",
    details:
      "Voice channels allow real-time conversations. You can mute/unmute yourself and control your audio settings. Use voice channels for study sessions, code reviews, and group discussions.",
  },
  {
    id: 5,
    title: "Set your nickname and profile picture",
    description: "Personalize your presence in the server",
    image: "/images/discord-step5.png",
    details:
      "Right-click on your name in the member list to set a server nickname. Upload a profile picture in User Settings to help others recognize you in conversations.",
  },
]

export default function DiscordHelpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Get the step parameter from URL to know which onboarding step to return to
  const returnStep = searchParams.get("step") || "4"

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

  const handleBackToOnboarding = () => {
    // Navigate back to the main onboarding page with the specific step
    router.push(`/?step=${returnStep}`)
  }

  const handleContinueOnboarding = () => {
    // Navigate back to the main onboarding page with the specific step
    router.push(`/?step=${returnStep}`)
  }

  const progress = (completedSteps.length / steps.length) * 100
  const currentStepData = steps[currentStep]

  return (
    <BackgroundPaths title="Discord Guide" showButton={false}>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToOnboarding}
            className="flex items-center gap-2 text-foreground hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Onboarding
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
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Discord Setup Progress</h2>
              <p className="text-muted-foreground">Join our community and connect</p>
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
                    e.currentTarget.src = `/placeholder.svg?height=300&width=600&text=Discord+Step+${currentStepData.id}+Screenshot`
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
            <h3 className="text-xl font-bold text-foreground mb-2">🎉 Welcome to the Community!</h3>
            <p className="text-muted-foreground mb-4">
              You're now part of the Dijkstra Discord community! Connect with other learners and get support on your
              coding journey.
            </p>
            <Button
              onClick={handleContinueOnboarding}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Continue Onboarding
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
          {/* What is Discord */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                What is Discord?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Discord is a communication platform designed for communities. Originally created for gamers, it's now
                used by study groups, professional teams, and learning communities like ours to chat, share resources,
                and collaborate.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-indigo-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Text Channels</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Organized chat rooms for different topics
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <Volume2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Voice Channels</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Real-time voice conversations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <Users className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Community</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Connect with like-minded learners</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Getting Started with Discord</CardTitle>
              <CardDescription>Everything you need to know to join and participate in our community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Setup</h3>
                <div className="space-y-3 pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Visit{" "}
                      <a
                        href="https://discord.com"
                        className="text-indigo-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        discord.com
                      </a>{" "}
                      and create your account
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Choose a username that represents you professionally
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Verify your email address to unlock all features</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Understanding Discord Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Badge variant="secondary">Servers</Badge>
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Servers are like communities or workspaces. Each server has its own set of channels, members, and
                      rules. You can join multiple servers for different interests or communities.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Badge variant="secondary">Channels</Badge>
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Channels are rooms within servers. Text channels (marked with #) are for written messages, while
                      voice channels (marked with 🔊) are for voice conversations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Discord Etiquette & Best Practices</CardTitle>
              <CardDescription>How to be a great community member</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Use Appropriate Channels",
                    description:
                      "Post in the right channel for your topic. Read channel descriptions to understand their purpose.",
                    category: "Organization",
                  },
                  {
                    title: "Be Respectful",
                    description: "Treat everyone with kindness and respect. We're all here to learn and grow together.",
                    category: "Community",
                  },
                  {
                    title: "Search Before Asking",
                    description: "Use Discord's search function to see if your question has been answered recently.",
                    category: "Efficiency",
                  },
                  {
                    title: "Use Thread Replies",
                    description:
                      "For detailed discussions, use thread replies to keep channels organized and easy to follow.",
                    category: "Organization",
                  },
                  {
                    title: "Share Resources",
                    description: "Help others by sharing useful links, tutorials, and resources you've found helpful.",
                    category: "Community",
                  },
                  {
                    title: "Voice Channel Etiquette",
                    description:
                      "Mute yourself when not speaking, use push-to-talk in noisy environments, and be mindful of background noise.",
                    category: "Voice Chat",
                  },
                ].map((tip, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">{tip.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Useful Features */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Useful Discord Features</CardTitle>
              <CardDescription>Make the most of your Discord experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h4 className="font-medium mb-2">@mentions</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use @username to notify someone directly, or @here/@everyone for group notifications
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h4 className="font-medium mb-2">Code Formatting</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use `backticks` for inline code or ```language for code blocks
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h4 className="font-medium mb-2">Screen Sharing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Share your screen in voice channels to get help with coding problems
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h4 className="font-medium mb-2">Reactions</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use emoji reactions to quickly respond or show appreciation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-500" />
                Ready to Join Our Community?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Once you've set up Discord and joined our server, you'll have access to study groups, coding help,
                project collaboration, and a supportive community of learners just like you!
              </p>
              <div className="flex gap-4">
                <Button className="flex-1" asChild>
                  <a href="https://discord.gg/dijkstra" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Join Our Discord
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
