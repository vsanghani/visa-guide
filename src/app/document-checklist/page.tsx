"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "@/components/ui/StepIndicator";
import PageHeader from "@/components/ui/PageHeader";
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Printer,
  RotateCcw,
} from "lucide-react";

type SelectionState = {
  visaSubclass: string;
  maritalStatus: string;
  claimingPartnerPoints: string;
  onshore: string;
  claimingWorkExp: string;
  australianStudy: string;
};

const steps = ["Visa Type", "Personal", "Work & Study"];

const visaOptions = [
  { id: "189", label: "Subclass 189 (Skilled Independent)" },
  { id: "190", label: "Subclass 190 (Skilled Nominated)" },
  { id: "491", label: "Subclass 491 (Skilled Work Regional)" },
  { id: "482", label: "Subclass 482 (Temporary Skill Shortage)" },
  { id: "186", label: "Subclass 186 (Employer Nomination Scheme)" },
];

const maritalOptions = [
  { id: "single", label: "Single / Never Married" },
  { id: "married", label: "Married" },
  { id: "defacto", label: "De facto relationship" },
  { id: "divorced", label: "Divorced / Separated" },
];

const booleanOptions = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
];

type ChecklistCategory = {
  title: string;
  items: { text: string; note?: string }[];
};

export default function DocumentChecklistPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selections, setSelections] = useState<SelectionState>({
    visaSubclass: "",
    maritalStatus: "",
    claimingPartnerPoints: "",
    onshore: "",
    claimingWorkExp: "",
    australianStudy: "",
  });

  const handleSelect = (key: keyof SelectionState, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const reset = () => {
    setSelections({
      visaSubclass: "",
      maritalStatus: "",
      claimingPartnerPoints: "",
      onshore: "",
      claimingWorkExp: "",
      australianStudy: "",
    });
    setCurrentStep(0);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isCurrentStepValid = () => {
    if (currentStep === 0) return selections.visaSubclass !== "";
    if (currentStep === 1) {
      if (!selections.maritalStatus || !selections.onshore) return false;
      if (
        (selections.maritalStatus === "married" ||
          selections.maritalStatus === "defacto") &&
        !selections.claimingPartnerPoints
      ) {
        return false;
      }
      return true;
    }
    if (currentStep === 2) {
      return selections.claimingWorkExp !== "" && selections.australianStudy !== "";
    }
    return true;
  };

  const generateChecklist = useMemo(() => {
    const checklist: ChecklistCategory[] = [];

    // 1. Identity & Character (Everyone needs these)
    const identityItems = [
      { text: "Valid Passport (Biopage)", note: "Must have at least 6 months validity" },
      { text: "Birth Certificate or National ID Card" },
      { text: "Passport-sized photograph" },
      { text: "Police Clearances", note: "From every country lived in for 12+ months in the last 10 years (since age 16)" },
      { text: "Form 80 (Personal particulars)", note: "Highly recommended to front-load for standard processing" },
    ];
    
    // Add onshore specific identity docs
    if (selections.onshore === "yes") {
      identityItems.push({ text: "Current Australian Visa Grant Letter" });
    }
    
    // Add marital status docs
    if (selections.maritalStatus === "married") {
      identityItems.push({ text: "Marriage Certificate" });
    } else if (selections.maritalStatus === "divorced") {
      identityItems.push({ text: "Divorce Document / Decree Absolute" });
    }
    
    checklist.push({ title: "Identity & Character", items: identityItems });

    // 2. Skills & English (Required for skilled & employer sponsored)
    const skillsItems = [];
    
    // Most visas need English, 482 might need different levels
    if (selections.visaSubclass === "482") {
      skillsItems.push({ text: "English Language Test Results (IELTS/PTE/etc.)", note: "Must meet minimum requirement for TSS visa stream" });
    } else {
      skillsItems.push({ text: "English Language Test Results (IELTS/PTE/etc.)", note: "Competent English or higher. Test taken within last 3 years." });
    }

    // Skills assessment
    if (["189", "190", "491", "186"].includes(selections.visaSubclass)) {
      skillsItems.push({ text: "Positive Skills Assessment", note: "From the relevant assessing authority for your nominated occupation" });
    } else if (selections.visaSubclass === "482") {
      skillsItems.push({ text: "Skills Assessment (if applicable)", note: "Only required for certain passport holding countries and occupations" });
      skillsItems.push({ text: "CV / Resume", note: "Detailed and up-to-date" });
    }

    checklist.push({ title: "Skills & English Ability", items: skillsItems });

    // 3. Work Experience
    if (selections.claimingWorkExp === "yes" || selections.visaSubclass === "482" || selections.visaSubclass === "186") {
      const workItems = [
        { text: "Employment Reference Letters", note: "On company letterhead, detailing roles, hours, and duration." },
        { text: "Payslips", note: "Sample from beginning, middle, and end of each employment period." },
        { text: "Tax Records / Payment Summaries / Notice of Assessment" },
        { text: "Bank Statements showing salary deposits" },
      ];
      if (selections.visaSubclass === "186" || selections.visaSubclass === "482") {
        workItems.push({ text: "Superannuation statements (if worked in Australia)" });
      }
      checklist.push({ title: "Employment Evidence", items: workItems });
    }

    // 4. Education
    const educationItems = [
      { text: "Degree / Diploma Certificates" },
      { text: "Academic Transcripts" },
    ];
    if (selections.australianStudy === "yes") {
      educationItems.push({ text: "Australian Completion Letter" });
    }
    checklist.push({ title: "Education & Qualifications", items: educationItems });

    // 5. Partner / Dependents
    if (selections.maritalStatus === "married" || selections.maritalStatus === "defacto") {
      const partnerItems: { text: string; note?: string }[] = [
        { text: "Partner's Passport & Birth Certificate" },
        { text: "Partner's Police Clearances" },
      ];
      
      if (selections.maritalStatus === "defacto") {
        partnerItems.push({ text: "Evidence of de facto relationship", note: "Joint bank accounts, lease agreements, utility bills spanning at least 12 months" });
        partnerItems.push({ text: "Relationship registration certificate (optional but helps)" });
      }

      if (selections.claimingPartnerPoints === "yes" && ["189", "190", "491"].includes(selections.visaSubclass)) {
        partnerItems.push({ text: "Partner's Positive Skills Assessment" });
        partnerItems.push({ text: "Partner's Competent English Test Results" });
      } else {
        partnerItems.push({ text: "Evidence of Functional English for Partner", note: "If not provided, a secondary visa application charge may apply" });
      }

      checklist.push({ title: "Partner Documents", items: partnerItems });
    }

    // 6. Visa Specific (Nomination/Sponsorship)
    if (["190", "491"].includes(selections.visaSubclass)) {
      checklist.push({ 
        title: "State/Territory Nomination", 
        items: [
          { text: "State Nomination Approval Email/Letter" },
          { text: "Evidence of living/working in state (if required by the specific state)" }
        ] 
      });
    } else if (["482", "186"].includes(selections.visaSubclass)) {
      checklist.push({ 
        title: "Employer Sponsorship", 
        items: [
          { text: "Nomination TRN (Transaction Reference Number)", note: "Provided by your employer" },
          { text: "Copy of Employment Contract", note: "Signed by both parties" }
        ] 
      });
    }

    return checklist;
  }, [selections]);

  const renderOptionGroup = (
    title: string,
    options: { id: string; label: string }[],
    configKey: keyof SelectionState,
    columns: number = 1
  ) => (
    <div className="mb-6">
      {title && (
        <h4 className="text-sm font-medium text-primary/70 mb-3">{title}</h4>
      )}
      <div className={`grid gap-2 ${columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
        {options.map((option) => {
          const isSelected = selections[configKey] === option.id;
          return (
            <button
              key={option.id}
              data-testid={`${configKey}-${option.id}`}
              onClick={() => handleSelect(configKey, option.id)}
              className={`text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                isSelected
                  ? "bg-surface-container-high border-[rgba(0,30,64,0.12)] text-primary shadow-[var(--shadow-ambient)]"
                  : "bg-surface-container-low border-[rgba(195,198,209,0.2)] text-primary/65 hover:bg-surface-container-high"
              }`}
            >
              <span className="text-sm">{option.label}</span>
              {isSelected && <CheckCircle className="w-4 h-4 text-secondary" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStepContent = () => {
    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 0 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Which visa are you applying for?
            </h2>
            <p className="text-sm text-primary/60 mb-6">Select the main visa subclass to generate specific requirements.</p>
            {renderOptionGroup("", visaOptions, "visaSubclass")}
          </>
        )}

        {currentStep === 1 && (
          <>
             <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Personal Circumstances
            </h2>
            <p className="text-sm text-primary/60 mb-6">Tell us about your relationship status and location.</p>
            {renderOptionGroup("Are you currently inside Australia?", booleanOptions, "onshore", 2)}
            {renderOptionGroup("What is your relationship status?", maritalOptions, "maritalStatus")}
            
            {(selections.maritalStatus === "married" || selections.maritalStatus === "defacto") && 
              ["189", "190", "491"].includes(selections.visaSubclass) && 
              renderOptionGroup("Are you claiming points for your partner's skills/English?", booleanOptions, "claimingPartnerPoints", 2)
            }
          </>
        )}

        {currentStep === 2 && (
          <>
             <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Work & Study History
            </h2>
            <p className="text-sm text-primary/60 mb-6">This determines the evidence needed for your claims.</p>
            
            {["189", "190", "491"].includes(selections.visaSubclass) ? (
               renderOptionGroup("Are you claiming points for work experience?", booleanOptions, "claimingWorkExp", 2)
            ) : (
               renderOptionGroup("Do you have relevant work experience to declare?", booleanOptions, "claimingWorkExp", 2)
            )}
            
            {renderOptionGroup("Did you complete a degree/diploma/trade in Australia taking at least 2 years?", booleanOptions, "australianStudy", 2)}
          </>
        )}
      </motion.div>
    );
  };

  const renderResults = () => {
    const checklist = generateChecklist;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Your Custom Document Checklist
            </h2>
            <p className="text-sm text-primary/65">
              For Subclass {selections.visaSubclass}
              {selections.onshore === "yes" ? " (Onshore)" : " (Offshore)"}
            </p>
          </div>
          <button 
            onClick={() => window.print()}
            className="mt-4 sm:mt-0 glass-button-outline px-4 py-2 text-sm flex items-center gap-2 print:hidden"
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>
        </div>

        <div className="space-y-8 print:space-y-6">
          {checklist.map((category, idx) => (
            <div key={idx} className="print:break-inside-avoid">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-secondary">
                  {idx + 1}
                </div>
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3 glass-card bg-surface-container-low p-3 rounded-lg print:border print:border-gray-300 print:shadow-none print:bg-transparent">
                    <div className="mt-0.5 w-5 h-5 rounded border-2 border-primary/15 flex-shrink-0 print:border-gray-400"></div>
                    <div>
                      <span className="text-sm font-medium text-primary print:text-black">{item.text}</span>
                      {item.note && (
                        <p className="text-xs text-primary/60 mt-1 print:text-gray-600">{item.note}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 print:hidden text-center">
          <p className="text-xs text-primary/50 mb-6">
            Disclaimer: This checklist is generated for indicative purposes only based on your inputs. 
            The Department of Home Affairs may request additional documents. We recommend verifying with 
            official sources or a Registered Migration Agent.
          </p>
          <button
            onClick={reset}
            className="glass-button-outline px-6 py-3 text-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Create Another Checklist
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-24 pb-16 lg:pt-32 min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showResults && (
          <div className="print:hidden">
            <PageHeader
              icon={FileText}
              title={
                <>
                  Document <span className="text-gradient">Checklist</span>
                </>
              }
              description="Generate a personalized checklist of documents required for your Australian visa application."
              descriptionClassName="text-primary/60 max-w-xl mx-auto"
            />
          </div>
        )}

        {!showResults && (
          <div className="mb-8 print:hidden">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
        )}

        <div className={`glass-card p-6 sm:p-8 ${showResults ? 'print:p-0 print:border-none print:shadow-none' : ''}`}>
          <AnimatePresence mode="wait">
            {showResults ? renderResults() : renderStepContent()}
          </AnimatePresence>

          {!showResults && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5 print:hidden">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all ${
                  currentStep === 0
                    ? "text-primary/35 cursor-not-allowed"
                    : "text-primary/65 hover:text-primary hover:bg-white/5"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button 
                onClick={nextStep} 
                disabled={!isCurrentStepValid()}
                className={`px-6 py-2.5 text-sm flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 ${
                  isCurrentStepValid() 
                    ? "glass-button"
                    : "bg-surface-container-high text-primary/45 cursor-not-allowed"
                }`}
              >
                {currentStep === steps.length - 1 ? "Generate Checklist" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
