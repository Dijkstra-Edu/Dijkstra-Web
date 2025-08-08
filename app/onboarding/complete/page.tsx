"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import BackgroundPaths from "@/components/kokonutui/background-paths"

export default function OnboardingComplete() {
  const router = useRouter()

  return (
    <BackgroundPaths title="All Set!" showButton={false}>
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-primary-foreground" />
          </motion.div>

          {/* Title and Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground">Congratulations! 🎉</h2>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              You've successfully completed the onboarding process. You're now ready to start your coding journey with
              Dijkstra!
            </p>
          </motion.div>

          {/* Completion Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 my-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Platforms Setup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Setup Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">✓</div>
              <div className="text-sm text-muted-foreground">Ready to Code</div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
            <div className="grid gap-4 text-left max-w-md mx-auto">
              {[
                "Explore our learning paths and courses",
                "Join study groups and coding challenges",
                "Connect with mentors and peers",
                "Start building your first project",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-sm"
                >
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <div
              className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                        dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="rounded-[1.15rem] px-8 py-3 text-lg font-semibold backdrop-blur-md 
                            bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                            text-black dark:text-white transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                            hover:shadow-md dark:hover:shadow-neutral-800/50"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">Go to Dashboard</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="px-8 py-3 text-lg font-semibold bg-white/10 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/20 rounded-xl"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home Page
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </BackgroundPaths>
  )
}
