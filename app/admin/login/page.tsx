"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login:", formData);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-primary flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="card bg-primary-light">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
              <FaLock className="text-primary text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-text mb-2">Admin Login</h1>
            <p className="text-text-muted">
              Sign in to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-text-muted mb-2 font-semibold">
                Email Address
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-primary border border-secondary/30 rounded-lg text-text focus:outline-none focus:border-secondary transition-colors"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-text-muted mb-2 font-semibold">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-primary border border-secondary/30 rounded-lg text-text focus:outline-none focus:border-secondary transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <p className="text-text-muted text-center text-sm mt-6">
            Protected area - Authorized access only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
