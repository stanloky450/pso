"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Implement actual API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-6 gradient-text">Send Us a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-text-muted mb-2 font-semibold">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-primary-light border border-secondary/30 rounded-lg text-text focus:outline-none focus:border-secondary transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-text-muted mb-2 font-semibold">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-primary-light border border-secondary/30 rounded-lg text-text focus:outline-none focus:border-secondary transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-text-muted mb-2 font-semibold">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-primary-light border border-secondary/30 rounded-lg text-text focus:outline-none focus:border-secondary transition-colors"
            placeholder="What is this about?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-text-muted mb-2 font-semibold">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-primary-light border border-secondary/30 rounded-lg text-text focus:outline-none focus:border-secondary transition-colors resize-none"
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            "Sending..."
          ) : status === "success" ? (
            "Message Sent!"
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              Send Message
            </>
          )}
        </button>

        {status === "success" && (
          <p className="text-secondary text-center">
            Thank you! We'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-center">
            Oops! Something went wrong. Please try again.
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
