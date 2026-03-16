"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Plane,
  MapPin,
  Building,
  Clock,
} from "lucide-react";

const pathways = [
  {
    title: "482 → 186 (Employer Sponsored)",
    subtitle: "Temporary Skill Shortage → Employer Nomination Scheme",
    icon: Briefcase,
    color: "from-gold-400 to-gold-600",
    duration: "2-3 years on 482, then apply for 186 TRT",
    steps: [
      "Obtain a 482 visa (Medium-term stream) sponsored by your employer",
      "Work for your nominating employer for at least 2-3 years",
      "Employer nominates you under the Temporary Residence Transition (TRT) stream",
      "Apply for Subclass 186 permanent visa",
      "Receive permanent residency upon approval",
    ],
    tips: [
      "Only medium-term stream 482 holders are eligible (not short-term)",
      "Must work for the same employer who nominates you",
      "Age exemptions may apply if earning above the high-income threshold",
    ],
    visas: [
      { label: "482 TSS", href: "/visas/visa-482" },
      { label: "186 ENS", href: "/visas/visa-186" },
    ],
  },
  {
    title: "491 → 191 (Regional Pathway)",
    subtitle: "Skilled Work Regional → Permanent Residence Regional",
    icon: MapPin,
    color: "from-emerald-400 to-emerald-500",
    duration: "3 years on 491, then apply for 191",
    steps: [
      "Obtain a 491 visa through state/territory nomination or family sponsorship",
      "Live and work in a designated regional area for at least 3 years",
      "Meet the minimum income requirement (AUD $53,900+ per year)",
      "Apply for Subclass 191 permanent visa",
      "Receive permanent residency upon approval",
    ],
    tips: [
      "You must have earned at least AUD $53,900/year (taxable income) for 3 years",
      "Regional areas include all of Australia except Sydney, Melbourne, and Brisbane",
      "The 191 visa is relatively straightforward if you meet the income and residency requirements",
    ],
    visas: [
      { label: "491 Regional", href: "/visas/visa-491" },
    ],
  },
  {
    title: "Student → 189/190 (Study Pathway)",
    subtitle: "Student Visa → Skilled Independent/Nominated",
    icon: GraduationCap,
    color: "from-navy-400 to-navy-600",
    duration: "2-4 years study + post-study work, then apply",
    steps: [
      "Complete at least 2 academic years of study in Australia (92 weeks)",
      "Obtain a post-study work visa (Subclass 485 — Graduate Temporary)",
      "Gain Australian work experience and improve English scores",
      "Get your skills assessed by the relevant authority",
      "Submit an EOI through SkillSelect and receive an invitation",
      "Apply for Subclass 189 or 190 visa",
    ],
    tips: [
      "Australian study gives you 5 points in the points test",
      "You may also gain points for Professional Year program (5 points)",
      "Regional study can qualify you for additional points and 491 nomination",
      "STEM PhD graduates can claim specialist education points (10 points)",
    ],
    visas: [
      { label: "189 Independent", href: "/visas/visa-189" },
      { label: "190 Nominated", href: "/visas/visa-190" },
    ],
  },
  {
    title: "WHM → 482 → 186 (Working Holiday)",
    subtitle: "Working Holiday Maker → TSS → ENS",
    icon: Plane,
    color: "from-teal-400 to-teal-600",
    duration: "1-2 years WHM + 2-3 years 482, then 186",
    steps: [
      "Enter Australia on a Working Holiday visa (Subclass 417 or 462)",
      "Gain work experience and build relationships with employers",
      "Find an employer willing to sponsor you for a 482 visa",
      "Transition to a 482 visa (employer sponsored)",
      "After 2-3 years on 482, apply for 186 permanent visa through TRT stream",
    ],
    tips: [
      "Working Holiday visa is available to passport holders of eligible countries aged 18-30 (35 for some)",
      "Use the WHM period to network and find sponsor employers",
      "Ensure your work experience aligns with a skilled occupation list",
      "This is a longer pathway but can work well for those without formal qualifications",
    ],
    visas: [
      { label: "482 TSS", href: "/visas/visa-482" },
      { label: "186 ENS", href: "/visas/visa-186" },
    ],
  },
];

export default function PathwaysPage() {
  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Migration <span className="text-gradient">Pathways</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Explore common temporary-to-permanent pathways for migrating to
            Australia. Find the route that best matches your situation.
          </p>
        </motion.div>

        {/* Pathways */}
        <div className="space-y-8">
          {pathways.map((pathway, i) => {
            const Icon = pathway.icon;
            return (
              <GlassCard key={pathway.title} delay={i * 0.1} className="p-0 overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${pathway.color}`} />
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pathway.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2
                        className="text-lg sm:text-xl font-bold text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {pathway.title}
                      </h2>
                      <p className="text-sm text-white/50">{pathway.subtitle}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3.5 h-3.5 text-teal-400" />
                        <span className="text-xs text-teal-400">
                          {pathway.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white mb-4">
                      Step-by-Step Process
                    </h3>
                    <div className="space-y-3">
                      {pathway.steps.map((step, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-navy-400/20 to-teal-400/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold text-teal-400">
                                {j + 1}
                              </span>
                            </div>
                            {j < pathway.steps.length - 1 && (
                              <div className="w-px h-4 bg-white/10 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-white/60 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-white/3 rounded-xl p-4 mb-5">
                    <h4 className="text-xs font-semibold text-gold-400 mb-2">
                      💡 Key Tips
                    </h4>
                    <ul className="space-y-1.5">
                      {pathway.tips.map((tip, j) => (
                        <li
                          key={j}
                          className="text-xs text-white/40 flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related visas */}
                  <div className="flex flex-wrap gap-2">
                    {pathway.visas.map((visa) => (
                      <Link
                        key={visa.label}
                        href={visa.href}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs font-medium text-teal-300 hover:bg-white/10 hover:border-teal-400/30 transition-all"
                      >
                        {visa.label}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
