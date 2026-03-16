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
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-navy-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-teal-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Updated for 2025-2026 Migration Program
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Path to
            <br />
            <span className="text-gradient">Australian PR</span>
            <br />
            Starts Here
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Calculate your migration points, explore visa subclasses 189, 190,
            491, 482 & 186, and discover the best pathway to permanent residency
            in Australia.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
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
              className="glass-button-outline px-8 py-4 text-base inline-flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              Explore Visa Options
            </Link>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="glass-card p-5 flex flex-col items-center gap-2"
                >
                  <Icon className="w-5 h-5 text-teal-400" />
                  <span
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/50">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
