"use client";

import { useEffect, useRef, useState } from "react";
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
  ChevronDown,
} from "lucide-react";

const primaryLinks = [
  { href: "/", label: "Home", icon: Globe },
  { href: "/visas", label: "Visas", icon: FileText },
  { href: "/points-calculator", label: "Points Calculator", icon: Calculator },
] as const;

const moreLinks = [
  { href: "/state-sponsorship", label: "State Sponsorship", icon: MapPin },
  { href: "/document-checklist", label: "Document Checklist", icon: FileText },
  { href: "/regional-postcode", label: "Regional Postcode", icon: MapPin },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/pathways", label: "Pathways", icon: ArrowRightLeft },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
] as const;

function pathMatchesMore(pathname: string) {
  return moreLinks.some((l) => l.href === pathname);
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(e: MouseEvent | PointerEvent) {
      if (!moreRef.current?.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    if (!moreOpen) return;
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [moreOpen]);

  useEffect(() => {
    if (!moreOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMoreOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  const moreActive = pathMatchesMore(pathname);

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
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

          {/* Desktop: primary + More dropdown */}
          <div className="hidden md:flex items-center gap-1">
            {primaryLinks.map((link) => {
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

            <div className="relative pl-1" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((o) => !o)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  moreOpen || moreActive
                    ? "text-teal-300"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {(moreOpen || moreActive) && (
                  <motion.div
                    layoutId="activeTabMore"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">More</span>
                <ChevronDown
                  className={`relative z-10 w-4 h-4 transition-transform duration-200 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 min-w-[14rem] py-2 rounded-xl border border-white/10 bg-navy-950/95 backdrop-blur-xl shadow-xl shadow-black/40 z-50"
                    role="menu"
                  >
                    {moreLinks.map((link) => {
                      const isActive = pathname === link.href;
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          role="menuitem"
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                            isActive
                              ? "bg-white/10 text-teal-300"
                              : "text-white/80 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0 opacity-80" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-white/5"
          >
            <div className="px-4 pb-4 pt-3 space-y-1 max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto">
              {primaryLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-teal-300"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-3 pb-1">
                <p className="px-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                  {"Tools & resources"}
                </p>
              </div>

              {moreLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-teal-300"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
