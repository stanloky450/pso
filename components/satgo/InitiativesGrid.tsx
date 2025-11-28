"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import InitiativeCard from "./InitiativeCard";
import InitiativeModal from "./InitiativeModal";
import { initiatives } from "@/lib/satgoData";
import { Initiative } from "@/types/satgo";

const InitiativesGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);

  return (
    <section ref={ref} className="section-container bg-primary-dark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="gradient-text">Key Initiatives</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Discover the transformative programs impacting young lives globally
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {initiatives.map((initiative, index) => (
          <InitiativeCard
            key={initiative.id}
            initiative={initiative}
            index={index}
            isInView={isInView}
            onClick={() => setSelectedInitiative(initiative)}
          />
        ))}
      </div>

      {/* Modal */}
      <InitiativeModal
        initiative={selectedInitiative}
        onClose={() => setSelectedInitiative(null)}
      />
    </section>
  );
};

export default InitiativesGrid;
