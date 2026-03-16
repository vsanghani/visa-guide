"use client";

import VisaDetailLayout from "@/components/visas/VisaDetailLayout";

export default function Visa186Page() {
  return (
    <VisaDetailLayout
      subclass="186"
      title="Employer Nomination Scheme (ENS) Visa"
      category="Employer Sponsored"
      color="from-rose-400 to-rose-500"
      overview="The Subclass 186 (Employer Nomination Scheme) visa is a permanent residence visa for skilled workers nominated by an Australian employer. It has three streams: the Temporary Residence Transition (TRT) stream for 482 visa holders who have worked for their employer for 2-3 years, the Direct Entry stream for applicants who haven't worked in Australia or are being directly recruited, and the Labour Agreement stream. No points test is required."
      eligibility={[
        "Be under 45 years of age at the time of application (exemptions may apply for TRT stream)",
        "Have a valid nomination from an approved Australian employer",
        "For TRT stream: have worked for your nominating employer for at least 2-3 years on a 482 (medium-term) visa",
        "For Direct Entry: have a suitable skills assessment and at least 3 years of relevant work experience",
        "Have at least Competent English (IELTS 6.0 in each band or equivalent)",
        "Your occupation must be on the Medium and Long-term Strategic Skills List (MLTSSL) for Direct Entry",
        "Meet health and character requirements",
      ]}
      process={[
        "Your employer must be an approved sponsor (or apply to become one)",
        "Your employer lodges a nomination application for the position",
        "You lodge your visa application — can be done concurrently with the nomination",
        "For Direct Entry: provide skills assessment, work experience evidence, and English test results",
        "For TRT: provide evidence of employment with the nominating employer on your 482 visa",
        "Complete health examinations and police clearances for all applicants",
        "Wait for a decision — permanent visa granted upon approval",
      ]}
      costs={[
        { item: "Primary applicant", amount: "AUD $4,640" },
        { item: "Partner (18+)", amount: "AUD $2,320" },
        { item: "Child (<18)", amount: "AUD $1,160" },
        { item: "Nomination application", amount: "AUD $540" },
        { item: "Skilling Australians Fund", amount: "AUD $3,000-5,000" },
      ]}
      processingTime="6 to 18 months"
      tips={[
        "TRT stream is the most popular pathway — it's for 482 (medium-term) holders who have worked for their employer for 2-3 years",
        "Direct Entry stream requires a skills assessment but no minimum time working for the employer in Australia",
        "The employer must pay the Skilling Australians Fund levy — this is a significant cost to negotiate",
        "Age exemption of 45+ may apply for TRT stream if you earned above the Fair Work high income threshold (AUD $167,500)",
        "This is a permanent visa — you receive PR status on grant, with pathway to citizenship after 1-4 years",
        "Ensure your employer is committed long-term before starting the process",
      ]}
    />
  );
}
