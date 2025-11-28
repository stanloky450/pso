"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaEye, FaBullseye, FaHeart } from "react-icons/fa";

const MissionVision = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const items = [
    {
      icon: FaBullseye,
      title: "Mission",
      description:
        "To raise disciples who are passionate about God, equipped for service, and committed to transforming their generation through the power of the Gospel.",
    },
    {
      icon: FaEye,
      title: "Vision",
      description:
        "A generation of young people fully devoted to Christ, living purposefully, and impacting their world with the love and truth of God's word.",
    },
    {
      icon: FaHeart,
      title: "Core Values",
      description:
        "Excellence, Integrity, Faith, Service, and Discipleship - These are the pillars upon which we build lives and transform communities.",
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
          Our <span className="gradient-text">Mission & Vision</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Building a legacy of faith, purpose, and transformation
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="card text-center group hover:bg-primary transition-all"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6 group-hover:scale-110 transition-transform">
              <item.icon className="text-primary text-3xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-secondary">
              {item.title}
            </h3>
            <p className="text-text-muted leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MissionVision;
