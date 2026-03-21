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
  Target,
  Sparkles,
  MapPin,
  Newspaper,
} from "lucide-react";

const visaCategories = [
  {
    title: "Skilled Migration",
    description:
      "Points-tested visas for skilled workers — subclass 189, 190, and 491",
    icon: Target,
    color: "from-primary to-primary-container",
    href: "/visas",
    badges: ["189", "190", "491"],
  },
  {
    title: "Employer Sponsored",
    description:
      "Visas sponsored by Australian employers — subclass 482 and 186",
    icon: Briefcase,
    color: "from-secondary to-primary-container",
    href: "/visas",
    badges: ["482", "186"],
  },
  {
    title: "Temp to Permanent",
    description:
      "Pathways from temporary visas to permanent residency in Australia",
    icon: ArrowRightLeft,
    color: "from-primary-container to-secondary",
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
    description:
      "Generate a tailored list of documents required for your specific visa and personal circumstances.",
    icon: FileText,
  },
  {
    title: "Regional Postcode Checker",
    description:
      "Instantly check if an Australian postcode is in a Designated Regional Area for 491 visa eligibility.",
    icon: MapPin,
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
  {
    title: "Latest News & Updates",
    description:
      "Stay informed with the latest immigration policy changes, invitation rounds, and state nomination news.",
    icon: Newspaper,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:text-left lg:pl-4 lg:pr-20"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-primary mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Explore Visa Categories
            </h2>
            <p className="text-primary/65 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
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
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 shadow-[var(--shadow-ambient)]`}
                    >
                      <Icon className="w-6 h-6 text-on-primary" />
                    </div>
                    <h3
                      className="text-lg font-bold text-primary mb-2 tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-sm text-primary/65 mb-4 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {cat.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 py-1 rounded-full bg-surface-container-low text-xs font-medium text-primary uppercase tracking-wide"
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

      <section className="py-16 lg:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-primary mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How It Works
            </h2>
            <p className="text-primary/65 max-w-2xl mx-auto leading-relaxed">
              Four simple steps to understand your Australian migration options.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <GlassCard key={step.number} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <span
                      className="text-3xl font-black text-primary/[0.08]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-secondary mt-2 flex-shrink-0" />
                  </div>
                  <h3
                    className="text-base font-bold text-primary mt-4 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-primary/65 leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-primary mb-4 tracking-tight"
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
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold text-primary mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-sm text-primary/65 leading-relaxed">
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

      <section className="py-16 lg:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hero-gradient rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-[var(--shadow-ambient)]"
          >
            <div className="absolute inset-0 bg-white/[0.03] pointer-events-none" />
            <div className="relative text-on-primary">
              <h2
                className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to Check Your Eligibility?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
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
