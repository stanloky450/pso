"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FaBook, FaShoppingCart } from "react-icons/fa";

const PublishedBooks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const books = [
    {
      title: "The G-Factor",
      subtitle: "Unlocking Your God-Given Potential",
      description:
        "Discover the divine factor that sets you apart. This transformative book reveals how to identify and maximize your God-given gifts and calling.",
      themes: ["Purpose", "Destiny", "Divine Potential", "Excellence"],
    },
    {
      title: "Set-Time",
      subtitle: "Understanding God's Perfect Timing",
      description:
        "Learn to recognize and align with God's appointed times and seasons. A powerful guide to patience, preparation, and divine timing in your life.",
      themes: ["Timing", "Patience", "Divine Seasons", "Faith"],
    },
    {
      title: "Overcoming Issues of Life",
      subtitle: "Victory Through Christ",
      description:
        "Practical wisdom and biblical principles for navigating life's challenges. Find strength, hope, and supernatural solutions to overcome every obstacle.",
      themes: ["Victory", "Faith", "Resilience", "Breakthrough"],
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
          <span className="gradient-text">Published Books</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Life-transforming resources to guide your spiritual journey
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {books.map((book, index) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="card group hover:scale-105 transition-all"
          >
            {/* Book Cover Placeholder */}
            <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-lg p-8 mb-6 aspect-[3/4] flex flex-col items-center justify-center text-center shadow-xl">
              <FaBook className="text-primary text-5xl mb-4" />
              <h3 className="text-primary font-bold text-2xl mb-2">
                {book.title}
              </h3>
              <p className="text-primary-dark text-sm italic">
                {book.subtitle}
              </p>
            </div>

            <h4 className="text-xl font-bold text-text mb-3">
              {book.title}
            </h4>

            <p className="text-text-muted mb-4 leading-relaxed text-sm">
              {book.description}
            </p>

            <div className="mb-6">
              <p className="text-xs text-secondary font-semibold mb-2">
                KEY THEMES:
              </p>
              <div className="flex flex-wrap gap-2">
                {book.themes.map((theme) => (
                  <span
                    key={theme}
                    className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/books"
              className="btn-primary text-center w-full flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              Get This Book
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center"
      >
        <Link href="/books" className="btn-secondary inline-block">
          View All Books
        </Link>
      </motion.div>
    </section>
  );
};

export default PublishedBooks;
