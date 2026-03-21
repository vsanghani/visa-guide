"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export interface VisaDetailLayoutProps {
  subclass: string;
  title: string;
  category: string;
  color: string;
  overview: string;
  eligibility: string[];
  process: string[];
  costs: { item: string; amount: string }[];
  processingTime: string;
  tips: string[];
  children?: ReactNode;
}

export default function VisaDetailLayout({
  subclass,
  title,
  category,
  color,
  overview,
  eligibility,
  process,
  costs,
  processingTime,
  tips,
  children,
}: VisaDetailLayoutProps) {
  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/visas"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-teal-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Visas
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`px-3 py-1 rounded-lg bg-gradient-to-r ${color} text-xs font-bold text-white`}
            >
              Subclass {subclass}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 text-xs font-medium text-white/50 border border-white/5">
              {category}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2
                className="text-lg font-bold text-white mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <FileText className="w-5 h-5 text-teal-400" />
                Overview
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                {overview}
              </p>
            </motion.div>

            {/* Eligibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2
                className="text-lg font-bold text-white mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <CheckCircle className="w-5 h-5 text-teal-400" />
                Eligibility Requirements
              </h2>
              <ul className="space-y-3">
                {eligibility.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-white/60 flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Application Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2
                className="text-lg font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Application Process
              </h2>
              <div className="space-y-4">
                {process.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-400/20 to-teal-400/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-teal-400">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 pt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {children}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Processing Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm font-bold text-white">
                  Processing Time
                </h3>
              </div>
              <p className="text-lg font-bold text-gradient-teal">
                {processingTime}
              </p>
              <p className="text-xs text-white/40 mt-1">
                Based on current DHA estimates
              </p>
            </motion.div>

            {/* Costs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-gold-400" />
                <h3 className="text-sm font-bold text-white">
                  Application Costs
                </h3>
              </div>
              <div className="space-y-2">
                {costs.map((cost) => (
                  <div
                    key={cost.item}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-white/50">{cost.item}</span>
                    <span className="text-sm font-semibold text-white">
                      {cost.amount}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-gold-400" />
                <h3 className="text-sm font-bold text-white">Key Tips</h3>
              </div>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li
                    key={i}
                    className="text-xs text-white/50 flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/points-calculator"
                className="glass-button w-full py-3 text-sm flex items-center justify-center gap-2"
              >
                Check Your Points
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
