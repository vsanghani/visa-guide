"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        return (
          <div key={index} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-secondary text-on-primary"
                    : isCurrent
                      ? "bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-[var(--shadow-ambient)]"
                      : "bg-surface-container-high text-primary/40"
                }`}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </motion.div>
              <span
                className={`text-xs hidden sm:inline font-medium ${
                  isCurrent
                    ? "text-secondary"
                    : isCompleted
                      ? "text-primary/70"
                      : "text-primary/40"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 ${
                  isCompleted ? "bg-secondary/40" : "bg-surface-container-high"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
