"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Menu,
  X,
  Calculator,
  FileText,
  ArrowRightLeft,
  MapPin,
  HelpCircle,
  Newspaper,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Globe },
  { href: "/visas", label: "Visas", icon: FileText },
  { href: "/points-calculator", label: "Points Calculator", icon: Calculator },
  { href: "/state-sponsorship", label: "State Sponsorship", icon: MapPin },
  { href: "/document-checklist", label: "Document Checklist", icon: FileText },
  { href: "/regional-postcode", label: "Regional Postcode", icon: MapPin },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/pathways", label: "Pathways", icon: ArrowRightLeft },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-400 to-teal-400 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-teal-500/20 transition-all duration-300">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-white">Aus</span>
              <span className="text-gradient-teal">Visa</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-teal-300"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/points-calculator"
              className="glass-button px-5 py-2.5 text-sm inline-flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Check Points
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-1 border-t border-white/5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-teal-300"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/points-calculator"
                onClick={() => setIsOpen(false)}
                className="glass-button w-full px-4 py-3 text-sm flex items-center justify-center gap-2 mt-3"
              >
                <Calculator className="w-4 h-4" />
                Check Your Points
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
