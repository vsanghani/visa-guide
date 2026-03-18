"use client";

import Hero from "@/components/Hero";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  ArrowRightLeft,
  Calculator,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  MapPin,
} from "lucide-react";

const visaCategories = [
  {
    title: "Skilled Migration",
    description:
      "Points-tested visas for skilled workers — subclass 189, 190, and 491",
    icon: Target,
    color: "from-navy-400 to-navy-600",
    href: "/visas",
    badges: ["189", "190", "491"],
  },
  {
    title: "Employer Sponsored",
    description:
      "Visas sponsored by Australian employers — subclass 482 and 186",
    icon: Briefcase,
    color: "from-teal-400 to-teal-600",
    href: "/visas",
    badges: ["482", "186"],
  },
  {
    title: "Temp to Permanent",
    description:
      "Pathways from temporary visas to permanent residency in Australia",
    icon: ArrowRightLeft,
    color: "from-gold-400 to-gold-600",
    href: "/pathways",
    badges: ["482→186", "491→191"],
  },
];

const steps = [
  {
    number: "01",
    title: "Check Eligibility",
    description:
      "Use our points calculator to see if you meet the minimum 65 points for skilled migration visas.",
    icon: Calculator,
  },
  {
    number: "02",
    title: "Prepare Documents",
    description:
      "Use our checklist generator to know exactly what evidence you need to gather.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Explore Visa Options",
    description:
      "Compare different visa subclasses and find the best fit for your skills, experience, and goals.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Understand Pathways & Plan",
    description:
      "Get detailed information about processing times, costs, and temporary-to-permanent pathways.",
    icon: ArrowRightLeft,
  },
];

const features = [
  {
    title: "Accurate Points Calculator",
    description:
      "Based on the latest DHA points test criteria. Get your score for 189, 190, and 491 visas instantly.",
    icon: Calculator,
  },
  {
    title: "State Sponsorship Matrix",
    description:
      "Compare 190 and 491 visa nomination criteria across all Australian states and territories.",
    icon: MapPin,
  },
  {
    title: "Document Checklist",
    description: "Generate a tailored list of documents required for your specific visa and personal circumstances.",
    icon: FileText,
  },
  {
    title: "Pathway Guidance",
    description:
      "Visual flowcharts showing common temporary-to-permanent migration pathways.",
    icon: ArrowRightLeft,
  },
  {
    title: "Comprehensive FAQ",
    description:
      "Answers to the most common questions about Australian skilled migration and visa processing.",
    icon: Sparkles,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Visa Categories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Explore Visa Categories
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Australia offers multiple pathways to permanent residency. Find the
              one that suits your profile.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visaCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <GlassCard key={cat.title} delay={i * 0.1}>
                  <Link href={cat.href} className="block">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3
                      className="text-lg font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-4 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {cat.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 py-1 rounded-lg bg-white/5 text-xs font-medium text-teal-300 border border-white/5"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </Link>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How It Works
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Four simple steps to understand your Australian migration options.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <GlassCard key={step.number} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-black text-white/10" style={{ fontFamily: "var(--font-display)" }}>
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-teal-400 mt-2 flex-shrink-0" />
                  </div>
                  <h3
                    className="text-base font-bold text-white mt-4 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Use AusVisa Guide?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <GlassCard key={feature.title} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400/20 to-navy-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-navy-500/10 to-teal-500/10" />
            <div className="relative">
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to Check Your Eligibility?
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8">
                Use our free points calculator to instantly find out if you meet
                the minimum requirements for Australian skilled migration.
              </p>
              <Link
                href="/points-calculator"
                className="glass-button px-8 py-4 text-base inline-flex items-center gap-2.5"
              >
                <Calculator className="w-5 h-5" />
                Start Points Calculator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
