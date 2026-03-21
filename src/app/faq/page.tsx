"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Accordion from "@/components/ui/Accordion";
import PageHeader from "@/components/ui/PageHeader";
import { HelpCircle } from "lucide-react";

const categories = [
  {
    name: "General",
    faqs: [
      {
        question: "What is the difference between a permanent and provisional visa?",
        answer:
          "A permanent visa (e.g., subclass 189, 190, 186) grants you permanent residency in Australia with full work rights, Medicare access, and a pathway to citizenship. A provisional visa (e.g., subclass 491) is temporary (usually 5 years) and may have conditions like living in a regional area. Provisional visas typically offer a pathway to permanent residency if you meet certain requirements during the visa period.",
      },
      {
        question: "What is SkillSelect and how does it work?",
        answer:
          "SkillSelect is an online system managed by the Department of Home Affairs where you submit an Expression of Interest (EOI) for skilled migration visas. You enter your skills, qualifications, and experience, and the system calculates your points. Based on regular invitation rounds, the department invites applicants with the highest points scores to apply for visas like the 189 and 190.",
      },
      {
        question: "How long does the entire migration process typically take?",
        answer:
          "The total timeline varies significantly depending on your pathway. For skilled migration (189/190), expect 6-18 months from EOI to visa grant. This excludes the time for skills assessment (1-3 months) and English testing. Employer-sponsored pathways (482 → 186) can take 3-5 years total. Regional pathways (491 → 191) typically take 4-6 years from initial visa to permanent residency.",
      },
      {
        question:
          "Do I need a migration agent to apply for an Australian visa?",
        answer:
          "No, it is not mandatory to use a migration agent. You can apply directly through the Department of Home Affairs. However, a registered migration agent (registered with MARA - Migration Agents Registration Authority) can help navigate complex situations, ensure your application is complete, and advise on the best strategy. If you use an agent, always verify they are registered with MARA.",
      },
    ],
  },
  {
    name: "Points Test",
    faqs: [
      {
        question: "What is the minimum points score to be eligible?",
        answer:
          "The minimum pass mark is 65 points for subclass 189, 190, and 491 visas. However, the minimum is rarely enough to receive an invitation for 189 visas — most occupations require 80-95+ points for a realistic chance. For 190 (with state nomination adding 5 points) and 491 (with regional nomination adding 15 points), the effective points needed from other categories are lower.",
      },
      {
        question: "How can I maximise my points score?",
        answer:
          "Key strategies include: (1) Improve your English — Superior English (IELTS 8+) gives 20 points, the single biggest boost. (2) Gain more work experience — Australian experience is worth up to 20 points. (3) Complete an Australian Professional Year program (5 points). (4) Get NAATI community language certification (5 points). (5) Consider a regional nomination (15 points for 491). (6) Partner skills can add 5-10 points. (7) Consider a specialist STEM qualification (10 points).",
      },
      {
        question: "What English tests are accepted for the points test?",
        answer:
          "The Department of Home Affairs accepts IELTS (Academic or General), PTE Academic, TOEFL iBT, OET, and Cambridge C1 Advanced. Competent English (IELTS 6 in each band) is the minimum requirement and gives 0 extra points. Proficient (IELTS 7) gives 10 points, and Superior (IELTS 8) gives 20 points. Test results are generally valid for 3 years from the test date.",
      },
      {
        question: "Does my partner's skills affect my points?",
        answer:
          "Yes. If your partner has a suitable skills assessment and Competent English, you can claim 10 points. If your partner has Competent English only (no skills assessment), you can claim 5 points. If your partner is an Australian citizen or permanent resident, or you are single/unpartnered, you automatically receive 10 points for the 'single or partner is Australian' factor.",
      },
    ],
  },
  {
    name: "Employer Sponsored",
    faqs: [
      {
        question: "Can I change employers while on a 482 visa?",
        answer:
          "Yes, you can change employers while on a 482 visa, but your new employer must also be an approved sponsor and must lodge a new nomination for your role. You should not start working for the new employer until the new nomination is approved (or at least lodged, if you have a bridging visa). Changing employers may affect your pathway to the 186 visa, as the TRT stream requires 2-3 years with the nominating employer.",
      },
      {
        question: "What is the Skilling Australians Fund (SAF) levy?",
        answer:
          "The SAF levy is paid by the sponsoring employer (not the visa applicant). For small businesses (turnover less than $10 million), it is AUD $1,200 per year for temporary visas and AUD $3,000 for permanent visas. For larger businesses, it is AUD $1,800 per year for temporary visas and AUD $5,000 for permanent visas. This cost is borne by the employer as part of their sponsorship obligations.",
      },
      {
        question:
          "What is the difference between the 482 short-term and medium-term streams?",
        answer:
          "The short-term stream (up to 2 years, one renewal onshore) is for occupations on the Short-term Skilled Occupation List (STSOL) and does NOT provide a direct pathway to permanent residency. The medium-term stream (up to 4 years) is for occupations on the Medium and Long-term Strategic Skills List (MLTSSL) and provides a pathway to the permanent 186 visa through the TRT stream after 2-3 years with the same employer.",
      },
    ],
  },
  {
    name: "Processing & Costs",
    faqs: [
      {
        question: "How much does skills assessment cost?",
        answer:
          "Skills assessment costs vary significantly depending on the assessing authority and your occupation. Typical ranges: ACS (IT professionals) AUD $500-550, Engineers Australia AUD $600-1,100, VETASSESS (various occupations) AUD $630-1,500, CPA/CA (Accountants) AUD $500-600, AITSL (Teachers) AUD $550-700. Some assessments also require additional verification fees. Check the relevant assessing authority's website for current fees.",
      },
      {
        question: "What health checks are required?",
        answer:
          "All visa applicants must undergo a health examination by a panel physician approved by the Department of Home Affairs. This typically includes a physical examination, chest X-ray (for applicants 11+ years), and blood tests (including HIV). The cost is usually AUD $300-500 per applicant. Additional tests may be required based on your medical history or country of origin. Health results are valid for 12 months.",
      },
      {
        question: "How can I track my visa application status?",
        answer:
          "You can track your application through your ImmiAccount on the Department of Home Affairs website. This shows the current status of your application (received, initial assessment, further assessment, finalised). You may also receive requests for additional information or documents through ImmiAccount. Processing times vary by visa subclass and are published on the DHA website, updated monthly.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="pt-24 pb-16 lg:pt-32 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={HelpCircle}
          title={
            <>
              Frequently Asked <span className="text-gradient">Questions</span>
            </>
          }
          description="Common questions about Australian skilled migration, points test, employer sponsorship, and visa processing."
          headingClassName="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-4"
          descriptionClassName="text-primary/60 max-w-2xl mx-auto"
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === i
                  ? "bg-surface-container-high text-secondary shadow-[var(--shadow-ambient)]"
                  : "bg-surface-container-low text-primary/65 hover:bg-surface-container-high hover:text-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Accordion items={categories[activeCategory].faqs} />
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-6 text-center"
        >
          <p className="text-xs text-primary/45 leading-relaxed">
            The information provided here is for general guidance only and may
            not reflect the most current visa requirements. Visa policies are
            subject to change by the Australian Department of Home Affairs.
            Always consult the{" "}
            <a
              href="https://immi.homeaffairs.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline"
            >
              official DHA website
            </a>{" "}
            or a registered migration agent for advice specific to your
            situation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
