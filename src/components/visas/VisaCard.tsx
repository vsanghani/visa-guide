"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-[var(--shadow-ambient)]`}
          >
            <Icon className="w-6 h-6 text-on-primary" />
          </div>
          <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-xs font-medium text-primary/70 uppercase tracking-wide">
            {category}
          </span>
        </div>

        <div className="mb-4">
          <span className="text-xs font-medium text-secondary mb-1 block uppercase tracking-wide">
            Subclass {subclass}
          </span>
          <h3
            className="text-lg font-bold text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>
        </div>

        <p className="text-sm text-primary/65 leading-relaxed mb-4">
          {description}
        </p>

        <ul className="space-y-2 mb-5">
          {features.map((feature) => (
            <li
              key={feature}
              className="text-xs text-primary/55 flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {processingTime && (
          <div className="text-xs text-primary/45 mb-4">
            Processing: {processingTime}
          </div>
        )}

        <Link
          href={href}
          className="glass-button-outline w-full py-2.5 text-sm flex items-center justify-center gap-2 group-hover:border-secondary/50 group-hover:text-secondary"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}
