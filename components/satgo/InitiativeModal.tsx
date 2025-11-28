"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Initiative } from "@/types/satgo";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
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

interface InitiativeModalProps {
  initiative: Initiative | null;
  onClose: () => void;
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

const InitiativeModal = ({ initiative, onClose }: InitiativeModalProps) => {
  if (!initiative) return null;

  const Icon = iconMap[initiative.icon];

  return (
    <AnimatePresence>
      {initiative && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-primary rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-secondary/30"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${initiative.color} p-8 relative rounded-t-2xl`}>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaTimes className="text-white text-xl" />
                </button>

                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    {Icon && <Icon className="text-4xl" style={{ color: '#0c0c69' }} />}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {initiative.title}
                    </h2>
                    <p className="text-white/90 text-lg font-semibold">
                      {initiative.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-secondary mb-4">
                    Overview
                  </h3>
                  <p className="text-text-muted leading-relaxed text-lg">
                    {initiative.fullDescription}
                  </p>
                </div>

                {/* Key Points */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-secondary mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {initiative.keyPoints.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <FaCheckCircle className="text-secondary mt-1 mr-3 flex-shrink-0" />
                        <span className="text-text-muted leading-relaxed">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div className="bg-primary-light rounded-xl p-6 border-2 border-secondary/20">
                  <h3 className="text-xl font-bold text-secondary mb-3 flex items-center">
                    <span className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                    Impact
                  </h3>
                  <p className="text-text-muted leading-relaxed text-lg">
                    {initiative.impact}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                  <a
                    href="/contact"
                    className="btn-primary inline-block"
                  >
                    Get Involved
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InitiativeModal;
