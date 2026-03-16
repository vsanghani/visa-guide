"use client";

import VisaDetailLayout from "@/components/visas/VisaDetailLayout";

export default function Visa189Page() {
  return (
    <VisaDetailLayout
      subclass="189"
      title="Skilled Independent Visa"
      category="Skilled Migration"
      color="from-navy-400 to-navy-600"
      overview="The Subclass 189 (Skilled Independent) visa is a permanent residence visa for points-tested skilled workers who are not sponsored by an employer, state or territory, or family member. This is the most competitive skilled migration visa as it relies solely on your SkillSelect points score. You must be invited to apply through the SkillSelect system after submitting an Expression of Interest (EOI)."
      eligibility={[
        "Be under 45 years of age at the time of invitation",
        "Have a suitable skills assessment for an occupation on the Medium and Long-term Strategic Skills List (MLTSSL)",
        "Score at least 65 points on the points test (higher scores improve invitation chances)",
        "Have at least Competent English (IELTS 6.0 or equivalent in all bands)",
        "Meet health and character requirements",
        "Submit an Expression of Interest (EOI) via SkillSelect",
        "Be invited to apply by the Department of Home Affairs",
      ]}
      process={[
        "Obtain a skills assessment from the relevant assessing authority for your nominated occupation",
        "Take an English language test (IELTS, PTE, TOEFL iBT, or OET) and achieve the required scores",
        "Submit an Expression of Interest (EOI) through SkillSelect with your points claim",
        "Wait for an invitation to apply — invitations are issued in regular rounds based on highest points scores",
        "Lodge your visa application within 60 days of receiving an invitation",
        "Provide supporting documents including skills assessment, English test results, employment references, and police clearances",
        "Complete health examinations",
        "Wait for a decision — you can track your application status online",
      ]}
      costs={[
        { item: "Primary applicant", amount: "AUD $4,640" },
        { item: "Partner (18+)", amount: "AUD $2,320" },
        { item: "Child (<18)", amount: "AUD $1,160" },
        { item: "Skills assessment", amount: "AUD $300-1,500" },
        { item: "English test", amount: "AUD $300-400" },
      ]}
      processingTime="6 to 12 months"
      tips={[
        "Aim for 80+ points for a realistic chance of invitation in most occupations",
        "Pro-rata occupations (e.g., Accountants, IT) often require 90+ points",
        "Superior English (IELTS 8+) gives you 20 points — the single biggest points boost",
        "Keep your EOI updated with any changes to maintain accuracy",
        "Consider subclass 190 or 491 as alternatives if your 189 points are borderline",
      ]}
    />
  );
}
