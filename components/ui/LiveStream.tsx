"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaPlay, FaUsers } from "react-icons/fa";

interface LiveStreamProps {
  youtubeVideoId?: string;
  isLive?: boolean;
  title?: string;
  viewerCount?: number;
}

const LiveStream = ({
  youtubeVideoId = "",
  isLive = false,
  title = "Live Service",
  viewerCount = 0,
}: LiveStreamProps) => {
  const [showStream, setShowStream] = useState(false);

  if (!youtubeVideoId && !isLive) {
    return (
      <div className="card text-center">
        <FaYoutube className="text-6xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
        <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
          No Live Stream Active
        </h3>
        <p style={{ color: "var(--text-muted)" }}>
          Check back during our service times for live streaming
        </p>
        <div className="mt-6">
          <h4 className="font-bold mb-2" style={{ color: "var(--secondary)" }}>
            Service Times:
          </h4>
          <p style={{ color: "var(--text-muted)" }}>
            Sunday: 8:00 AM & 10:00 AM WAT
            <br />
            Wednesday: 6:00 PM WAT
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {isLive && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2" />
            <span className="font-bold text-red-500 uppercase">Live Now</span>
          </div>
          {viewerCount > 0 && (
            <div className="flex items-center" style={{ color: "var(--text-muted)" }}>
              <FaUsers className="mr-2" />
              <span>{viewerCount.toLocaleString()} watching</span>
            </div>
          )}
        </div>
      )}

      <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
        {title}
      </h3>

      {!showStream ? (
        <div
          className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setShowStream(true)}
          style={{ backgroundColor: "var(--bg-dark)" }}
        >
          <img
            src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--primary)",
              }}
            >
              <FaPlay className="text-3xl ml-1" />
            </div>
          </div>
        </div>
      ) : (
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeVideoId}${isLive ? "?autoplay=1" : ""}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <a
          href={`https://youtube.com/watch?v=${youtubeVideoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center"
        >
          <FaYoutube className="mr-2" />
          Watch on YouTube
        </a>
      </div>
    </motion.div>
  );
};

export default LiveStream;
