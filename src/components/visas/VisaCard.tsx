"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface VisaCardProps {
  subclass: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
  features: string[];
  processingTime?: string;
  category: string;
}

export default function VisaCard({
  subclass,
  title,
  description,
  icon: Icon,
  color,
  href,
  features,
  processingTime,
  category,
}: VisaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden group"
    >
      <div className={`h-1.5 bg-gradient-to-r ${color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 text-xs font-medium text-white/50 border border-white/5">
            {category}
          </span>
        </div>

        <div className="mb-4">
          <span className="text-xs font-medium text-teal-400 mb-1 block">
            Subclass {subclass}
          </span>
          <h3
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>
        </div>

        <p className="text-sm text-white/50 leading-relaxed mb-4">
          {description}
        </p>

        <ul className="space-y-2 mb-5">
          {features.map((feature) => (
            <li
              key={feature}
              className="text-xs text-white/40 flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {processingTime && (
          <div className="text-xs text-white/30 mb-4">
            Processing: {processingTime}
          </div>
        )}

        <Link
          href={href}
          className="glass-button-outline w-full py-2.5 text-sm flex items-center justify-center gap-2 group-hover:border-teal-400/30 group-hover:text-teal-300"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}
