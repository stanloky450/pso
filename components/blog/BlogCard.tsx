"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaClock, FaArrowRight } from "react-icons/fa";

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
  };
  index: number;
  isInView: boolean;
}

const BlogCard = ({ post, index, isInView }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="card group hover:bg-primary transition-all cursor-pointer h-full">
        {/* Image Placeholder */}
        <div className="bg-gradient-to-br from-primary-dark to-primary h-48 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
          <p className="text-secondary text-sm">Post Image</p>
        </div>

        {/* Category & Read Time */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-secondary bg-secondary/20 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-text-muted flex items-center">
            <FaClock className="mr-1" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-text group-hover:text-secondary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-muted mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-primary-light/30">
          <span className="text-sm text-text-muted">{post.date}</span>
          <Link
            href={`/blog/${post.id}`}
            className="text-secondary hover:text-secondary-light transition-colors flex items-center font-semibold text-sm"
          >
            Read More
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
