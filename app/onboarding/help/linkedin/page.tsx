"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Linkedin, ChevronLeft, ChevronRight, Users, Briefcase, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"
import BackgroundPaths from "@/components/kokonutui/background-paths"

const steps = [
  {
    id: 1,
    title: "Sign up at LinkedIn",
    description: "Create your professional networking profile",
    image: "/images/linkedin-step1.png",
    link: "https://linkedin.com",
    details:
      "Visit linkedin.com and create your account using your professional email address. LinkedIn is the world's largest professional network, essential for career development and networking.",
  },
  {
    id: 2,
    title: "Add a profile picture and summary",
    description: "Create a strong first impression with professional visuals and compelling text",
    image: "/images/linkedin-step2.png",
    details:
      "Upload a professional headshot and write a compelling summary that tells your professional story. Your summary should highlight your skills, experience, and career goals in a conversational tone.",
  },
  {
    id: 3,
    title: "Add your education and experience",
    description: "Build credibility with detailed work history and educational background",
    image: "/images/linkedin-step3.png",
    details:
      "Add your current and past work experiences with detailed descriptions of your accomplishments. Include your education, certifications, and any relevant coursework that showcases your qualifications.",
  },
  {
    id: 4,
    title: "Make 10 meaningful connections daily",
    description: "Build your network strategically with relevant professionals",
    image: "/images/linkedin-step4.png",
    details:
      "Connect with classmates, colleagues, industry professionals, and people you meet at events. Always personalize connection requests with a brief message explaining how you know them or why you'd like to connect.",
  },
  {
    id: 5,
    title: "Follow people in your field",
    description: "Stay updated with industry trends and thought leaders",
    image: "/images/linkedin-step5.png",
    details:
      "Follow industry leaders, companies you're interested in, and influencers in your field. This helps you stay informed about trends, job opportunities, and valuable insights in your industry.",
  },
  {
    id: 6,
    title: "Share your GitHub or LeetCode profile as a post",
    description: "Showcase your technical skills and projects to your network",
    image: "/images/linkedin-step6.png",
    details:
      "Create a post sharing your GitHub profile or LeetCode achievements. Explain what projects you're working on or problems you've solved. This demonstrates your technical skills to potential employers and connections.",
  },
]

export default function LinkedInHelpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Get the step parameter from URL to know which onboarding step to return to
  const returnStep = searchParams.get("step") || "6"

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
    <BackgroundPaths title="LinkedIn Guide" showButton={false}>
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">LinkedIn Setup Progress</h2>
              <p className="text-muted-foreground">Build your professional network</p>
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
                    e.currentTarget.src = `/placeholder.svg?height=300&width=600&text=LinkedIn+Step+${currentStepData.id}+Screenshot`
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
            <h3 className="text-xl font-bold text-foreground mb-2">🎉 Professional Profile Complete!</h3>
            <p className="text-muted-foreground mb-4">
              Your LinkedIn profile is now optimized! Continue networking and sharing your achievements to build your
              professional presence.
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
          {/* What is LinkedIn */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Linkedin className="w-6 h-6" />
                What is LinkedIn?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                LinkedIn is the world's largest professional networking platform with over 900 million users worldwide.
                It's essential for career development, job searching, and building professional relationships in today's
                digital economy.
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

          {/* Profile Optimization */}
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
                      tip: "Use a high-quality photo where you're dressed professionally and smiling. Profiles with photos get 21x more views.",
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
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
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

          {/* Networking Strategy */}
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

          {/* Job Search Tips */}
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle>LinkedIn for Job Search</CardTitle>
              <CardDescription>Leverage LinkedIn's features to find and land your next opportunity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Job Search Features</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                      <h5 className="font-medium mb-1">Open to Work Badge</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Let recruiters know you're actively looking (visible only to recruiters)
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
                        Follow companies you're interested in and engage with their content
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

          {/* Next Steps */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-blue-500" />
                Ready to Build Your Professional Network?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                LinkedIn is a powerful tool for career advancement when used strategically. Focus on building genuine
                relationships, sharing valuable content, and maintaining an active, professional presence. Remember,
                networking is about giving value, not just taking it!
              </p>
              <div className="flex gap-4">
                <Button className="flex-1" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Create Your Profile
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
