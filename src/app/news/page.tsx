"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import {
  Newspaper,
  Clock,
  ArrowRight,
  Tag,
} from "lucide-react";
import {
  blogPosts,
  getAllCategories,
  CATEGORY_COLORS,
  type BlogCategory,
} from "@/lib/blogPosts";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">(
    "All"
  );
  const categories = getAllCategories();

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-24 pb-16 lg:pt-32 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Newspaper}
          iconWrapperClassName="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-rose-500/20"
          title={
            <>
              Latest <span className="text-gradient">News</span>
            </>
          }
          description="Stay up to date with the latest Australian immigration policy changes, invitation rounds, and state nomination updates."
          descriptionClassName="text-primary/60 max-w-xl mx-auto"
          className="text-center mb-12"
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${activeCategory === "All"
                ? "bg-white/10 text-primary border-white/20"
                : "bg-white/5 text-primary/50 border-white/5 hover:text-primary/70 hover:bg-white/8"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${activeCategory === cat
                  ? "bg-white/10 text-primary border-white/20"
                  : "bg-white/5 text-primary/50 border-white/5 hover:text-primary/70 hover:bg-white/8"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Link href={`/news/${post.slug}`} className="block group">
                <article className="glass-card p-6 h-full flex flex-col hover:border-white/20 transition-all duration-300">
                  {/* Category badge & date */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-primary bg-gradient-to-r ${CATEGORY_COLORS[post.category]
                        }`}
                    >
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="text-xs text-primary/45">
                      {new Date(post.date).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-lg font-bold text-primary mb-2 group-hover:text-teal-300 transition-colors line-clamp-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-primary/60 mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="flex items-center gap-1.5 text-xs text-primary/45">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime} min read
                    </span>
                    <span className="flex items-center gap-1 text-xs text-teal-400 font-medium group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-primary/50">
              No posts found in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
