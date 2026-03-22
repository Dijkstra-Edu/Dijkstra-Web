"use client"

import {
  GitBranch,
  CheckCircle,
  ExternalLink,
  Terminal,
  Download,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OnboardingGuideShell } from "@/components/onboarding/onboarding-guide-shell"
import { gitOnboardingInformation } from "@/data/onboarding-information"

function GitExtendedGuide({ returnStep }: { returnStep: string }) {
  const continueHref = `/onboarding/?step=${returnStep}`
  return (
    <div className="space-y-8">
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

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Installing Git</CardTitle>
          <CardDescription>Choose your operating system and follow the installation steps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Badge variant="secondary">Windows</Badge>
            </h3>
            <div className="space-y-3 pl-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
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
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-gray-600 dark:text-gray-300">Run the installer and follow the setup wizard</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Accept the default settings (recommended for beginners)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Badge variant="secondary">macOS</Badge>
            </h3>
            <div className="space-y-3 pl-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Open Terminal and type:{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">git --version</code>
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  If Git isn&apos;t installed, you&apos;ll be prompted to install Xcode Command Line Tools
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Badge variant="secondary">Linux</Badge>
            </h3>
            <div className="space-y-3 pl-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Ubuntu/Debian:{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">sudo apt install git</code>
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  CentOS/RHEL:{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">sudo yum install git</code>
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
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
              <code className="text-sm">git config --global user.name &quot;Your Name&quot;</code>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Set your email:</p>
              <code className="text-sm">git config --global user.email &quot;your.email@example.com&quot;</code>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Tip:</strong> Use the same email address you used for your GitHub account
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Essential Git Commands</CardTitle>
          <CardDescription>Basic commands you&apos;ll use every day</CardDescription>
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
                <code className="text-sm font-mono">git commit -m &quot;message&quot;</code>
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

      <Card className="bg-linear-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Ready to Continue?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Once you&apos;ve installed and configured Git, you&apos;re ready to move on to setting up VS Code!
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button className="flex-1 min-w-[140px]" asChild>
              <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Download Git
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

export default function GitHelpPage() {
  return (
    <OnboardingGuideShell
      backgroundTitle="Git Setup Guide"
      steps={gitOnboardingInformation}
      defaultReturnStep="2"
      imagePlaceholderSlug="Git"
      extendedGuide={({ returnStep }) => <GitExtendedGuide returnStep={returnStep} />}
    />
  )
}
