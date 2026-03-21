"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import {
  MapPin,
  Search,
  CheckCircle,
  XCircle,
  Info,
  ArrowRight,
} from "lucide-react";
import { checkPostcode, type PostcodeResult } from "@/lib/regionalPostcodes";

export default function RegionalPostcodePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<PostcodeResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const cleaned = query.trim();
    if (!cleaned) {
      setError("Please enter a postcode.");
      setResult(null);
      setHasSearched(false);
      return;
    }
    if (!/^\d{4}$/.test(cleaned)) {
      setError("Please enter a valid 4-digit Australian postcode.");
      setResult(null);
      setHasSearched(true);
      return;
    }

    const res = checkPostcode(cleaned);
    if (!res) {
      setError("This postcode doesn't match any known Australian region.");
      setResult(null);
    } else {
      setError("");
      setResult(res);
    }
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const examplePostcodes = [
    { code: "2000", label: "Sydney CBD" },
    { code: "3220", label: "Geelong" },
    { code: "4870", label: "Cairns" },
    { code: "5000", label: "Adelaide CBD" },
    { code: "6230", label: "Bunbury" },
    { code: "7000", label: "Hobart" },
  ];

  return (
    <div className="pt-24 pb-16 lg:pt-32 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={MapPin}
          iconWrapperClassName="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20"
          title={
            <>
              Regional Postcode <span className="text-gradient">Checker</span>
            </>
          }
          description='Instantly check if an Australian postcode is classified as a "Designated Regional Area" for migration purposes.'
          descriptionClassName="text-white/50 max-w-xl mx-auto"
          className="text-center mb-12"
        />

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 sm:p-8 mb-8"
        >
          <label className="block text-sm font-medium text-white/70 mb-3">
            Enter an Australian Postcode
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="e.g. 3220"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value.replace(/\D/g, "").slice(0, 4));
                  if (hasSearched) {
                    setHasSearched(false);
                    setResult(null);
                    setError("");
                  }
                }}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-lg font-mono tracking-widest placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400/30 transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
            </div>
            <button
              data-testid="check-btn"
              onClick={handleSearch}
              className="glass-button px-6 py-3.5 text-sm font-semibold flex items-center gap-2 flex-shrink-0"
            >
              Check
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick examples */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-white/30">Try:</span>
            {examplePostcodes.map((ex) => (
              <button
                key={ex.code}
                onClick={() => {
                  setQuery(ex.code);
                  setHasSearched(false);
                  setResult(null);
                  setError("");
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                {ex.code} ({ex.label})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {hasSearched && (
            <motion.div
              key={query + (result?.category || "error")}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              {error ? (
                <div className="glass-card p-6 border-rose-500/20 bg-rose-500/5">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                    <p className="text-rose-300 font-medium">{error}</p>
                  </div>
                </div>
              ) : result ? (
                <div
                  className={`glass-card p-6 sm:p-8 ${
                    result.category === "regional"
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : "border-amber-500/20 bg-amber-500/5"
                  }`}
                >
                  {/* Status header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        result.category === "regional"
                          ? "bg-emerald-500/20"
                          : "bg-amber-500/20"
                      }`}
                    >
                      {result.category === "regional" ? (
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {result.category === "regional"
                          ? "✓ Regional Area"
                          : "✗ Metropolitan Area"}
                      </h2>
                      <p className="text-white/50 text-sm">
                        Postcode{" "}
                        <span className="font-mono font-bold text-white">
                          {result.postcode}
                        </span>{" "}
                        — {result.state}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  {result.notes && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
                      <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white/70 leading-relaxed">
                        {result.notes}
                      </p>
                    </div>
                  )}

                  {/* What this means */}
                  <div>
                    <h3
                      className="text-sm font-bold text-white/80 mb-3 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      What this means for you
                    </h3>
                    {result.category === "regional" ? (
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>
                            Eligible location for the{" "}
                            <strong className="text-white">
                              Subclass 491 (Skilled Work Regional)
                            </strong>{" "}
                            visa.
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>
                            May qualify for{" "}
                            <strong className="text-white">
                              5 extra points
                            </strong>{" "}
                            for Australian regional study.
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>
                            Eligible for regional state/territory nomination
                            streams.
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>
                            After 3 years on a 491 visa living and working here,
                            you can apply for{" "}
                            <strong className="text-white">
                              Subclass 191 Permanent Residence
                            </strong>
                            .
                          </span>
                        </li>
                      </ul>
                    ) : (
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-white/60">
                          <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong className="text-white">Not eligible</strong>{" "}
                            as a regional location for the Subclass 491 visa.
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                          <span>
                            Still eligible for{" "}
                            <strong className="text-white">
                              Subclass 189
                            </strong>{" "}
                            and{" "}
                            <strong className="text-white">
                              Subclass 190
                            </strong>{" "}
                            visas (location-independent).
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white/60">
                          <Info className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                          <span>
                            Consider relocating to a regional area for access to
                            more visa pathways and state nominations.
                          </span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-xs text-white/30"
        >
          Regional classifications are based on the Department of Home Affairs
          (DHA) Designated Regional Areas instrument. Boundaries may change with
          policy updates. Always verify with the{" "}
          <a
            href="https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list/regional-postcodes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400/60 hover:text-teal-400 transition-colors underline"
          >
            official DHA postcode list
          </a>
          .
        </motion.div>
      </div>
    </div>
  );
}
