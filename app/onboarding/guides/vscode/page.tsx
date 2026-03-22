"use client"

import { Code, CheckCircle, ExternalLink, Download, Palette, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OnboardingGuideShell } from "@/components/onboarding/onboarding-guide-shell"
import { vscodeOnboardingInformation } from "@/data/onboarding-information"

function VSCodeExtendedGuide({ returnStep }: { returnStep: string }) {
  const continueHref = `/onboarding/?step=${returnStep}`
  return (
    <div className="space-y-8">
      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Code className="w-6 h-6" />
            What is Visual Studio Code?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Visual Studio Code (VS Code) is a free, powerful code editor developed by Microsoft. It&apos;s lightweight,
            fast, and packed with features that make coding more enjoyable and productive.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <Download className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Free & Open Source</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completely free to use</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <Palette className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Customizable</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Themes and extensions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <Terminal className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Integrated Terminal</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Built-in command line</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Installing VS Code</CardTitle>
          <CardDescription>Download and install VS Code for your operating system</CardDescription>
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
                  Download VS Code from{" "}
                  <a
                    href="https://code.visualstudio.com"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    code.visualstudio.com
                  </a>
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-gray-600 dark:text-gray-300">Run the installer (.exe file)</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Check &quot;Add to PATH&quot; during installation (recommended)
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
                  Download VS Code from{" "}
                  <a
                    href="https://code.visualstudio.com"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    code.visualstudio.com
                  </a>
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-gray-600 dark:text-gray-300">Open the downloaded .zip file</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag Visual Studio Code to your Applications folder
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
                  Download the .deb (Ubuntu/Debian) or .rpm (CentOS/RHEL) package
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Install using your package manager or download the snap package
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Alternative:{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    sudo snap install --classic code
                  </code>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Essential Extensions</CardTitle>
          <CardDescription>Must-have extensions to supercharge your development workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Python",
                description: "Official Python extension with IntelliSense, linting, and debugging",
                category: "Language Support",
              },
              {
                name: "Prettier",
                description: "Code formatter that keeps your code clean and consistent",
                category: "Formatting",
              },
              {
                name: "GitLens",
                description: "Enhance Git capabilities with blame annotations and history",
                category: "Version Control",
              },
              {
                name: "Live Server",
                description: "Launch a local development server with live reload for web projects",
                category: "Web Development",
              },
              {
                name: "Bracket Pair Colorizer",
                description: "Color matching brackets to make code more readable",
                category: "Productivity",
              },
              {
                name: "Material Theme",
                description: "Beautiful theme to make your editor look great",
                category: "Themes",
              },
            ].map((extension, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">{extension.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {extension.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{extension.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>How to install:</strong> Open VS Code, click Extensions (Ctrl+Shift+X), search for the extension
              name, then Install.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Basic Configuration</CardTitle>
          <CardDescription>Customize VS Code for a better development experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Auto Save</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                File → Preferences → Settings → search &quot;auto save&quot; → set to &quot;afterDelay&quot;
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Font Size</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Press Ctrl+, → search &quot;font size&quot; → adjust (often 14–16)
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Theme</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Press Ctrl+K, Ctrl+T → pick a theme (Dark+ is the default)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Command Line Integration</CardTitle>
          <CardDescription>Open VS Code from terminal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">Useful shortcuts and commands:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <code className="text-sm font-mono">code .</code>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Open current directory in VS Code</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <code className="text-sm font-mono">code filename.py</code>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Open a specific file</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <code className="text-sm font-mono">{"Ctrl+`"}</code>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Toggle integrated terminal</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <code className="text-sm font-mono">Ctrl+Shift+P</code>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Command palette</p>
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
            Once you&apos;ve installed VS Code and added a few extensions, you&apos;re ready to join our Discord
            community.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button className="flex-1 min-w-[140px]" asChild>
              <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Download VS Code
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

export default function VSCodeHelpPage() {
  return (
    <OnboardingGuideShell
      backgroundTitle="VS Code Guide"
      steps={vscodeOnboardingInformation}
      defaultReturnStep="3"
      imagePlaceholderSlug="VS Code"
      extendedGuide={({ returnStep }) => <VSCodeExtendedGuide returnStep={returnStep} />}
    />
  )
}
