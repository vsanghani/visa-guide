"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  /** Full class for the icon container (gradient, size, shadow). */
  iconWrapperClassName?: string;
  headingClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

const defaultIconWrapper =
  "w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-400 to-teal-400 flex items-center justify-center mx-auto mb-5";

const defaultHeading =
  "text-3xl sm:text-4xl font-extrabold text-white mb-3";

const defaultDescription = "text-white/50 max-w-2xl mx-auto";

export default function PageHeader({
  title,
  description,
  icon: Icon,
  iconWrapperClassName,
  headingClassName = defaultHeading,
  descriptionClassName = defaultDescription,
  className = "text-center mb-10",
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {Icon && (
        <div className={iconWrapperClassName ?? defaultIconWrapper}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      )}
      <h1
        className={headingClassName}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h1>
      {description != null && (
        <div className={descriptionClassName}>{description}</div>
      )}
    </motion.div>
  );
}
