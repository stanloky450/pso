"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BookCard from "./BookCard";

const books = [
  {
    id: 1,
    title: "The G-Factor",
    subtitle: "Unlocking Your God-Given Potential",
    description:
      "Discover the divine factor that sets you apart. This transformative book reveals how to identify and maximize your God-given gifts and calling. Learn to operate in the grace that enables you to excel beyond natural abilities and walk in your true purpose.",
    price: "₦3,500",
    usdPrice: "$15",
    themes: ["Purpose", "Destiny", "Divine Potential", "Excellence"],
    pages: 256,
    isbn: "978-XXX-XXX-XXXX",
    features: [
      "Biblical principles for discovering your purpose",
      "Practical exercises for personal development",
      "Real-life testimonies of transformation",
      "Study guide for groups and individuals",
    ],
  },
  {
    id: 2,
    title: "Set-Time",
    subtitle: "Understanding God's Perfect Timing",
    description:
      "Learn to recognize and align with God's appointed times and seasons. A powerful guide to patience, preparation, and divine timing in your life. Discover how to wait productively, prepare purposefully, and step into your breakthrough at the right moment.",
    price: "₦3,000",
    usdPrice: "$12",
    themes: ["Timing", "Patience", "Divine Seasons", "Faith"],
    pages: 224,
    isbn: "978-XXX-XXX-XXXX",
    features: [
      "Understanding seasons in your spiritual journey",
      "How to prepare for your set time",
      "Recognizing signs of divine timing",
      "Testimonies of breakthrough at the right time",
    ],
  },
  {
    id: 3,
    title: "Overcoming Issues of Life",
    subtitle: "Victory Through Christ",
    description:
      "Practical wisdom and biblical principles for navigating life's challenges. Find strength, hope, and supernatural solutions to overcome every obstacle. This book equips you with spiritual weapons and practical strategies for victory in every area of life.",
    price: "₦4,000",
    usdPrice: "$18",
    themes: ["Victory", "Faith", "Resilience", "Breakthrough"],
    pages: 288,
    isbn: "978-XXX-XXX-XXXX",
    features: [
      "Biblical strategies for overcoming challenges",
      "Prayer points for specific life issues",
      "Faith confessions and declarations",
      "Practical steps to victory",
    ],
  },
];

const BooksGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="section-container bg-primary-dark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="gradient-text">Book Collection</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Invest in resources that will transform your life and ministry
        </p>
      </motion.div>

      <div className="space-y-12">
        {books.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} isInView={isInView} />
        ))}
      </div>

      {/* Bundle Offer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 card bg-gradient-to-br from-secondary via-secondary-dark to-secondary"
      >
        <div className="text-center text-primary">
          <h3 className="text-3xl font-bold mb-4">Complete Book Bundle</h3>
          <p className="text-lg mb-6 opacity-90">
            Get all three books at a special discounted price!
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-2xl line-through opacity-75">₦10,500</span>
            <span className="text-5xl font-bold">₦8,500</span>
          </div>
          <p className="text-sm opacity-90 mb-6">Save ₦2,000 on the bundle!</p>
          <button className="bg-primary hover:bg-primary-dark text-secondary font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105">
            Buy Complete Bundle
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default BooksGrid;
