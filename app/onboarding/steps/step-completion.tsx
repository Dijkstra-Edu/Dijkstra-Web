"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/Zustand/onboarding-store";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function CompletionStep() {
  const router = useRouter();
  const clear = useOnboardingStore((state) => state.clear);
  const [isLoading, setIsLoading] = useState(false);

  const handleClearStorage = () => {
    clear();
    // Also clear old localStorage keys if they exist (for migration)
    localStorage.removeItem("dijkstra-onboarding-state");
    localStorage.removeItem("dijkstra-completed-steps");
  };

  const handleGoToDashboard = () => {
    setIsLoading(true);
    handleClearStorage();
    
    // Force re-authentication with GitHub to refresh JWT with new onboarding status
    // This will trigger the JWT callback which checks onboarding status
    // GitHub will auto-approve if already authorized
    signIn("github", { 
      callbackUrl: "/login?callback=true",
      redirect: true 
    });
  };

  return (
    <div className="flex items-center justify-center h-[600px]">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-semibold text-foreground">Finalizing your account...</p>
          <p className="text-sm text-muted-foreground">Please wait while we verify everything</p>
        </div>
      ) : (
        <div className="text-center space-y-8 max-w-2xl">
        {/* Success Icon */}
        <motion.img
          src="/icon.png"
          alt="Dijkstra GPT logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          className="h-30 w-30 mx-auto"
        />

        {/* Title and Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Congratulations! 🎉
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto px-4">
            You've successfully completed the onboarding process. You're now
            ready to start your coding journey with Dijkstra!
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
            <div className="text-2xl font-bold text-foreground">7</div>
            <div className="text-sm text-muted-foreground">Platforms Setup</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="text-sm text-muted-foreground">Setup Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">✓</div>
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
          <h3 className="text-lg font-semibold text-foreground">
            What's Next?
          </h3>
          <div className="grid gap-3 text-left max-w-md mx-auto">
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
                className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
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
          <Button
            onClick={handleGoToDashboard}
            disabled={isLoading}
            className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Let's Begin!
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              handleClearStorage();
              router.push("/");
            }}
            disabled={isLoading}
            className="px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/20 rounded-xl transition-all duration-200"
            size="lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
      )}
    </div>
  );
}

