"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FaArrowRight, FaClock } from "react-icons/fa";

const LatestPosts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Mock data - will be replaced with real data from API
  const posts = [
    {
      id: 1,
      title: "Walking in Purpose: Discovering God's Plan for Your Life",
      excerpt:
        "God has a unique plan and purpose for each of us. Learn how to discover and walk in your divine calling...",
      category: "Devotional",
      date: "2025-11-25",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Power of Faith in Difficult Times",
      excerpt:
        "When challenges arise, our faith becomes our anchor. Explore how to maintain unwavering faith during trials...",
      category: "Teaching",
      date: "2025-11-22",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Building a Strong Foundation: The Importance of Prayer",
      excerpt:
        "Prayer is the foundation of our relationship with God. Discover how to develop a powerful prayer life...",
      category: "Prophetic",
      date: "2025-11-20",
      readTime: "6 min read",
    },
  ];

  return (
    <section ref={ref} className="section-container bg-primary-dark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Latest <span className="gradient-text">Posts & Devotionals</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Fresh insights and inspiration for your spiritual journey
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="card group hover:bg-primary transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-secondary bg-secondary/20 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-text-muted flex items-center">
                <FaClock className="mr-1" />
                {post.readTime}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-3 text-text group-hover:text-secondary transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-text-muted mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{post.date}</span>
              <Link
                href={`/blog/${post.id}`}
                className="text-secondary hover:text-secondary-light transition-colors flex items-center font-semibold"
              >
                Read More
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center"
      >
        <Link href="/blog" className="btn-primary inline-block">
          View All Posts
        </Link>
      </motion.div>
    </section>
  );
};

export default LatestPosts;
