"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import axios from "axios";

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  isOnline: boolean;
  category: string;
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events?limit=5`);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <div className="card text-center">
          <FaCalendarAlt className="text-4xl mx-auto mb-3" style={{ color: "var(--secondary)" }} />
          <p style={{ color: "var(--text-muted)" }}>No upcoming events at the moment</p>
        </div>
      ) : (
        events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--primary)",
                }}
              >
                {event.category}
              </span>
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: "var(--secondary)" }}>
                  {new Date(event.startDate).getDate()}
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {new Date(event.startDate).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-2" style={{ color: "var(--text)" }}>
              {event.title}
            </h3>

            <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--text-muted)" }}>
              {event.description}
            </p>

            <div className="flex items-center text-sm" style={{ color: "var(--text-muted)" }}>
              {event.isOnline ? (
                <>
                  <FaGlobe className="mr-2" />
                  <span>Online Event</span>
                </>
              ) : event.location ? (
                <>
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{event.location}</span>
                </>
              ) : null}
            </div>

            <div className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <FaCalendarAlt className="inline mr-2" />
              {new Date(event.startDate).toLocaleDateString()} -{" "}
              {new Date(event.startDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default UpcomingEvents;
