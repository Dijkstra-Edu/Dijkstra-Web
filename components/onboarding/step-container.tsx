"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepContainerProps {
  children: ReactNode;
  className?: string;
}

export function StepContainer({ children, className = "" }: StepContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-6 h-[600px] ${className}`}
    >
      {children}
    </motion.div>
  );
}

