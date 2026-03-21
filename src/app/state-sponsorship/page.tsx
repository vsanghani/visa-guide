"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Globe,
  Award,
  ChevronRight,
  Info,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

type PathwayCriteria = {
  title: string;
  icon: LucideIcon;
  details: string[];
};

type VisaCriteria = {
  status: "Open" | "Closed" | "Invitation Only" | "Registration of Interest";
  minPoints: string;
  generalDescription: string;
  pathways: PathwayCriteria[];
};

type StateData = {
  id: string;
  name: string;
  officialLink: string;
  color: string;
  subclass190: VisaCriteria;
  subclass491: VisaCriteria;
};

const states: StateData[] = [
  {
    id: "NSW",
    name: "New South Wales",
    officialLink: "https://www.nsw.gov.au/visas-and-migration/skilled-visas",
    color: "from-blue-600 to-cyan-500",
    subclass190: {
      status: "Invitation Only",
      minPoints: "Typically 85+ for IT/Pro, 65+ for Health/Education",
      generalDescription: "NSW runs a highly competitive, points-based invitation process. Priority is given to target sectors like Health, Education, and Infrastructure.",
      pathways: [
        {
          title: "Onshore Applicants",
          icon: MapPin,
          details: [
            "Must be currently residing in NSW.",
            "Must have been continuously residing in NSW for at least 6 months OR be employed in NSW in your nominated occupation.",
            "High emphasis on English proficiency (Superior preferred).",
          ],
        },
        {
          title: "Offshore Applicants",
          icon: Globe,
          details: [
            "Must be residing continuously offshore for the past 3 months.",
            "Only specific target sector occupations are considered.",
          ],
        },
      ],
    },
    subclass491: {
      status: "Invitation Only",
      minPoints: "Typically 65+ (including 15 state points)",
      generalDescription: "Regional NSW offers pathways through Regional Development Australia (RDA) offices or Investment NSW.",
      pathways: [
        {
          title: "Pathway 1: Direct application to RDA",
          icon: Briefcase,
          details: [
            "Must be living and working in designated regional NSW for at least 12 months.",
            "Employment must be in your nominated (or closely related) occupation.",
          ],
        },
        {
          title: "Pathway 2: Investment NSW Invites",
          icon: Award,
          details: [
            "Invitation only, based on SkillSelect EOI.",
            "Priority for target sectors and those with rural ties.",
          ],
        },
      ],
    },
  },
  {
    id: "VIC",
    name: "Victoria",
    officialLink: "https://liveinmelbourne.vic.gov.au/migrate",
    color: "from-indigo-600 to-blue-500",
    subclass190: {
      status: "Invitation Only",
      minPoints: "65+ (Registration of Interest Required)",
      generalDescription: "Victoria requires a Registration of Interest (ROI) before you can apply. They prioritize applicants working in target sectors.",
      pathways: [
        {
          title: "Onshore - Target Sectors",
          icon: Briefcase,
          details: [
            "Must be living in Victoria.",
            "Must be working in a target sector: Health, Tech, Advanced Manufacturing, New Energy, etc.",
            "Earnings must reflect market salary rates.",
          ],
        },
        {
          title: "Offshore Applicants",
          icon: Globe,
          details: [
            "Available for select health, tech, and early childhood occupations.",
            "Invitations prioritize highest points and highly demanded skills.",
          ],
        },
      ],
    },
    subclass491: {
      status: "Invitation Only",
      minPoints: "65+ (Registration of Interest Required)",
      generalDescription: "Regional Victorian sponsorship requires you to live and work in designated regional areas of Victoria.",
      pathways: [
        {
          title: "Onshore Regional Worker",
          icon: MapPin,
          details: [
            "Must be living and working in regional Victoria.",
            "Can be working in ANY occupation on the eligible lists (not restricted to target sectors like the 190).",
          ],
        },
        {
          title: "Offshore Applicants",
          icon: Globe,
          details: [
            "Similar to 190, prioritized for healthcare and specific shortages.",
          ],
        },
      ],
    },
  },
  {
    id: "QLD",
    name: "Queensland",
    officialLink: "https://migration.qld.gov.au/",
    color: "from-red-600 to-orange-500",
    subclass190: {
      status: "Invitation Only",
      minPoints: "75+ (often 80+ for IT/Engineering)",
      generalDescription: "Migration Queensland has very specific eligibility criteria depending on whether you are working in QLD or are a QLD graduate.",
      pathways: [
        {
          title: "Working in Queensland",
          icon: Briefcase,
          details: [
            "Live in QLD and have full-time employment (35+ hours/week) in nominated occupation for past 6 months.",
            "Have an ongoing job offer for 12 months.",
            "Proficient English or higher required.",
          ],
        },
        {
          title: "Queensland Graduates",
          icon: GraduationCap,
          details: [
            "PhD: No job offer required if graduated recently.",
            "Masters/Bachelors: Must have graduated in QLD, GPA requirements often apply, and employment in nominated occupation.",
          ],
        },
      ],
    },
    subclass491: {
      status: "Invitation Only",
      minPoints: "65+",
      generalDescription: "Offers pathways for regional workers and small business owners.",
      pathways: [
        {
          title: "Working in Regional QLD",
          icon: MapPin,
          details: [
            "Live and work in regional QLD for 3 months prior to EOI.",
            "Ongoing employment offer in regional QLD for 12 months.",
          ],
        },
        {
          title: "Small Business Owner (SBO)",
          icon: Briefcase,
          details: [
            "Purchase an existing business in regional QLD (min value $100k) or start a new business.",
            "Operate for 6 months prior to EOI.",
            "Employ at least one Australian resident.",
          ],
        },
      ],
    },
  },
  {
    id: "WA",
    name: "Western Australia",
    officialLink: "https://migration.wa.gov.au/",
    color: "from-amber-500 to-yellow-400",
    subclass190: {
      status: "Open",
      minPoints: "65+",
      generalDescription: "WA has one of the most generous graduate pathways and doesn't charge state application fees. Invitations are issued monthly.",
      pathways: [
        {
          title: "Schedule 1 & 2 (General Stream)",
          icon: Briefcase,
          details: [
            "Must have a 6-month contract of employment in WA.",
            "Offshore applicants are eligible and get priority for certain occupations.",
          ],
        },
        {
          title: "Graduate Stream",
          icon: GraduationCap,
          details: [
            "Must have studied in WA (min 2 years university or VET).",
            "Highest priority given to Masters/PhD grads.",
            "Requires relevant work experience or 6-month job contract.",
          ],
        },
      ],
    },
    subclass491: {
      status: "Open",
      minPoints: "65+",
      generalDescription: "Follows same streams as 190 but generally requires lower points and is more accessible for VET graduates.",
      pathways: [
        {
          title: "General & Graduate Streams",
          icon: Award,
          details: [
            "Similar criteria to 190, but applicants committing to regional WA get priority.",
            "Employment contracts must be in a regional WA postcode.",
          ],
        },
      ],
    },
  },
  {
    id: "SA",
    name: "South Australia",
    officialLink: "https://www.migration.sa.gov.au/",
    color: "from-red-500 to-rose-400",
    subclass190: {
      status: "Registration of Interest",
      minPoints: "65+",
      generalDescription: "SA heavily favors international graduates and those already working in SA. An ROI is required.",
      pathways: [
        {
          title: "Working in SA",
          icon: Briefcase,
          details: [
            "Currently living and working in SA (6-12 months depending on occupation).",
            "Must be working at least 20 hours/week (or 30+ for certain streams).",
          ],
        },
        {
          title: "SA Graduates",
          icon: GraduationCap,
          details: [
            "Must have finished a CRICOS registered course in SA.",
            "High Performing Graduates can get fast-tracked 190 without work experience.",
          ],
        },
      ],
    },
    subclass491: {
      status: "Registration of Interest",
      minPoints: "65+",
      generalDescription: "491 is widely available across SA pathways, especially for those in outer regional areas.",
      pathways: [
        {
          title: "Outer Regional SA",
          icon: MapPin,
          details: [
            "Working in Outer Regional SA for 6 months gives massive priority for 491.",
            "Can often be working in ANY occupation, not just nominated one.",
          ],
        },
        {
          title: "Offshore",
          icon: Globe,
          details: [
            "SA often selects offshore candidates with highly specialized skills in defensed, health, and tech.",
          ],
        },
      ],
    },
  },
];

export default function StateSponsorshipPage() {
  const [activeState, setActiveState] = useState<string>(states[0].id);
  const [activeTab, setActiveTab] = useState<"190" | "491">("190");

  const currentState = states.find((s) => s.id === activeState)!;
  const currentCriteria = activeTab === "190" ? currentState.subclass190 : currentState.subclass491;

  const StatusBadge = ({ status }: { status: string }) => {
    let color = "bg-green-500/20 text-green-400 border-green-500/30";
    if (status === "Closed") color = "bg-red-500/20 text-red-400 border-red-500/30";
    if (status === "Invitation Only" || status === "Registration of Interest") color = "bg-amber-500/20 text-amber-400 border-amber-500/30";
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="pt-24 pb-16 lg:pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={MapPin}
          iconWrapperClassName="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/20"
          title={
            <>
              State Sponsorship{" "}
              <span className="text-gradient">Criteria Matrix</span>
            </>
          }
          description="Compare specific nomination requirements across Australian states for Subclass 190 and 491 visas. State criteria vary significantly and change often."
          headingClassName="text-3xl sm:text-4xl font-extrabold text-primary mb-4"
          descriptionClassName="text-primary/65 max-w-2xl mx-auto text-lg leading-relaxed"
          className="text-center mb-12"
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / State Selector */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/4 flex-shrink-0"
          >
            <div className="glass-card p-4 sticky top-28">
              <h3 className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-4 px-2">Select a State</h3>
              <div className="flex overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0 scrollbar-hide">
                {states.map((state) => (
                  <button
                    key={state.id}
                    onClick={() => setActiveState(state.id)}
                    className={`flex-shrink-0 lg:w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                      activeState === state.id
                        ? "bg-white/10 ring-1 ring-white/20 shadow-lg"
                        : "hover:bg-white/5 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-primary text-lg">{state.id}</span>
                      <span className="block text-xs text-primary/60 group-hover:text-primary/70 transition-colors hidden lg:block">
                        {state.name}
                      </span>
                    </div>
                    {activeState === state.id && (
                      <ChevronRight className="w-5 h-5 text-primary/60 hidden lg:block" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div 
            key={currentState.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full lg:w-3/4"
          >
            <div className="glass-card p-6 sm:p-8 overflow-hidden relative">
              {/* Decorative background gradient */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${currentState.color} opacity-10 blur-[100px] pointer-events-none rounded-full`} />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-white/10 pb-6 relative z-10">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3" style={{ fontFamily: "var(--font-display)" }}>
                    {currentState.name}
                  </h2>
                  <a 
                    href={currentState.officialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors"
                  >
                    {currentState.name} Official Migration Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Subclass Tabs */}
              <div className="flex gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl w-full sm:w-fit relative z-10">
                <button
                  onClick={() => setActiveTab("190")}
                  className={`flex-1 sm:w-40 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === "190"
                      ? "bg-white text-navy-900 shadow-lg"
                      : "text-primary/65 hover:text-primary hover:bg-white/5"
                  }`}
                >
                  Subclass 190
                </button>
                <button
                  onClick={() => setActiveTab("491")}
                  className={`flex-1 sm:w-40 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === "491"
                      ? "bg-gradient-to-r from-teal-400 to-teal-500 text-teal-950 shadow-lg"
                      : "text-primary/65 hover:text-primary hover:bg-white/5"
                  }`}
                >
                  Subclass 491
                </button>
              </div>

              {/* Criteria Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeState}-${activeTab}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <p className="text-xs font-semibold text-primary/50 uppercase tracking-wider mb-2">Program Status</p>
                      <StatusBadge status={currentCriteria.status} />
                    </div>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <p className="text-xs font-semibold text-primary/50 uppercase tracking-wider mb-2">Typical Points</p>
                      <p className="text-lg font-bold text-primary">{currentCriteria.minPoints}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
                      <Info className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{currentCriteria.generalDescription}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    Primary Nomination Pathways
                  </h3>

                  <div className="space-y-4">
                    {currentCriteria.pathways.map((pathway, idx) => {
                      const Icon = pathway.icon;
                      return (
                        <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 transition-all hover:bg-white/[0.05]">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-teal-300" />
                            </div>
                            <h4 className="text-lg font-semibold text-primary">{pathway.title}</h4>
                          </div>
                          <ul className="space-y-3 pl-[3.25rem]">
                            {pathway.details.map((detail, dIdx) => (
                              <li key={dIdx} className="text-sm text-primary/70 relative">
                                <span className="absolute -left-5 top-1.5 w-1.5 h-1.5 rounded-full bg-teal-500/50" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-8 text-xs text-primary/45 text-center">
                    Note: State criteria change frequently based on federal allocations and local skill shortages. 
                    Always consult the official state website before applying.
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
