"use client";

import { motion } from "framer-motion";
import { FaGlobeAmericas, FaUsers, FaRocket } from "react-icons/fa";

const SATGOHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-primary">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary-light rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
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
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-24 h-24 bg-secondary rounded-full mb-8 shadow-2xl"
          >
            <FaGlobeAmericas className="text-primary text-5xl" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow">
            <span className="gradient-text">SATGO</span> Office
          </h1>

          <p className="text-2xl md:text-3xl text-text-muted mb-4">
            Special Adviser to the General Overseer
          </p>

          <p className="text-xl md:text-2xl text-secondary font-semibold mb-8">
            Youth Affairs
          </p>

          <p className="text-lg md:text-xl text-text-muted max-w-4xl mx-auto leading-relaxed mb-12">
            Leading global youth initiatives that impact millions of young
            people worldwide. Empowering the next generation to live
            purposefully, serve passionately, and lead powerfully for Christ.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card bg-primary-light"
            >
              <FaGlobeAmericas className="text-secondary text-4xl mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-secondary mb-1">Global</h3>
              <p className="text-text-muted">Worldwide Impact</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card bg-primary-light"
            >
              <FaUsers className="text-secondary text-4xl mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-secondary mb-1">Millions</h3>
              <p className="text-text-muted">Lives Transformed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card bg-primary-light"
            >
              <FaRocket className="text-secondary text-4xl mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-secondary mb-1">12+</h3>
              <p className="text-text-muted">Key Initiatives</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SATGOHero;
