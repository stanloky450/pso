"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import { useAuth } from "@/lib/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
              Admin Login
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              Sign in to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold" style={{ color: "var(--text-muted)" }}>
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: "var(--secondary)" }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--secondary)",
                    color: "var(--text)",
                  }}
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold" style={{ color: "var(--text-muted)" }}>
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: "var(--secondary)" }} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--secondary)",
                    color: "var(--text)",
                  }}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "var(--bg-dark)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--secondary)" }}>
              Demo Credentials:
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Admin: admin@pso.com / admin123
              <br />
              Editor: editor@pso.com / editor123
              <br />
              User: user@pso.com / user123
            </p>
          </div>

          <p className="text-xs text-center mt-6" style={{ color: "var(--text-muted)" }}>
            Protected area - Authorized access only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
