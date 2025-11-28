"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const NewsletterSubscription = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/subscribe`,
        formData
      );

      setStatus("success");
      setMessage(data.message);
      setFormData({ name: "", email: "" });
    } catch (error: any) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Failed to subscribe");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card text-center"
        style={{ background: "linear-gradient(135deg, var(--secondary), var(--secondary-light))" }}
      >
        <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: "var(--primary)" }} />
        <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>
          Successfully Subscribed!
        </h3>
        <p style={{ color: "var(--primary)" }}>{message}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
      style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
    >
      <div className="text-center mb-6">
        <FaEnvelope className="text-5xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
        <h3 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Subscribe to Our Newsletter
        </h3>
        <p style={{ color: "var(--text-muted)" }}>
          Get the latest devotionals, teachings, and updates delivered to your inbox
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg"
            style={{
              backgroundColor: "var(--bg-light)",
              color: "var(--text)",
            }}
          />
        </div>

        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="Your Email Address *"
            className="w-full px-4 py-3 rounded-lg"
            style={{
              backgroundColor: "var(--bg-light)",
              color: "var(--text)",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full disabled:opacity-50"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe Now"}
        </button>

        {status === "error" && (
          <p className="text-red-500 text-center text-sm">{message}</p>
        )}
      </form>

      <p className="text-xs text-center mt-4" style={{ color: "var(--text-muted)" }}>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
};

export default NewsletterSubscription;
