"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "@/components/ui/StepIndicator";
import PageHeader from "@/components/ui/PageHeader";
import { generatePointsPDF } from "@/lib/generatePointsPDF";
import {
  getVisaEligibilityForPdf,
  SKILLED_VISA_THRESHOLDS,
} from "@/lib/skilledVisaThresholds";
import {
  Calculator,
  ChevronLeft,
  ChevronRight,
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  Download,
} from "lucide-react";

const PASS_MARK = 65;

const ageOptions = [
  { label: "18-24 years", points: 25 },
  { label: "25-32 years", points: 30 },
  { label: "33-39 years", points: 25 },
  { label: "40-44 years", points: 15 },
  { label: "45+ years", points: 0 },
];

const englishOptions = [
  { label: "Competent English (IELTS 6)", points: 0 },
  { label: "Proficient English (IELTS 7)", points: 10 },
  { label: "Superior English (IELTS 8)", points: 20 },
];

const overseasWorkOptions = [
  { label: "Less than 3 years", points: 0 },
  { label: "3-4 years", points: 5 },
  { label: "5-7 years", points: 10 },
  { label: "8+ years", points: 15 },
];

const australianWorkOptions = [
  { label: "Less than 1 year", points: 0 },
  { label: "1-2 years", points: 5 },
  { label: "3-4 years", points: 10 },
  { label: "5-7 years", points: 15 },
  { label: "8+ years", points: 20 },
];

const educationOptions = [
  { label: "Doctorate (PhD)", points: 20 },
  { label: "Bachelor/Masters degree", points: 15 },
  { label: "Diploma / Trade qualification", points: 10 },
  { label: "Award or qualification recognised by authority", points: 10 },
];

const specialistOptions = [
  { label: "No", points: 0 },
  { label: "Yes — Masters by research or Doctorate (STEM)", points: 10 },
];

const australianStudyOptions = [
  { label: "No", points: 0 },
  { label: "Yes — completed at least 2 years of study in Australia", points: 5 },
];

const partnerSkillsOptions = [
  { label: "No partner / Partner is Australian citizen/PR", points: 10 },
  {
    label: "Partner has competent English and suitable skills assessment",
    points: 10,
  },
  { label: "Partner has competent English only", points: 5 },
  { label: "Partner does not meet any criteria", points: 0 },
];

const communityLanguageOptions = [
  { label: "No", points: 0 },
  { label: "Yes — NAATI certified", points: 5 },
];

const professionalYearOptions = [
  { label: "No", points: 0 },
  { label: "Yes — completed a Professional Year in Australia", points: 5 },
];

const nominationOptions = [
  { label: "No nomination (Subclass 189 only)", points: 0 },
  { label: "State/territory nomination (Subclass 190)", points: 5 },
  { label: "State/territory regional nomination (Subclass 491)", points: 15 },
];

const steps = [
  "Age",
  "English",
  "Work Exp",
  "Education",
  "Extras",
  "Nomination",
];

interface StepConfig {
  title: string;
  description: string;
  options: { label: string; points: number }[];
  key: string;
}

const stepConfigs: StepConfig[] = [
  {
    title: "What is your age?",
    description: "Age at the time of invitation. Maximum 30 points.",
    options: ageOptions,
    key: "age",
  },
  {
    title: "English Language Ability",
    description: "Based on your IELTS, PTE, TOEFL iBT, or OET test results.",
    options: englishOptions,
    key: "english",
  },
  {
    title: "Work Experience",
    description: "Select your overseas and Australian work experience.",
    options: [],
    key: "work",
  },
  {
    title: "Education Qualification",
    description: "Your highest educational qualification recognised for migration.",
    options: educationOptions,
    key: "education",
  },
  {
    title: "Additional Points",
    description: "Specialist education, Australian study, partner skills, and more.",
    options: [],
    key: "extras",
  },
  {
    title: "State/Territory Nomination",
    description: "Select if you have or plan to get state or regional nomination.",
    options: nominationOptions,
    key: "nomination",
  },
];

export default function PointsCalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    age: -1,
    english: -1,
    overseasWork: -1,
    australianWork: -1,
    education: -1,
    specialist: -1,
    australianStudy: -1,
    partnerSkills: -1,
    communityLanguage: -1,
    professionalYear: -1,
    nomination: -1,
  });
  const [showResults, setShowResults] = useState(false);

  const breakdown = useMemo(() => {
    const items: { label: string; points: number }[] = [];
    if (selections.age >= 0)
      items.push({ label: "Age", points: ageOptions[selections.age].points });
    if (selections.english >= 0)
      items.push({ label: "English", points: englishOptions[selections.english].points });
    if (selections.overseasWork >= 0)
      items.push({
        label: "Overseas Work",
        points: overseasWorkOptions[selections.overseasWork].points,
      });
    if (selections.australianWork >= 0)
      items.push({
        label: "Australian Work",
        points: australianWorkOptions[selections.australianWork].points,
      });
    if (selections.education >= 0)
      items.push({ label: "Education", points: educationOptions[selections.education].points });
    if (selections.specialist >= 0)
      items.push({
        label: "Specialist Education",
        points: specialistOptions[selections.specialist].points,
      });
    if (selections.australianStudy >= 0)
      items.push({
        label: "Australian Study",
        points: australianStudyOptions[selections.australianStudy].points,
      });
    if (selections.partnerSkills >= 0)
      items.push({
        label: "Partner Skills",
        points: partnerSkillsOptions[selections.partnerSkills].points,
      });
    if (selections.communityLanguage >= 0)
      items.push({
        label: "Community Language",
        points: communityLanguageOptions[selections.communityLanguage].points,
      });
    if (selections.professionalYear >= 0)
      items.push({
        label: "Professional Year",
        points: professionalYearOptions[selections.professionalYear].points,
      });
    if (selections.nomination >= 0)
      items.push({
        label: "Nomination",
        points: nominationOptions[selections.nomination].points,
      });
    return items;
  }, [selections]);

  const totalPoints = useMemo(
    () => breakdown.reduce((sum, row) => sum + row.points, 0),
    [breakdown]
  );

  const handleSelect = (key: string, index: number) => {
    setSelections((prev) => ({ ...prev, [key]: index }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
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
      age: -1,
      english: -1,
      overseasWork: -1,
      australianWork: -1,
      education: -1,
      specialist: -1,
      australianStudy: -1,
      partnerSkills: -1,
      communityLanguage: -1,
      professionalYear: -1,
      nomination: -1,
    });
    setCurrentStep(0);
    setShowResults(false);
  };

  const renderOptionGroup = (
    title: string,
    options: { label: string; points: number }[],
    key: string,
    selectedIndex: number
  ) => (
    <div className="mb-6">
      {title && (
        <h4 className="text-sm font-medium text-primary/70 mb-3">{title}</h4>
      )}
      <div className="space-y-2">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(key, i)}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
              selectedIndex === i
                ? "bg-surface-container-high border-[rgba(0,30,64,0.12)] text-primary"
                : "bg-surface-container-low border-[rgba(195,198,209,0.25)] text-primary/65 hover:bg-surface-container-high"
            }`}
          >
            <span className="text-sm">{option.label}</span>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                selectedIndex === i
                  ? "bg-secondary/15 text-secondary"
                  : "bg-surface-container-low text-primary/50"
              }`}
            >
              {option.points > 0 ? `+${option.points}` : "0"} pts
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    const config = stepConfigs[currentStep];
    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
      >
        <h2
          className="text-xl sm:text-2xl font-bold text-primary mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {config.title}
        </h2>
        <p className="text-sm text-primary/60 mb-6">{config.description}</p>

        {/* Step-specific rendering */}
        {config.key === "work" && (
          <>
            {renderOptionGroup(
              "Overseas skilled employment",
              overseasWorkOptions,
              "overseasWork",
              selections.overseasWork
            )}
            {renderOptionGroup(
              "Australian skilled employment",
              australianWorkOptions,
              "australianWork",
              selections.australianWork
            )}
          </>
        )}

        {config.key === "extras" && (
          <>
            {renderOptionGroup(
              "Specialist education qualification",
              specialistOptions,
              "specialist",
              selections.specialist
            )}
            {renderOptionGroup(
              "Australian study requirement",
              australianStudyOptions,
              "australianStudy",
              selections.australianStudy
            )}
            {renderOptionGroup(
              "Partner skills",
              partnerSkillsOptions,
              "partnerSkills",
              selections.partnerSkills
            )}
            {renderOptionGroup(
              "Community language (NAATI)",
              communityLanguageOptions,
              "communityLanguage",
              selections.communityLanguage
            )}
            {renderOptionGroup(
              "Professional Year in Australia",
              professionalYearOptions,
              "professionalYear",
              selections.professionalYear
            )}
          </>
        )}

        {config.options.length > 0 && config.key !== "work" && config.key !== "extras" && (
          renderOptionGroup("", config.options, config.key, selections[config.key as keyof typeof selections])
        )}
      </motion.div>
    );
  };

  const renderResults = () => {
    const passed = totalPoints >= PASS_MARK;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Score circle */}
        <div className="mb-8">
          <div
            className={`w-36 h-36 rounded-full mx-auto flex flex-col items-center justify-center border-4 ${
              passed
                ? "border-secondary/45 bg-secondary/10"
                : "border-rose-500/40 bg-rose-500/10"
            }`}
          >
            <span
              className="text-4xl font-extrabold text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {totalPoints}
            </span>
            <span className="text-xs text-primary/60">points</span>
          </div>
        </div>

        {/* Pass/fail indicator */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
            passed
              ? "bg-secondary/12 text-secondary border border-secondary/25"
              : "bg-rose-500/15 text-rose-700 border border-rose-500/25"
          }`}
        >
          {passed ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          {passed
            ? `You meet the pass mark of ${PASS_MARK} points!`
            : `You need ${PASS_MARK - totalPoints} more points to meet the pass mark`}
        </div>

        {/* Eligibility per visa */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {SKILLED_VISA_THRESHOLDS.map((visa) => {
            const eligible = totalPoints >= visa.min;
            const competitive = totalPoints >= visa.typical;
            return (
              <div key={visa.visa} className="glass-card p-4">
                <span className="text-xs text-secondary font-medium mb-1 block uppercase tracking-wide">
                  Subclass {visa.visa}
                </span>
                <h4 className="text-sm font-bold text-primary mb-2">
                  {visa.label}
                </h4>
                <div
                  className={`text-xs font-medium ${
                    competitive
                      ? "text-secondary"
                      : eligible
                        ? "text-gold-400"
                        : "text-rose-400"
                  }`}
                >
                  {competitive
                    ? "✓ Competitive"
                    : eligible
                      ? "⚠ Eligible but low"
                      : "✗ Below minimum"}
                </div>
                <p className="text-xs text-primary/45 mt-1">
                  Typical invite: {visa.typical}+ pts
                </p>
              </div>
            );
          })}
        </div>

        {/* Breakdown */}
        <div className="glass-card p-6 text-left mb-6">
          <h3
            className="text-base font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Points Breakdown
          </h3>
          <div className="space-y-2">
            {breakdown.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center py-2 border-b border-[rgba(195,198,209,0.2)]"
              >
                <span className="text-sm text-primary/65">{item.label}</span>
                <span
                  className={`text-sm font-bold ${
                    item.points > 0 ? "text-secondary" : "text-primary/45"
                  }`}
                >
                  +{item.points}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3">
              <span className="text-sm font-bold text-primary">Total</span>
              <span className="text-lg font-bold text-gradient-teal">
                {totalPoints} points
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              generatePointsPDF({
                totalPoints,
                passMark: PASS_MARK,
                breakdown,
                visaEligibility: getVisaEligibilityForPdf(totalPoints),
              });
            }}
            className="glass-button px-6 py-3 text-sm inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={reset}
            className="glass-button-outline px-6 py-3 text-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-24 pb-16 lg:pt-32 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Calculator}
          title={
            <>
              Points <span className="text-gradient">Calculator</span>
            </>
          }
          description="Calculate your SkillSelect points score for Australian skilled migration visas (subclass 189, 190, 491)."
          descriptionClassName="text-primary/60 max-w-xl mx-auto"
        />

        {/* Points badge */}
        {!showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="glass-card px-6 py-3 flex items-center gap-3">
              <Award className="w-5 h-5 text-secondary" />
              <span className="text-sm text-primary/65">Current Score:</span>
              <span
                className="text-xl font-bold text-gradient-teal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {totalPoints}
              </span>
              <span className="text-xs text-primary/45">/ {PASS_MARK} min</span>
            </div>
          </motion.div>
        )}

        {/* Step indicator */}
        {!showResults && (
          <div className="mb-8">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
        )}

        {/* Content */}
        <div className="glass-card p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {showResults ? renderResults() : renderStepContent()}
          </AnimatePresence>

          {/* Navigation */}
          {!showResults && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-[rgba(195,198,209,0.25)]">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all ${
                  currentStep === 0
                    ? "text-primary/35 cursor-not-allowed"
                    : "text-primary/65 hover:text-primary hover:bg-surface-container-low"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button onClick={nextStep} className="glass-button px-6 py-2.5 text-sm flex items-center gap-2">
                {currentStep === steps.length - 1 ? "See Results" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
