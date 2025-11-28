"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const MinistryHistory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const milestones = [
    {
      year: "Early Ministry",
      church: "Solomon's Porch",
      description: "Pioneered and established Solomon's Porch, laying the foundation for transformational ministry.",
    },
    {
      year: "Expansion Phase",
      church: "Recharge Centre",
      description: "Founded Recharge Centre, focusing on spiritual renewal and empowerment of believers.",
    },
    {
      year: "Growth Period",
      church: "Living Waters",
      description: "Established Living Waters, bringing life-giving ministry to the community.",
    },
    {
      year: "Development Era",
      church: "Grace Arena",
      description: "Launched Grace Arena, creating a platform for experiencing God's abundant grace.",
    },
    {
      year: "Consolidation",
      church: "Faith Chapel",
      description: "Founded Faith Chapel, building a strong community of faith and discipleship.",
    },
    {
      year: "Current Ministry",
      church: "Jesus Embassy",
      description: "Currently leading RCCG Jesus Embassy, serving as an ambassador for Christ and reaching the world.",
    },
  ];

  return (
    <section ref={ref} className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ministry <span className="gradient-text">Journey & Milestones</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          A legacy of pioneering churches and transforming communities
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-secondary via-secondary to-transparent" />

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <div className="card bg-primary-light hover:bg-primary transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-secondary font-bold text-lg">
                      {milestone.year}
                    </span>
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-3">
                    {milestone.church}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                <div className="w-6 h-6 bg-secondary rounded-full border-4 border-primary shadow-lg" />
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 border-2 border-secondary shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-center mb-4 gradient-text">
            6 Churches Pioneered
          </h3>
          <p className="text-text-muted text-center text-lg leading-relaxed">
            Through dedication, vision, and unwavering faith, Pastor Sola
            Olukoya has pioneered six thriving churches, each serving as a
            beacon of hope and transformation in their communities. His
            leadership has impacted countless lives and raised a generation
            of disciples.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MinistryHistory;
