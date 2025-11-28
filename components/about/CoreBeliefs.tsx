"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaBible, FaPray, FaHeart, FaGlobe, FaUsers, FaFire } from "react-icons/fa";

const CoreBeliefs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const beliefs = [
    {
      icon: FaBible,
      title: "The Word of God",
      description:
        "We believe in the absolute authority and infallibility of the Holy Scriptures as the inspired Word of God.",
    },
    {
      icon: FaPray,
      title: "Salvation Through Christ",
      description:
        "Salvation is found in Jesus Christ alone through faith, grace, and His finished work on the cross.",
    },
    {
      icon: FaHeart,
      title: "The Holy Spirit",
      description:
        "We believe in the baptism of the Holy Spirit and the manifestation of His gifts in believers' lives.",
    },
    {
      icon: FaGlobe,
      title: "The Great Commission",
      description:
        "Every believer is called to share the Gospel and make disciples of all nations.",
    },
    {
      icon: FaUsers,
      title: "The Church",
      description:
        "The Church is the body of Christ, called to fellowship, worship, and serve together in unity.",
    },
    {
      icon: FaFire,
      title: "Holiness & Righteousness",
      description:
        "We are called to live holy lives, separated unto God and reflecting His character in all we do.",
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
          Core <span className="gradient-text">Beliefs & Doctrines</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Foundational truths that guide our ministry and teaching
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {beliefs.map((belief, index) => (
          <motion.div
            key={belief.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card group hover:bg-primary transition-all"
          >
            <div className="w-16 h-16 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <belief.icon className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-secondary">
              {belief.title}
            </h3>
            <p className="text-text-muted leading-relaxed">
              {belief.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12 bg-primary-light rounded-2xl p-8 border-2 border-secondary/30"
      >
        <h3 className="text-2xl font-bold text-secondary mb-4 text-center">
          Our Foundation: RCCG Doctrinal Statement
        </h3>
        <p className="text-text-muted text-center max-w-4xl mx-auto leading-relaxed">
          As part of the Redeemed Christian Church of God (RCCG), our ministry
          aligns with the fundamental doctrines of the church, emphasizing
          salvation, holiness, and the second coming of Christ. We are
          committed to biblical truth and sound teaching.
        </p>
      </motion.div>
    </section>
  );
};

export default CoreBeliefs;
