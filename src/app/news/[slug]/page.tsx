import { blogPosts } from "@/lib/blogPosts";
import NewsDetailClient from "./NewsDetailClient";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsDetailClient slug={slug} />;
}
