"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaBook, FaCalendarAlt, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import Link from "next/link";

const QuickLinks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const links = [
    {
      icon: FaBook,
      title: "Sermons & Messages",
      description: "Access inspiring messages and teachings",
      href: "/blog?category=sermons",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      icon: FaCalendarAlt,
      title: "Upcoming Events",
      description: "Join us for life-changing events and programs",
      href: "/events",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
    {
      icon: FaHandHoldingHeart,
      title: "Support the Ministry",
      description: "Partner with us in reaching the world",
      href: "/give",
      color: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      icon: FaUsers,
      title: "SATGO Initiatives",
      description: "Discover our youth and young adult programs",
      href: "/satgo",
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
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
          Get <span className="gradient-text">Involved</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Explore the various ways you can connect and grow with us
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link, index) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={link.href}>
              <div className="card group cursor-pointer h-full hover:scale-105 transition-transform">
                <div className={`${link.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <link.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-secondary">
                  {link.title}
                </h3>
                <p className="text-text-muted text-sm">
                  {link.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
