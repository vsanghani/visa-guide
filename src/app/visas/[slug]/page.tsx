import { notFound } from "next/navigation";
import VisaDetailLayout from "@/components/visas/VisaDetailLayout";
import { visaDetailsBySlug, VISA_SLUGS, type VisaSlug } from "@/data/visaDetails";

export function generateStaticParams() {
  return VISA_SLUGS.map((slug) => ({ slug }));
}

export default async function VisaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VISA_SLUGS.includes(slug as VisaSlug)) {
    notFound();
  }
  const content = visaDetailsBySlug[slug as VisaSlug];
  return <VisaDetailLayout {...content} />;
}
