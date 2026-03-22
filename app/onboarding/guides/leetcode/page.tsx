"use client"

import { ExternalLink, Trophy, Target, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OnboardingGuideShell } from "@/components/onboarding/onboarding-guide-shell"
import { leetcodeOnboardingInformation } from "@/data/onboarding-information"

function LeetCodeExtendedGuide({ returnStep }: { returnStep: string }) {
  const continueHref = `/onboarding/?step=${returnStep}`
  return (
    <div className="space-y-8">
      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Trophy className="w-6 h-6" />
            What is LeetCode?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            LeetCode is the world&apos;s leading platform for coding interview preparation. It offers thousands of
            programming problems used by top tech companies like Google, Amazon, Facebook, and Microsoft in their hiring
            processes.
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

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Problem Categories & Difficulty Levels</CardTitle>
          <CardDescription>Understanding LeetCode&apos;s problem organization</CardDescription>
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

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Effective Study Strategy</CardTitle>
          <CardDescription>How to make the most of your LeetCode practice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Beginner&apos;s Roadmap</h3>
            <div className="space-y-3">
              {[
                { week: "Week 1-2", focus: "Arrays & Strings", goal: "Solve 2-3 easy problems daily" },
                { week: "Week 3-4", focus: "Linked Lists & Stacks", goal: "Mix of easy and medium problems" },
                { week: "Week 5-6", focus: "Trees & Recursion", goal: "Focus on understanding patterns" },
                { week: "Week 7-8", focus: "Dynamic Programming", goal: "Start with classic problems" },
                { week: "Week 9+", focus: "Mixed Practice", goal: "Simulate interview conditions" },
              ].map((phase, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
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

      <Card className="bg-linear-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Ready to Start Your Journey?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            LeetCode is a marathon, not a sprint. Consistency is key - aim to solve at least one problem daily. Focus on
            understanding patterns rather than memorizing solutions, and don&apos;t get discouraged by difficult
            problems!
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button className="flex-1 min-w-[140px]" asChild>
              <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Start Practicing
              </a>
            </Button>
            <Button variant="outline" className="flex-1 min-w-[140px] bg-transparent" asChild>
              <a href={continueHref}>Continue Onboarding</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LeetCodeHelpPage() {
  return (
    <OnboardingGuideShell
      backgroundTitle="LeetCode Guide"
      steps={leetcodeOnboardingInformation}
      defaultReturnStep="5"
      imagePlaceholderSlug="LeetCode"
      extendedGuide={({ returnStep }) => <LeetCodeExtendedGuide returnStep={returnStep} />}
    />
  )
}
