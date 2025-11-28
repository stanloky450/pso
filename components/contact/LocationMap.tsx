"use client";

import { motion } from "framer-motion";

const LocationMap = () => {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Find <span className="gradient-text">Us Here</span>
        </h2>

        {/* Map Placeholder - Replace with actual Google Maps embed */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-primary-light h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-secondary text-xl font-bold mb-2">
                Google Maps Integration
              </p>
              <p className="text-text-muted">
                Embed map showing RCCG Jesus Embassy location
              </p>
              <p className="text-text-muted text-sm mt-4">
                Replace this with actual Google Maps iframe or component
              </p>
            </div>
          </div>
        </div>

        {/* Directions Link */}
        <div className="text-center mt-6">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            Get Directions
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default LocationMap;
