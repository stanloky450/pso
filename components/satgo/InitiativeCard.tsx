"use client";

import { motion } from "framer-motion";
import { Initiative } from "@/types/satgo";
import {
  FaUsers,
  FaSeedling,
  FaGraduationCap,
  FaHandshake,
  FaChild,
  FaChurch,
  FaStar,
  FaTools,
  FaCalendarAlt,
  FaCross,
  FaLightbulb,
  FaBookReader,
} from "react-icons/fa";

interface InitiativeCardProps {
  initiative: Initiative;
  index: number;
  isInView: boolean;
  onClick: () => void;
}

const iconMap: { [key: string]: any } = {
  FaUsers,
  FaSeedling,
  FaGraduationCap,
  FaHandshake,
  FaChild,
  FaChurch,
  FaStar,
  FaTools,
  FaCalendarAlt,
  FaCross,
  FaLightbulb,
  FaBookReader,
};

const InitiativeCard = ({ initiative, index, isInView, onClick }: InitiativeCardProps) => {
  const Icon = iconMap[initiative.icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card cursor-pointer group relative overflow-hidden h-full"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${initiative.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Icon */}
      <div className={`w-16 h-16 bg-gradient-to-br ${initiative.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
        {Icon && <Icon className="text-white text-2xl" />}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-secondary-light transition-colors">
        {initiative.title}
      </h3>

      <p className="text-sm text-text-muted mb-3 font-semibold">
        {initiative.subtitle}
      </p>

      <p className="text-sm text-text-muted line-clamp-3 leading-relaxed">
        {initiative.shortDescription}
      </p>

      {/* Learn More Indicator */}
      <div className="mt-4 flex items-center text-secondary text-sm font-semibold group-hover:translate-x-2 transition-transform">
        <span>Learn More</span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default InitiativeCard;
