"use client";

import VisaDetailLayout from "@/components/visas/VisaDetailLayout";

export default function Visa491Page() {
  return (
    <VisaDetailLayout
      subclass="491"
      title="Skilled Work Regional (Provisional) Visa"
      category="Skilled Migration"
      color="from-emerald-400 to-emerald-500"
      overview="The Subclass 491 (Skilled Work Regional) visa is a provisional visa valid for 5 years, designed for skilled workers willing to live and work in regional Australia. You can be nominated by a state/territory government or sponsored by an eligible family member living in a regional area. This visa provides a pathway to permanent residency through the Subclass 191 visa after meeting income and residency requirements."
      eligibility={[
        "Be under 45 years of age at the time of invitation",
        "Have a suitable skills assessment for an occupation on the relevant occupation list",
        "Score at least 65 points on the points test (including 15 points for regional nomination)",
        "Be nominated by a state/territory government or sponsored by an eligible family member in a regional area",
        "Have at least Competent English (IELTS 6.0 or equivalent in all bands)",
        "Meet health and character requirements",
        "Commit to living and working in a designated regional area of Australia",
      ]}
      process={[
        "Determine if your occupation is on the relevant state's regional occupation list",
        "Obtain a skills assessment from the relevant assessing authority",
        "Achieve required English language test scores",
        "Apply for state/territory nomination for regional areas, or obtain family sponsorship",
        "Submit an Expression of Interest (EOI) via SkillSelect",
        "Receive and accept an invitation to apply",
        "Lodge your visa application within 60 days",
        "Provide supporting documents, complete health checks and police clearances",
      ]}
      costs={[
        { item: "Primary applicant", amount: "AUD $4,640" },
        { item: "Partner (18+)", amount: "AUD $2,320" },
        { item: "Child (<18)", amount: "AUD $1,160" },
        { item: "State nomination fee", amount: "AUD $0-330" },
        { item: "Skills assessment", amount: "AUD $300-1,500" },
      ]}
      processingTime="6 to 16 months"
      tips={[
        "You receive 15 points for regional nomination — significantly reducing the minimum points you need from other categories",
        "Regional areas include all of Australia except Sydney, Melbourne, and Brisbane (as of recent policy changes)",
        "After 3 years on a 491 visa, you can apply for the permanent Subclass 191 visa if you meet income requirements (AUD $53,900+/year)",
        "Many occupations unavailable for 189/190 are available on regional occupation lists",
        "Some states offer priority processing for applicants in critical skills areas",
        "Gold Coast, Perth, Adelaide, and Canberra are classified as regional areas",
      ]}
    />
  );
}
