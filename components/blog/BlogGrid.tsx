"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Masonry from "react-masonry-css";
import BlogCard from "./BlogCard";
import { FaFilter } from "react-icons/fa";

// Mock data - will be replaced with API data
const mockPosts = [
  {
    id: 1,
    title: "Walking in Purpose: Discovering God's Plan for Your Life",
    excerpt: "God has a unique plan and purpose for each of us. Learn how to discover and walk in your divine calling with confidence and clarity.",
    category: "Devotional",
    date: "2025-11-25",
    readTime: "5 min read",
    image: "/images/placeholder1.jpg",
  },
  {
    id: 2,
    title: "The Power of Faith in Difficult Times",
    excerpt: "When challenges arise, our faith becomes our anchor. Explore how to maintain unwavering faith during trials and tribulations.",
    category: "Teaching",
    date: "2025-11-22",
    readTime: "7 min read",
    image: "/images/placeholder2.jpg",
  },
  {
    id: 3,
    title: "Building a Strong Foundation: The Importance of Prayer",
    excerpt: "Prayer is the foundation of our relationship with God. Discover how to develop a powerful prayer life that transforms everything.",
    category: "Prophetic",
    date: "2025-11-20",
    readTime: "6 min read",
    image: "/images/placeholder3.jpg",
  },
  {
    id: 4,
    title: "The Spirit of Excellence in Ministry",
    excerpt: "Excellence is not an option but a requirement in God's kingdom. Learn how to cultivate a spirit of excellence in all you do.",
    category: "Teaching",
    date: "2025-11-18",
    readTime: "8 min read",
    image: "/images/placeholder4.jpg",
  },
  {
    id: 5,
    title: "Understanding Your Season",
    excerpt: "Every season has its purpose. Discover how to recognize and maximize the season you're in for Kingdom advancement.",
    category: "Devotional",
    date: "2025-11-15",
    readTime: "5 min read",
    image: "/images/placeholder5.jpg",
  },
  {
    id: 6,
    title: "The Authority of the Believer",
    excerpt: "As believers, we have been given authority through Christ. Learn how to walk in the fullness of your spiritual authority.",
    category: "Teaching",
    date: "2025-11-12",
    readTime: "10 min read",
    image: "/images/placeholder6.jpg",
  },
];

const categories = ["All", "Devotional", "Teaching", "Prophetic", "General"];

const BlogGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? mockPosts
      : mockPosts.filter((post) => post.category === selectedCategory);

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <section ref={ref} className="section-container bg-primary-dark">
      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center justify-center flex-wrap gap-4">
          <FaFilter className="text-secondary text-xl" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-secondary text-primary"
                  : "bg-primary-light text-text-muted hover:bg-primary hover:text-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {filteredPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} isInView={isInView} />
        ))}
      </Masonry>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-12"
      >
        <button className="btn-primary">Load More Posts</button>
      </motion.div>
    </section>
  );
};

export default BlogGrid;
