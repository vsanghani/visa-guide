"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";

const stats = [
  { label: "Visa Subclasses", value: "5+", icon: Shield },
  { label: "Points Categories", value: "10+", icon: TrendingUp },
  { label: "Pathways Covered", value: "4+", icon: Users },
];

export default function Hero() {
  return (
    <section className="relative hero-gradient pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden text-on-primary">
      <div className="absolute top-0 right-0 w-[min(100%,42rem)] h-64 bg-white/[0.04] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-surface-tint/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pl-8 lg:pr-16 relative">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-medium text-white/90 mb-8 tracking-wide uppercase"
            style={{ letterSpacing: "0.06em" }}
          >
            <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
            Updated for 2025-2026 Migration Program
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-lg font-bold text-white mb-6 max-w-3xl mx-auto lg:mx-0"
          >
            Your Path to
            <br />
            <span className="text-white/95">Australian PR</span>
            <br />
            Starts Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Calculate your migration points, explore visa subclasses 189, 190,
            491, 482 & 186, and discover the best pathway to permanent residency
            in Australia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-16"
          >
            <Link
              href="/points-calculator"
              className="glass-button px-8 py-4 text-base inline-flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              <Calculator className="w-5 h-5" />
              Calculate Your Points
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/visas"
              className="px-8 py-4 text-base inline-flex items-center gap-2.5 w-full sm:w-auto justify-center rounded-xl font-semibold border border-[rgba(195,198,209,0.25)] text-white hover:bg-white/10 hover:border-white/35 transition-colors"
            >
              Explore Visa Options
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="rounded-xl bg-surface-container-lowest p-5 flex flex-col items-center gap-2 shadow-[var(--shadow-ambient)]"
                >
                  <Icon className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-bold text-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-on-surface/60 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
