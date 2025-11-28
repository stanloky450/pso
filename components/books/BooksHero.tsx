"use client";

import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";

const BooksHero = () => {
  return (
    <section className="relative py-20 bg-gradient-primary overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary-light rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6"
          >
            <FaBook className="text-primary text-3xl" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Published <span className="gradient-text">Books</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Life-transforming resources to guide your spiritual journey and
            empower you to live in purpose
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BooksHero;
