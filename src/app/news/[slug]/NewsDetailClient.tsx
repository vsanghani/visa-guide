"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Share2,
} from "lucide-react";
import { getPostBySlug, CATEGORY_COLORS } from "@/lib/blogPosts";

export default function NewsDetailClient({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-24 pb-16 lg:pt-32 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Category badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${
              CATEGORY_COLORS[post.category]
            } mb-4`}
          >
            <Tag className="w-3 h-3" />
            {post.category}
          </span>

          <h1
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>

          <p className="text-lg text-white/50 mb-6">{post.excerpt}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {post.content.map((paragraph, i) => {
            // Handle bullet-list paragraphs (lines starting with •)
            if (paragraph.includes("\n•")) {
              const [intro, ...bullets] = paragraph.split("\n");
              return (
                <div key={i}>
                  {intro && (
                    <p className="text-white/70 leading-relaxed mb-3">
                      {intro}
                    </p>
                  )}
                  <ul className="space-y-2 pl-1">
                    {bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-white/60 text-sm"
                      >
                        <span className="text-teal-400 mt-0.5">•</span>
                        <span>{bullet.replace(/^• ?/, "")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            return (
              <p key={i} className="text-white/70 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </motion.article>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 pt-8 border-t border-white/5"
        >
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs bg-white/5 text-white/40 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Back to news CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/news"
            className="glass-button-outline px-6 py-3 text-sm inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            All News & Updates
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
