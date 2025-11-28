"use client";

import Link from "next/link";
import { FaUsers, FaBlog, FaEnvelope, FaCog, FaChartLine, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useAuth } from "@/lib/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    posts: 0,
    messages: 0,
    users: 0,
    subscribers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      // Fetch stats from API
      // This is a placeholder - implement actual API calls
      setStats({
        posts: 0,
        messages: 0,
        users: 0,
        subscribers: 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <ProtectedRoute>
  const adminCards = [
    {
      title: "Analytics",
      description: "View website statistics and insights",
      icon: FaChartLine,
      href: "/admin/analytics",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Manage Blog Posts",
      description: "Create, edit, and publish blog posts and devotionals",
      icon: FaBlog,
      href: "/admin/blog",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Messages",
      description: "View and respond to contact form submissions",
      icon: FaEnvelope,
      href: "/admin/messages",
      color: "from-green-500 to-green-700",
    },
    {
      title: "Events",
      description: "Manage events and calendar",
      icon: FaCalendarAlt,
      href: "/admin/events",
      color: "from-pink-500 to-pink-700",
    },
    {
      title: "Users",
      description: "Manage user accounts and permissions",
      icon: FaUsers,
      href: "/admin/users",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Settings",
      description: "Configure site settings and preferences",
      icon: FaCog,
      href: "/admin/settings",
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
        <div className="section-container">
          <div className="mb-12 flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
                Admin <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                Welcome back, <span style={{ color: "var(--secondary)" }}>{user?.name}</span> ({user?.role})
              </p>
            </div>
            <button
              onClick={logout}
              className="btn-secondary flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                {stats.posts}
              </div>
              <div style={{ color: "var(--text-muted)" }}>Total Posts</div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                {stats.messages}
              </div>
              <div style={{ color: "var(--text-muted)" }}>New Messages</div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                {stats.users}
              </div>
              <div style={{ color: "var(--text-muted)" }}>Total Users</div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                {stats.subscribers}
              </div>
              <div style={{ color: "var(--text-muted)" }}>Subscribers</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminCards.map((card) => (
              <Link key={card.title} href={card.href}>
                <div className="card group hover:scale-105 transition-all cursor-pointer h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <card.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)" }}>{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
