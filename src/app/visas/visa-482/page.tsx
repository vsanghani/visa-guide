"use client";

import VisaDetailLayout from "@/components/visas/VisaDetailLayout";

export default function Visa482Page() {
  return (
    <VisaDetailLayout
      subclass="482"
      title="Temporary Skill Shortage (TSS) Visa"
      category="Employer Sponsored"
      color="from-gold-400 to-gold-600"
      overview="The Subclass 482 (Temporary Skill Shortage) visa allows Australian employers to sponsor skilled overseas workers when they cannot find suitably qualified Australian workers. It has multiple streams: the Short-term stream (up to 2 years), Medium-term stream (up to 4 years with a pathway to permanent residency), and the Labour Agreement stream. This is one of the most common pathways to eventually obtaining permanent residency in Australia."
      eligibility={[
        "Have a formal job offer from an approved Australian employer (sponsor)",
        "The employer must demonstrate Labour Market Testing (LMT) — that no suitable Australian worker was found",
        "Have a suitable skills assessment (if required for your occupation)",
        "Have at least 2 years of relevant work experience in your nominated occupation",
        "Meet the English language requirement (IELTS 5.0 overall, 4.5 in each band for short-term; IELTS 5.0 in each band for medium-term)",
        "The position must be on the Short-term Skilled Occupation List (STSOL) or Medium and Long-term Strategic Skills List (MLTSSL)",
        "Meet health and character requirements",
      ]}
      process={[
        "Your employer applies to become an approved sponsor with the Department of Home Affairs",
        "Your employer lodges a nomination application for the specific position",
        "You lodge your visa application (can be done concurrently with nomination)",
        "Provide evidence of qualifications, work experience, English skills, and skills assessment if required",
        "Complete health examinations and police clearances",
        "Wait for a decision — all three applications (sponsorship, nomination, visa) must be approved",
      ]}
      costs={[
        { item: "Primary applicant", amount: "AUD $1,455 - $3,035" },
        { item: "Partner (18+)", amount: "AUD $1,455 - $3,035" },
        { item: "Child (<18)", amount: "AUD $365 - $760" },
        { item: "Sponsorship application", amount: "AUD $420" },
        { item: "Nomination application", amount: "AUD $330" },
        { item: "Skilling Australians Fund", amount: "AUD $1,200-1,800/yr" },
      ]}
      processingTime="1 to 6 months"
      tips={[
        "The medium-term stream provides a direct pathway to the permanent 186 visa (TRT stream) after 2-3 years",
        "Short-term stream occupations can only be renewed once onshore and do not have a direct PR pathway",
        "Your employer bears significant costs (Skilling Australians Fund levy) — negotiate this upfront",
        "DAMA (Designated Area Migration Agreement) provides access to additional occupations in regional areas",
        "You can change employers on a 482 visa, but the new employer must also be an approved sponsor",
        "Start gathering your employment evidence early — detailed reference letters are critical",
      ]}
    />
  );
}
