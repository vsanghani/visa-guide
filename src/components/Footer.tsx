import Link from "next/link";
import { Globe, Mail, ExternalLink } from "lucide-react";

const footerSections = [
  {
    title: "Visa Types",
    links: [
      { label: "Subclass 189", href: "/visas/visa-189" },
      { label: "Subclass 190", href: "/visas/visa-190" },
      { label: "Subclass 491", href: "/visas/visa-491" },
      { label: "Subclass 482", href: "/visas/visa-482" },
      { label: "Subclass 186", href: "/visas/visa-186" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Points Calculator", href: "/points-calculator" },
      { label: "State Sponsorship", href: "/state-sponsorship" },
      { label: "Migration Pathways", href: "/pathways" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Official Resources",
    links: [
      {
        label: "Department of Home Affairs",
        href: "https://immi.homeaffairs.gov.au",
        external: true,
      },
      {
        label: "SkillSelect",
        href: "https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect",
        external: true,
      },
      {
        label: "Skills Assessment",
        href: "https://immi.homeaffairs.gov.au/visas/working-in-australia/skills-assessment",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-400 to-teal-400 flex items-center justify-center">
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
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Your comprehensive guide to Australian skilled migration. Calculate
              points, explore visa options, and plan your pathway to PR.
            </p>
            <a
              href="mailto:info@ausvisa.guide"
              className="inline-flex items-center gap-2 text-teal-400/80 text-sm hover:text-teal-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@ausvisa.guide
            </a>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className="text-white font-semibold text-sm mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 text-sm hover:text-teal-300 transition-colors inline-flex items-center gap-1.5"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/50 text-sm hover:text-teal-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-white/30 text-xs leading-relaxed mb-4">
            <strong>Disclaimer:</strong> This website provides general
            information about Australian migration only. It is not a substitute
            for professional migration advice. Always consult a registered
            migration agent (MARA) or immigration lawyer for advice specific to
            your situation. Visa requirements and policies are subject to change
            by the Australian Department of Home Affairs.
          </p>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} AusVisa Guide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
