"use client"

import { ExternalLink, MessageCircle, Users, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OnboardingGuideShell } from "@/components/onboarding/onboarding-guide-shell"
import { discordOnboardingInformation } from "@/data/onboarding-information"

function DiscordExtendedGuide({ returnStep }: { returnStep: string }) {
  const continueHref = `/onboarding/?step=${returnStep}`
  return (
    <div className="space-y-8">
      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            What is Discord?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Discord is a communication platform designed for communities. Originally created for gamers, it&apos;s now
            used by study groups, professional teams, and learning communities like ours to chat, share resources, and
            collaborate.
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
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
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
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose a username that represents you professionally
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 mt-0.5">
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
                  Servers are like communities or workspaces. Each server has its own set of channels, members, and rules.
                  You can join multiple servers for different interests or communities.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Badge variant="secondary">Channels</Badge>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Channels are rooms within servers. Text channels (marked with #) are for written messages; voice
                  channels are for voice conversations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                description: "Treat everyone with kindness and respect. We&apos;re all here to learn and grow together.",
                category: "Community",
              },
              {
                title: "Search Before Asking",
                description: "Use Discord&apos;s search to see if your question was answered recently.",
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
                description: "Help others by sharing useful links, tutorials, and resources you&apos;ve found helpful.",
                category: "Community",
              },
              {
                title: "Voice Channel Etiquette",
                description:
                  "Mute yourself when not speaking, use push-to-talk in noisy environments, and watch background noise.",
                category: "Voice Chat",
              },
            ].map((tip, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{tip.title}</h4>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {tip.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Useful Discord Features</CardTitle>
          <CardDescription>Make the most of your Discord experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <h4 className="font-medium mb-2">Mentions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use @username to notify someone, or channel tools for group notifications where allowed.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <h4 className="font-medium mb-2">Code formatting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use fenced code blocks with a language tag for multi-line code.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <h4 className="font-medium mb-2">Screen sharing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Share your screen in voice channels to get help with coding problems.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <h4 className="font-medium mb-2">Reactions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use emoji reactions to respond quickly or show appreciation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-indigo-500" />
            Ready to Join Our Community?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Once you&apos;ve set up Discord and joined our server, you&apos;ll have access to study groups, coding help,
            project collaboration, and a supportive community.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button className="flex-1 min-w-[140px]" asChild>
              <a href="https://discord.gg/Ct82yF3KAU" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Join Our Discord
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

export default function DiscordHelpPage() {
  return (
    <OnboardingGuideShell
      backgroundTitle="Discord Guide"
      steps={discordOnboardingInformation}
      defaultReturnStep="4"
      imagePlaceholderSlug="Discord"
      extendedGuide={({ returnStep }) => <DiscordExtendedGuide returnStep={returnStep} />}
    />
  )
}
