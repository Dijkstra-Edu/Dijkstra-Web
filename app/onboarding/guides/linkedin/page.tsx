"use client"

import { ExternalLink, Linkedin, Users, Briefcase, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OnboardingGuideShell } from "@/components/onboarding/onboarding-guide-shell"
import { linkedinOnboardingInformation } from "@/data/onboarding-information"

function LinkedInExtendedGuide({ returnStep }: { returnStep: string }) {
  const continueHref = `/onboarding/?step=${returnStep}`
  return (
    <div className="space-y-8">
      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Linkedin className="w-6 h-6" />
            What is LinkedIn?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            LinkedIn is the world&apos;s largest professional networking platform with over 900 million users worldwide.
            It&apos;s essential for career development, job searching, and building professional relationships in
            today&apos;s digital economy.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <Users className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Professional Network</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connect with industry professionals</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <Briefcase className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Job Opportunities</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Discover and apply for positions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <Share2 className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Personal Brand</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Showcase your expertise and achievements</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Profile Optimization Guide</CardTitle>
          <CardDescription>Create a compelling professional presence that attracts opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Essential Profile Elements</h3>
            <div className="space-y-3">
              {[
                {
                  element: "Professional Headshot",
                  tip: "Use a high-quality photo where you're dressed professionally and smiling. Profiles with photos get many more views.",
                  importance: "Critical",
                },
                {
                  element: "Compelling Headline",
                  tip: "Go beyond just your job title. Include your value proposition and key skills. You have 220 characters to make an impact.",
                  importance: "Critical",
                },
                {
                  element: "Summary Section",
                  tip: "Write in first person, tell your professional story, and include keywords relevant to your industry. Aim for 3-5 paragraphs.",
                  importance: "High",
                },
                {
                  element: "Experience Details",
                  tip: "Use bullet points to highlight achievements with quantifiable results. Focus on impact, not just responsibilities.",
                  importance: "High",
                },
                {
                  element: "Skills & Endorsements",
                  tip: "Add relevant skills and ask colleagues to endorse you. Pin your top 3 skills to showcase your expertise.",
                  importance: "Medium",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.element}</h4>
                      <Badge
                        variant={
                          item.importance === "Critical"
                            ? "destructive"
                            : item.importance === "High"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {item.importance}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>Strategic Networking</CardTitle>
          <CardDescription>Build meaningful professional relationships that advance your career</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connection Strategy</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Who to Connect With</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Current and former colleagues</li>
                  <li>• Classmates and alumni</li>
                  <li>• Industry professionals in your field</li>
                  <li>• People you meet at events or conferences</li>
                  <li>• Thought leaders and influencers</li>
                  <li>• Recruiters in your industry</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Connection Message Tips</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Always personalize your message</li>
                  <li>• Mention how you know them or found them</li>
                  <li>• Keep it brief (under 200 characters)</li>
                  <li>• Be genuine and professional</li>
                  <li>• Suggest mutual benefit when appropriate</li>
                  <li>• Follow up after they accept</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Strategy</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  type: "Industry Insights",
                  description: "Share articles and add your perspective on industry trends",
                  frequency: "2-3 times/week",
                },
                {
                  type: "Personal Achievements",
                  description: "Celebrate milestones, certifications, and project completions",
                  frequency: "1-2 times/week",
                },
                {
                  type: "Educational Content",
                  description: "Share what you're learning or helpful resources you've found",
                  frequency: "1-2 times/week",
                },
              ].map((content, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{content.type}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{content.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {content.frequency}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle>LinkedIn for Job Search</CardTitle>
          <CardDescription>Leverage LinkedIn&apos;s features to find and land your next opportunity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Job Search Features</h4>
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h5 className="font-medium mb-1">Open to Work Badge</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Let recruiters know you&apos;re actively looking (visible only to recruiters)
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h5 className="font-medium mb-1">Job Alerts</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Set up alerts for specific roles, companies, or locations
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h5 className="font-medium mb-1">Easy Apply</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Apply quickly using your LinkedIn profile information
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Application Strategy</h4>
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h5 className="font-medium mb-1">Research Companies</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Follow companies you&apos;re interested in and engage with their content
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h5 className="font-medium mb-1">Connect with Employees</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Reach out to current employees for informational interviews
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <h5 className="font-medium mb-1">Customize Applications</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Tailor your profile and messages for each opportunity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-500" />
            Ready to Build Your Professional Network?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            LinkedIn is a powerful tool for career advancement when used strategically. Focus on building genuine
            relationships, sharing valuable content, and maintaining an active, professional presence.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button className="flex-1 min-w-[140px]" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Create Your Profile
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

export default function LinkedInHelpPage() {
  return (
    <OnboardingGuideShell
      backgroundTitle="LinkedIn Guide"
      steps={linkedinOnboardingInformation}
      defaultReturnStep="6"
      imagePlaceholderSlug="LinkedIn"
      extendedGuide={({ returnStep }) => <LinkedInExtendedGuide returnStep={returnStep} />}
    />
  )
}
