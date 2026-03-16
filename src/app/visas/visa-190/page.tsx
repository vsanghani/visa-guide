"use client";

import VisaDetailLayout from "@/components/visas/VisaDetailLayout";

export default function Visa190Page() {
  return (
    <VisaDetailLayout
      subclass="190"
      title="Skilled Nominated Visa"
      category="Skilled Migration"
      color="from-teal-400 to-teal-600"
      overview="The Subclass 190 (Skilled Nominated) visa is a permanent residence visa for skilled workers who are nominated by an Australian state or territory government. You receive an additional 5 points for the state nomination, making it accessible to applicants who may not meet the higher points thresholds for the 189 visa. Each state and territory has its own nomination criteria and occupation lists."
      eligibility={[
        "Be under 45 years of age at the time of invitation",
        "Have a suitable skills assessment for an occupation on the relevant state/territory occupation list",
        "Score at least 65 points on the points test (including 5 points for state nomination)",
        "Receive a nomination from an Australian state or territory government",
        "Have at least Competent English (IELTS 6.0 or equivalent in all bands)",
        "Meet health and character requirements",
        "Commit to living and working in the nominating state/territory for at least 2 years",
      ]}
      process={[
        "Research state/territory nomination requirements — each state has different criteria and occupation lists",
        "Obtain a skills assessment from the relevant assessing authority",
        "Achieve required English language test scores",
        "Apply for state/territory nomination directly through the relevant state government website",
        "If nominated, submit an Expression of Interest (EOI) via SkillSelect (or update existing EOI)",
        "Receive an invitation to apply from the Department of Home Affairs",
        "Lodge your visa application within 60 days of invitation",
        "Provide supporting documents and complete health examinations",
      ]}
      costs={[
        { item: "Primary applicant", amount: "AUD $4,640" },
        { item: "Partner (18+)", amount: "AUD $2,320" },
        { item: "Child (<18)", amount: "AUD $1,160" },
        { item: "State nomination fee", amount: "AUD $0-330" },
        { item: "Skills assessment", amount: "AUD $300-1,500" },
      ]}
      processingTime="6 to 11 months"
      tips={[
        "Each state has different occupation lists — check multiple states for your occupation",
        "NSW, Victoria, and Queensland are the most popular states with the highest competition",
        "Some states require you to already be living or working in the state to be eligible",
        "State nomination adds 5 points but comes with a 2-year residency obligation",
        "Regional areas within states may have lower thresholds and additional occupation options",
        "Keep checking state nomination programs as they open and close throughout the year",
      ]}
    />
  );
}
