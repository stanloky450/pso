"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaGlobe, FaLink } from "react-icons/fa";

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
  category: string;
}

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

const EventModal = ({ event, onClose }: EventModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="card max-w-2xl w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--primary)",
            }}
          >
            <FaTimes />
          </button>

          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--primary)",
            }}
          >
            {event.category}
          </span>

          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
            {event.title}
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex items-center" style={{ color: "var(--text-muted)" }}>
              <FaCalendarAlt className="mr-3" style={{ color: "var(--secondary)" }} />
              <div>
                <div className="font-semibold">
                  {new Date(event.startDate).toLocaleDateString()} at{" "}
                  {new Date(event.startDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-sm">
                  to {new Date(event.endDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {event.isOnline ? (
              <div className="flex items-center" style={{ color: "var(--text-muted)" }}>
                <FaGlobe className="mr-3" style={{ color: "var(--secondary)" }} />
                <span>Online Event</span>
              </div>
            ) : event.location ? (
              <div className="flex items-center" style={{ color: "var(--text-muted)" }}>
                <FaMapMarkerAlt className="mr-3" style={{ color: "var(--secondary)" }} />
                <span>{event.location}</span>
              </div>
            ) : null}

            {event.meetingLink && (
              <div className="flex items-center" style={{ color: "var(--text-muted)" }}>
                <FaLink className="mr-3" style={{ color: "var(--secondary)" }} />
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "var(--secondary)" }}
                >
                  Join Meeting Link
                </a>
              </div>
            )}
          </div>

          <p className="mb-6 leading-relaxed" style={{ color: "var(--text)" }}>
            {event.description}
          </p>

          <button className="btn-primary w-full">Register for Event</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
