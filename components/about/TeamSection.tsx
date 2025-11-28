"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaHeart, FaUsers } from "react-icons/fa";

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Family & <span className="gradient-text">Leadership Team</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Serving together with excellence and dedication
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Family Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="card bg-gradient-to-br from-primary-light to-primary group hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
            <FaHeart className="text-primary text-3xl" />
          </div>

          <h3 className="text-3xl font-bold text-center mb-4 gradient-text">
            Family
          </h3>

          <p className="text-text-muted text-center leading-relaxed mb-6">
            Pastor Sola Olukoya is blessed with a beautiful family who serve
            alongside him in ministry. Together, they exemplify the values of
            faith, love, and dedication to God's work.
          </p>

          <div className="bg-primary-dark rounded-lg p-6 text-center">
            <p className="text-text italic">
              "As for me and my house, we will serve the Lord"
            </p>
            <p className="text-secondary text-sm mt-2">Joshua 24:15</p>
          </div>
        </motion.div>

        {/* Leadership Team Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="card bg-gradient-to-br from-primary to-primary-light group hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
            <FaUsers className="text-primary text-3xl" />
          </div>

          <h3 className="text-3xl font-bold text-center mb-4 gradient-text">
            Leadership Team
          </h3>

          <p className="text-text-muted text-center leading-relaxed mb-6">
            A dedicated team of leaders committed to excellence, working
            together to fulfill the vision of raising disciples and
            transforming lives across the globe.
          </p>

          <div className="space-y-3">
            <div className="bg-primary-dark rounded-lg p-4">
              <p className="text-secondary font-semibold">Core Values</p>
              <p className="text-text-muted text-sm">
                Excellence • Integrity • Dedication • Innovation
              </p>
            </div>
            <div className="bg-primary-dark rounded-lg p-4">
              <p className="text-secondary font-semibold">Focus Areas</p>
              <p className="text-text-muted text-sm">
                Youth Ministry • Discipleship • Global Outreach
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <div className="card bg-gradient-to-r from-primary via-primary-light to-primary max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-text">
            Join Our Ministry
          </h3>
          <p className="text-text-muted mb-6">
            We're always looking for passionate individuals to join our team
            and make a difference in the lives of young people worldwide.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Get In Touch
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSection;
