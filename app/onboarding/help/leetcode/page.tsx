"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Trophy, ChevronLeft, ChevronRight, Target, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"
import BackgroundPaths from "@/components/kokonutui/background-paths"

const steps = [
  {
    id: 1,
    title: "Sign up at LeetCode",
    description: "Create your account to start practicing coding problems",
    image: "/images/leetcode-step1.png",
    link: "https://leetcode.com/signup",
    details:
      "Visit leetcode.com/signup and create your account. You can sign up with email or use your Google/GitHub account for convenience. Choose a username you'll be proud to share with potential employers.",
  },
  {
    id: 2,
    title: "Choose your topics of interest",
    description: "Select programming topics that align with your goals",
    image: "/images/leetcode-step2.png",
    details:
      "LeetCode will ask about your programming interests and experience level. Select topics like algorithms, data structures, databases, or specific areas you want to focus on. This helps personalize your problem recommendations.",
  },
  {
    id: 3,
    title: "Attempt your first problem",
    description: "Start with an easy problem to get familiar with the platform",
    image: "/images/leetcode-step3.png",
    details:
      "Navigate to the Problems section and filter by 'Easy' difficulty. Pick a simple problem like 'Two Sum' or 'Valid Parentheses'. Read the problem carefully, understand the examples, and try to solve it step by step.",
  },
  {
    id: 4,
    title: "View the solutions tab",
    description: "Learn from community solutions and editorial explanations",
    image: "/images/leetcode-step4.png",
    details:
      "After attempting a problem, check the Solutions tab to see different approaches. The Editorial provides official explanations, while Discuss shows community solutions. Compare your approach with others to learn new techniques.",
  },
  {
    id: 5,
    title: "Track your progress using the streak counter",
    description: "Build consistency with daily practice tracking",
    image: "/images/leetcode-step5.png",
    details:
      "LeetCode tracks your daily practice streak. Aim to solve at least one problem daily to maintain your streak. You can view your progress statistics, success rate, and areas for improvement in your profile dashboard.",
  },
]

export default function LeetCodeHelpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Get the step parameter from URL to know which onboarding step to return to
  const returnStep = searchParams.get("step") || "5"

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
    <BackgroundPaths title="LeetCode Guide" showButton={false}>
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
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">LeetCode Setup Progress</h2>
              <p className="text-muted-foreground">Start your coding interview preparation</p>
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
                    e.currentTarget.src = `/placeholder.svg?height=300&width=600&text=LeetCode+Step+${currentStepData.id}+Screenshot`
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
            <h3 className="text-xl font-bold text-foreground mb-2">🎉 Ready to Code!</h3>
            <p className="text-muted-foreground mb-4">
              You're all set up on LeetCode! Start practicing regularly to improve your problem-solving skills and
              prepare for technical interviews.
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
          {/* What is LeetCode */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Trophy className="w-6 h-6" />
                What is LeetCode?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                LeetCode is the world's leading platform for coding interview preparation. It offers thousands of
                programming problems used by top tech companies like Google, Amazon, Facebook, and Microsoft in their
                hiring processes.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <Target className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Interview Prep</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Practice problems from real interviews</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Learn Algorithms</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Master data structures and algorithms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Track Progress</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your improvement over time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problem Categories */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Problem Categories & Difficulty Levels</CardTitle>
              <CardDescription>Understanding LeetCode's problem organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Difficulty Levels</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-500">Easy</Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-300">~30% of problems</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Basic algorithms, simple data structures. Great for beginners and building confidence.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-yellow-500">Medium</Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-300">~50% of problems</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      More complex logic, multiple approaches. Most common in technical interviews.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500">Hard</Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-300">~20% of problems</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Advanced algorithms, optimization required. For senior positions and competitive programming.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Topics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { topic: "Arrays & Strings", count: "300+ problems", description: "Fundamental data manipulation" },
                    { topic: "Linked Lists", count: "50+ problems", description: "Pointer manipulation and traversal" },
                    {
                      topic: "Trees & Graphs",
                      count: "200+ problems",
                      description: "Hierarchical and network structures",
                    },
                    {
                      topic: "Dynamic Programming",
                      count: "150+ problems",
                      description: "Optimization and memoization",
                    },
                    { topic: "Binary Search", count: "80+ problems", description: "Efficient searching algorithms" },
                    {
                      topic: "Two Pointers",
                      count: "100+ problems",
                      description: "Array and string manipulation techniques",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{item.topic}</h4>
                        <Badge variant="outline" className="text-xs">
                          {item.count}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Strategy */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>Effective Study Strategy</CardTitle>
              <CardDescription>How to make the most of your LeetCode practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Beginner's Roadmap</h3>
                <div className="space-y-3">
                  {[
                    { week: "Week 1-2", focus: "Arrays & Strings", goal: "Solve 2-3 easy problems daily" },
                    { week: "Week 3-4", focus: "Linked Lists & Stacks", goal: "Mix of easy and medium problems" },
                    { week: "Week 5-6", focus: "Trees & Recursion", goal: "Focus on understanding patterns" },
                    { week: "Week 7-8", focus: "Dynamic Programming", goal: "Start with classic problems" },
                    { week: "Week 9+", focus: "Mixed Practice", goal: "Simulate interview conditions" },
                  ].map((phase, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{phase.week}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {phase.focus}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{phase.goal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Problem-Solving Approach</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">1. Understand the Problem</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Read carefully, identify inputs/outputs, work through examples manually
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">2. Plan Your Approach</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Think of brute force first, then optimize. Consider time/space complexity
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">3. Code & Test</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Write clean code, test with examples, handle edge cases
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">4. Review & Learn</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Study other solutions, understand different approaches, note patterns
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
                <Trophy className="w-5 h-5 text-yellow-500" />
                Ready to Start Your Journey?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                LeetCode is a marathon, not a sprint. Consistency is key - aim to solve at least one problem daily.
                Focus on understanding patterns rather than memorizing solutions, and don't get discouraged by difficult
                problems!
              </p>
              <div className="flex gap-4">
                <Button className="flex-1" asChild>
                  <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Start Practicing
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
