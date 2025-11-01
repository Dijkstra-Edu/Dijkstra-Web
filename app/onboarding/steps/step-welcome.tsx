"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Github } from "lucide-react";
import { IconBrandDiscord, IconBrandLinkedin } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "./shared-components";

interface WelcomeStepProps {
  onGetStarted: () => void;
}

const platforms = [
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    color: "from-gray-900 to-gray-700",
  },
  {
    id: "git",
    name: "Git",
    icon: "git",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "vscode",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "discord",
    name: "Discord",
    icon: IconBrandDiscord,
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "from-blue-700 to-blue-800",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    icon: "leetcode",
    color: "from-orange-400 to-yellow-500",
  },
  {
    id: "career",
    name: "Career Planning",
    icon: "career",
    color: "from-purple-500 to-pink-500",
  },
];

export function WelcomeStep({ onGetStarted }: WelcomeStepProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="space-y-8 text-center max-w-4xl">
        {/* Logo */}
        <motion.img
          src="/icon.png"
          alt="Dijkstra GPT logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-30 w-30 mx-auto"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
        >
          Welcome to Dijkstra
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Let's get you set up with all the essential tools for your coding journey
        </motion.p>

        {/* Mini Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between w-full max-w-2xl">
            {platforms.map((platform, index) => {
              const Icon =
                typeof platform.icon === "string" ? null : platform.icon;
              return (
                <div key={platform.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <CustomIcon
                          iconType={platform.icon as string}
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </motion.div>
                  {index < platforms.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="w-6 h-0.5 mx-3 bg-gradient-to-r from-border to-muted-foreground/30 backdrop-blur-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto px-4">
            We'll guide you through setting up GitHub, Git, VS Code, Discord,
            LeetCode, and LinkedIn - everything you need to start your
            development journey.
          </p>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex justify-center"
        >
          <Button
            onClick={onGetStarted}
            className="px-6 sm:px-8 py-4 sm:py-6 cursor-pointer text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200"
            size="lg"
          >
            Get Started
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground/60 max-w-sm mx-auto">
            ✨ Interactive tutorials • Step-by-step guidance • Beginner-friendly
          </p>
        </motion.div>
      </div>
    </div>
  );
}

