"use client";

import VisaCard from "@/components/visas/VisaCard";
import PageHeader from "@/components/ui/PageHeader";
import {
  Target,
  MapPin,
  Map,
  Briefcase,
  Building,
} from "lucide-react";

const visas = [
  {
    subclass: "189",
    title: "Skilled Independent Visa",
    description:
      "A permanent visa for skilled workers not sponsored by an employer, state, or territory. Points-tested and highly competitive.",
    icon: Target,
    color: "from-navy-400 to-navy-600",
    href: "/visas/visa-189",
    features: [
      "No sponsorship required",
      "Permanent residency on grant",
      "Points-tested (min. 65 points)",
      "Occupation on MLTSSL",
    ],
    processingTime: "6-12 months",
    category: "Skilled Migration",
  },
  {
    subclass: "190",
    title: "Skilled Nominated Visa",
    description:
      "A permanent visa for skilled workers nominated by an Australian state or territory government. Earn 5 extra points for nomination.",
    icon: MapPin,
    color: "from-teal-400 to-teal-600",
    href: "/visas/visa-190",
    features: [
      "State/territory nomination (+5 points)",
      "Permanent residency on grant",
      "Points-tested (min. 65 points)",
      "Must live in nominating state for 2 years",
    ],
    processingTime: "6-11 months",
    category: "Skilled Migration",
  },
  {
    subclass: "491",
    title: "Skilled Work Regional Visa",
    description:
      "A provisional visa for skilled workers nominated by a state/territory or sponsored by an eligible family member to live and work in regional Australia.",
    icon: Map,
    color: "from-emerald-400 to-emerald-500",
    href: "/visas/visa-491",
    features: [
      "15 points for regional nomination",
      "5-year provisional visa",
      "Pathway to PR via subclass 191",
      "Must live in regional area",
    ],
    processingTime: "6-16 months",
    category: "Skilled Migration",
  },
  {
    subclass: "482",
    title: "Temporary Skill Shortage Visa",
    description:
      "A temporary visa allowing employers to sponsor overseas workers for positions they cannot fill with Australian workers.",
    icon: Briefcase,
    color: "from-gold-400 to-gold-600",
    href: "/visas/visa-482",
    features: [
      "Employer-sponsored",
      "Short-term (2 yr) & Medium-term (4 yr) streams",
      "Pathway to PR via 186 (medium-term)",
      "Labour market testing required",
    ],
    processingTime: "1-6 months",
    category: "Employer Sponsored",
  },
  {
    subclass: "186",
    title: "Employer Nomination Scheme Visa",
    description:
      "A permanent visa for skilled workers nominated by their employer to work in Australia. Multiple streams available including transition from 482.",
    icon: Building,
    color: "from-rose-400 to-rose-500",
    href: "/visas/visa-186",
    features: [
      "Permanent residency on grant",
      "Direct Entry & TRT streams",
      "TRT stream for 482 holders",
      "No points test required",
    ],
    processingTime: "6-18 months",
    category: "Employer Sponsored",
  },
];

export default function VisasPage() {
  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title={
            <>
              Australian Visa <span className="text-gradient">Subclasses</span>
            </>
          }
          description="Explore the most popular visa pathways for skilled migration and employer-sponsored visas to Australia."
          headingClassName="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4"
          descriptionClassName="text-white/50 max-w-2xl mx-auto text-lg"
          className="text-center mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visas.map((visa) => (
            <VisaCard key={visa.subclass} {...visa} />
          ))}
        </div>
      </div>
    </div>
  );
}
