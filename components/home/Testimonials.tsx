"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Youth Leader",
      testimony:
        "Pastor Sola's ministry has transformed my life. His teachings on purpose and destiny have helped me discover God's plan for my life and walk in it with confidence.",
      scripture: "Jeremiah 29:11",
    },
    {
      name: "Michael Adebayo",
      role: "University Student",
      testimony:
        "Through the YAYA program, I've grown tremendously in my faith. The mentorship and spiritual guidance have been invaluable in shaping my Christian walk.",
      scripture: "Proverbs 22:6",
    },
    {
      name: "Grace Okonkwo",
      role: "Young Professional",
      testimony:
        "The devotionals and messages from Pastor Sola have been a constant source of strength and inspiration. I've learned to trust God completely in every situation.",
      scripture: "Philippians 4:13",
    },
  ];

  const nextTestimony = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimony = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Lives <span className="gradient-text">Transformed</span>
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Testimonies of God's faithfulness and transforming power
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="card bg-gradient-to-br from-primary-light to-primary text-center py-12 px-8 relative"
        >
          <FaQuoteLeft className="text-secondary text-4xl mb-6 mx-auto opacity-50" />

          <p className="text-xl md:text-2xl text-text-muted mb-8 italic leading-relaxed">
            "{testimonials[currentIndex].testimony}"
          </p>

          <div className="mb-6">
            <p className="text-secondary text-lg font-semibold">
              {testimonials[currentIndex].scripture}
            </p>
          </div>

          <div>
            <h4 className="text-text font-bold text-lg">
              {testimonials[currentIndex].name}
            </h4>
            <p className="text-text-muted">
              {testimonials[currentIndex].role}
            </p>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevTestimony}
            className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary-dark text-primary flex items-center justify-center transition-all transform hover:scale-110"
          >
            <FaChevronLeft />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-secondary w-8"
                    : "bg-secondary/30 hover:bg-secondary/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimony}
            className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary-dark text-primary flex items-center justify-center transition-all transform hover:scale-110"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
