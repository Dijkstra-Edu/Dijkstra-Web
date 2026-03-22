"use client"

import { Github, CheckCircle, Code, ExternalLink, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OnboardingGuideShell } from "@/components/onboarding/onboarding-guide-shell"
import { githubOnboardingInformation } from "@/data/onboarding-information"

function GitHubExtendedGuide({ returnStep }: { returnStep: string }) {
  const continueHref = `/onboarding/?step=${returnStep}`
  return (
    <div className="space-y-8">
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
            It&apos;s where millions of developers store, share, and collaborate on code projects.
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
              <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
                {item.step}
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    Tip
                  </Badge>
                  <span className="text-xs text-gray-500">{item.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Key GitHub Features to Know</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Repositories</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Repositories (or &quot;repos&quot;) are where your project files are stored. Each project gets its own
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

      <Card className="bg-linear-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Ready to Continue?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Once you&apos;ve created your GitHub account, you&apos;re ready to move on to the next step in your setup
            journey!
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button className="flex-1 min-w-[140px]" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Go to GitHub
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

export default function GitHubHelpPage() {
  return (
    <OnboardingGuideShell
      backgroundTitle="GitHub Setup Guide"
      steps={githubOnboardingInformation}
      defaultReturnStep="1"
      imagePlaceholderSlug="GitHub"
      extendedGuide={({ returnStep }) => <GitHubExtendedGuide returnStep={returnStep} />}
    />
  )
}
