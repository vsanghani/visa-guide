/**
 * Blog / News post data for Australian immigration updates.
 *
 * In production, this would be backed by a CMS (e.g., Contentful, Sanity)
 * or MDX files. For now, static data serves the same purpose.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];          // paragraphs
  category: BlogCategory;
  date: string;               // ISO date string
  readTime: number;           // minutes
  tags: string[];
};

export type BlogCategory =
  | "Policy Update"
  | "Invitation Round"
  | "State Nomination"
  | "Visa Processing"
  | "General";

export const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Policy Update": "from-rose-500 to-orange-500",
  "Invitation Round": "from-teal-500 to-emerald-500",
  "State Nomination": "from-violet-500 to-purple-500",
  "Visa Processing": "from-blue-500 to-cyan-500",
  General: "from-amber-500 to-yellow-500",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "skillselect-invitation-round-march-2026",
    title: "SkillSelect Invitation Round Results — March 2026",
    excerpt:
      "The Department of Home Affairs has released the latest invitation round data for subclass 189 and 491 visas, with notable score drops in several key occupations.",
    content: [
      "The Department of Home Affairs (DHA) has published the results of the March 2026 SkillSelect invitation round, revealing encouraging trends for skilled visa applicants.",
      "A total of 2,400 invitations were issued for the Subclass 189 (Skilled Independent) visa, with the minimum score dropping to 65 points for several ICT and engineering occupations. This marks the lowest cutoff since October 2024.",
      "For the Subclass 491 (Skilled Work Regional) visa, 1,800 invitations were issued. The family-sponsored stream saw consistent demand with scores ranging from 65 to 75 points across most occupations.",
      "Key highlights from this round include:\n• Software Engineers: 450 invitations, minimum 70 points\n• Registered Nurses: 380 invitations, minimum 65 points\n• Civil Engineers: 220 invitations, minimum 65 points\n• Accountants: 180 invitations, minimum 85 points",
      "Applicants are encouraged to submit their EOIs as early as possible, as invitation order is determined by points score first and then date of effect. The next round is expected in mid-April 2026.",
    ],
    category: "Invitation Round",
    date: "2026-03-15",
    readTime: 4,
    tags: ["SkillSelect", "Subclass 189", "Subclass 491", "Invitation Round"],
  },
  {
    slug: "nsw-updates-skilled-occupation-list-2026",
    title: "NSW Updates Its Skilled Occupation List for 2025-26",
    excerpt:
      "New South Wales has added 15 new occupations to its 190 nomination list and revised points requirements for several existing occupations.",
    content: [
      "The NSW Government has announced significant updates to its Skilled Occupation List for the 2025-26 program year, effective immediately. These changes impact both the Subclass 190 (Skilled Nominated) and Subclass 491 (Skilled Work Regional) visa pathways.",
      "Fifteen new occupations have been added to the eligible list, spanning healthcare, technology, and trades sectors. Notable additions include Cybersecurity Specialists, Data Engineers, and Occupational Therapists.",
      "The minimum points requirement for ICT occupations under Subclass 190 has been reduced from 90 to 80 points, reflecting a broader strategy to attract tech talent to NSW. Engineering professionals now require a minimum of 75 points, down from 85.",
      "Key changes to the NSW nomination criteria include:\n• Onshore applicants now receive priority processing\n• Work experience in regional NSW provides additional weighting\n• English language requirements remain at 'Superior' level (IELTS 8) for most occupations",
      "Applicants with existing EOIs are advised to update their applications to reflect these changes. New applicants should review the updated list on the NSW Government website before submitting their EOI through SkillSelect.",
    ],
    category: "State Nomination",
    date: "2026-03-10",
    readTime: 5,
    tags: ["NSW", "Subclass 190", "Occupation List", "State Nomination"],
  },
  {
    slug: "processing-times-update-q1-2026",
    title: "Visa Processing Times Update — Q1 2026",
    excerpt:
      "DHA has published updated processing times showing improvements for skilled visas but longer waits for employer-sponsored pathways.",
    content: [
      "The Department of Home Affairs has released its quarterly processing times update for Q1 2026, providing visibility into current wait times across major visa subclasses.",
      "Skilled independent visa (subclass 189) processing has improved significantly, with 75% of applications now finalised within 6 months, compared to 9 months in Q4 2025. This improvement is attributed to increased staffing and streamlined digital processing.",
      "Subclass 190 (Skilled Nominated) processing remains stable at 6-9 months for most applicants, though state-nominated applicants from priority occupation lists have seen faster turnaround times of 3-5 months.",
      "Employer-sponsored visas have experienced longer wait times:\n• Subclass 482 (TSS): 4-7 months (up from 3-5 months)\n• Subclass 186 (ENS): 8-14 months (up from 6-12 months)\n• Subclass 494 (SESR): 6-10 months (stable)",
      "DHA recommends applicants ensure all documentation is complete and accurate at the time of lodgement to avoid processing delays. Applications requiring additional health or character checks may take longer than the published timeframes.",
    ],
    category: "Visa Processing",
    date: "2026-03-05",
    readTime: 4,
    tags: ["Processing Times", "DHA", "Skilled Visas", "Employer Sponsored"],
  },
  {
    slug: "regional-migration-incentives-2026",
    title: "New Regional Migration Incentives Announced",
    excerpt:
      "The Australian Government has unveiled a new package of incentives to encourage skilled migrants to settle in regional areas.",
    content: [
      "The Australian Government has announced a comprehensive package of incentives aimed at encouraging skilled migrants to live and work in regional Australia, effective from 1 July 2026.",
      "The centrepiece of the package is a new 'Regional Priority Processing' pathway, which will fast-track visa applications for migrants who commit to living in designated regional areas for a minimum of 3 years.",
      "Key incentives include:\n• Priority visa processing for regional applicants (target: 3-month turnaround)\n• Additional 10 points for applicants with a job offer in a regional area\n• Reduced English language requirements for certain regional occupations\n• Expanded eligible occupation list for regional visa pathways",
      "Under the new framework, the definition of 'regional Australia' has been expanded to include additional postcodes in outer metropolitan areas of Sydney, Melbourne, and Brisbane. This broadens eligibility for the Subclass 491 visa.",
      "Migration agents have welcomed the package, noting that it addresses long-standing barriers to regional settlement. However, some have cautioned that the success of the program will depend on the availability of adequate services, infrastructure, and employment opportunities in regional communities.",
    ],
    category: "Policy Update",
    date: "2026-02-28",
    readTime: 5,
    tags: ["Regional", "Policy", "Subclass 491", "Incentives"],
  },
  {
    slug: "victoria-491-nomination-reopens",
    title: "Victoria Reopens Subclass 491 Nominations",
    excerpt:
      "After a temporary pause, Victoria has reopened its 491 regional nomination program with updated occupation lists and revised eligibility criteria.",
    content: [
      "The Victorian Government has announced the reopening of its Subclass 491 (Skilled Work Regional) nomination program after a temporary pause that began in January 2026.",
      "The reopening comes with several important changes to the eligibility criteria and nominated occupation list. The Victorian Government has conducted a comprehensive review of labour market needs to ensure the program targets genuine skill shortages.",
      "Updated eligibility requirements include:\n• Minimum 12 months of work experience in a nominated occupation (increased from 6 months)\n• Commitment to live and work in regional Victoria for the duration of the visa\n• Evidence of genuine interest in settling in regional Victoria",
      "The occupation list has been refreshed with a stronger emphasis on healthcare, agriculture, and education-related professions. ICT occupations remain on the list but with higher points thresholds.",
      "Applications will be accepted on a rolling basis through the Victorian Immigration website. Processing times for state nomination decisions are currently estimated at 8-12 weeks.",
    ],
    category: "State Nomination",
    date: "2026-02-20",
    readTime: 4,
    tags: ["Victoria", "Subclass 491", "Regional", "State Nomination"],
  },
  {
    slug: "english-language-test-changes-2026",
    title: "Changes to Accepted English Language Tests from July 2026",
    excerpt:
      "DHA will accept additional English test providers and introduce new score mapping tables affecting points calculations.",
    content: [
      "The Department of Home Affairs has announced changes to the list of accepted English language tests for skilled migration purposes, effective 1 July 2026.",
      "In addition to the existing IELTS, PTE Academic, TOEFL iBT, and Cambridge C1 Advanced tests, DHA will begin accepting the Duolingo English Test (DET) for certain visa subclasses. This expands access for applicants in regions where traditional test centres are limited.",
      "Revised score mapping tables reflect updated equivalency standards:\n• Superior English: IELTS 8.0 / PTE 79 / DET 130+\n• Proficient English: IELTS 7.0 / PTE 65 / DET 115\n• Competent English: IELTS 6.0 / PTE 50 / DET 100",
      "The points allocation for English language ability remains unchanged at 0, 10, and 20 points for Competent, Proficient, and Superior levels respectively.",
      "Applicants who have already lodged visa applications with existing test scores will not be affected by these changes. However, those yet to lodge are encouraged to consider the new test options if they better suit their circumstances. All test scores must be less than 3 years old at the time of invitation.",
    ],
    category: "Policy Update",
    date: "2026-02-15",
    readTime: 3,
    tags: ["English Test", "IELTS", "PTE", "Policy Change"],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getAllCategories(): BlogCategory[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}
