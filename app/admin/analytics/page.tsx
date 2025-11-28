"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import axios from "axios";
import {
  FaUsers,
  FaBlog,
  FaEnvelope,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaComment,
  FaNewspaper,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";

interface Analytics {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalMessages: number;
  unreadMessages: number;
  totalUsers: number;
  activeUsers: number;
  totalSubscribers: number;
  totalEvents: number;
  upcomingEvents: number;
  totalComments: number;
  approvedComments: number;
  recentPosts: Array<{
    _id: string;
    title: string;
    views: number;
    likes: number;
    comments: number;
    createdAt: string;
  }>;
  userGrowth: Array<{
    month: string;
    count: number;
  }>;
  subscriberGrowth: Array<{
    month: string;
    count: number;
  }>;
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analytics?range=${timeRange}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute requiredRole="editor">
        <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: "var(--bg-dark)" }}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: "var(--secondary)" }} />
            <p style={{ color: "var(--text)" }}>Loading analytics...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="editor">
      <div className="min-h-screen pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
        <div className="section-container">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
                Analytics <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                Track website statistics and performance metrics
              </p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border-2"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--secondary)",
                color: "var(--text)",
              }}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-blue-600 to-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-2">Total Posts</p>
                  <p className="text-4xl font-bold text-white">{analytics?.totalPosts || 0}</p>
                  <p className="text-blue-200 text-sm mt-2">
                    {analytics?.publishedPosts || 0} Published • {analytics?.draftPosts || 0} Drafts
                  </p>
                </div>
                <FaBlog className="text-6xl text-blue-300 opacity-50" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-green-600 to-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-2">Messages</p>
                  <p className="text-4xl font-bold text-white">{analytics?.totalMessages || 0}</p>
                  <p className="text-green-200 text-sm mt-2">
                    {analytics?.unreadMessages || 0} Unread
                  </p>
                </div>
                <FaEnvelope className="text-6xl text-green-300 opacity-50" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-purple-600 to-purple-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 mb-2">Total Users</p>
                  <p className="text-4xl font-bold text-white">{analytics?.totalUsers || 0}</p>
                  <p className="text-purple-200 text-sm mt-2">
                    {analytics?.activeUsers || 0} Active
                  </p>
                </div>
                <FaUsers className="text-6xl text-purple-300 opacity-50" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-orange-600 to-orange-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 mb-2">Subscribers</p>
                  <p className="text-4xl font-bold text-white">{analytics?.totalSubscribers || 0}</p>
                  <p className="text-orange-200 text-sm mt-2">
                    Newsletter Members
                  </p>
                </div>
                <FaNewspaper className="text-6xl text-orange-300 opacity-50" />
              </div>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                Events & Engagement
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-2xl" style={{ color: "var(--secondary)" }} />
                    <div>
                      <p className="font-semibold" style={{ color: "var(--text)" }}>Total Events</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {analytics?.upcomingEvents || 0} Upcoming
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: "var(--secondary)" }}>
                    {analytics?.totalEvents || 0}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                  <div className="flex items-center gap-3">
                    <FaComment className="text-2xl" style={{ color: "var(--secondary)" }} />
                    <div>
                      <p className="font-semibold" style={{ color: "var(--text)" }}>Comments</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {analytics?.approvedComments || 0} Approved
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: "var(--secondary)" }}>
                    {analytics?.totalComments || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full btn-primary text-left flex items-center justify-between">
                  <span>View All Messages</span>
                  <FaEnvelope />
                </button>
                <button className="w-full btn-secondary text-left flex items-center justify-between">
                  <span>Manage Posts</span>
                  <FaBlog />
                </button>
                <button className="w-full btn-secondary text-left flex items-center justify-between">
                  <span>Manage Events</span>
                  <FaCalendarAlt />
                </button>
                <button className="w-full btn-secondary text-left flex items-center justify-between">
                  <span>View Subscribers</span>
                  <FaNewspaper />
                </button>
              </div>
            </div>
          </div>

          {/* Top Performing Posts */}
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FaTrophy className="text-3xl" style={{ color: "var(--secondary)" }} />
              <h3 className="text-2xl font-bold" style={{ color: "var(--secondary)" }}>
                Top Performing Posts
              </h3>
            </div>

            {!analytics?.recentPosts || analytics.recentPosts.length === 0 ? (
              <p className="text-center py-8" style={{ color: "var(--text-muted)" }}>
                No posts available yet
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: "var(--secondary)" }}>
                      <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                        Post Title
                      </th>
                      <th className="text-center py-4 px-4" style={{ color: "var(--text)" }}>
                        <FaEye className="inline mr-2" />
                        Views
                      </th>
                      <th className="text-center py-4 px-4" style={{ color: "var(--text)" }}>
                        <FaHeart className="inline mr-2" />
                        Likes
                      </th>
                      <th className="text-center py-4 px-4" style={{ color: "var(--text)" }}>
                        <FaComment className="inline mr-2" />
                        Comments
                      </th>
                      <th className="text-center py-4 px-4" style={{ color: "var(--text)" }}>
                        Published
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentPosts.map((post, index) => (
                      <tr
                        key={post._id}
                        className="border-b hover:bg-opacity-50"
                        style={{ borderColor: "var(--bg)" }}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {index < 3 && (
                              <span className="text-2xl">
                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                              </span>
                            )}
                            <span style={{ color: "var(--text)" }}>{post.title}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center" style={{ color: "var(--text-muted)" }}>
                          {post.views || 0}
                        </td>
                        <td className="py-4 px-4 text-center" style={{ color: "var(--text-muted)" }}>
                          {post.likes || 0}
                        </td>
                        <td className="py-4 px-4 text-center" style={{ color: "var(--text-muted)" }}>
                          {post.comments || 0}
                        </td>
                        <td className="py-4 px-4 text-center" style={{ color: "var(--text-muted)" }}>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Growth Charts Placeholder */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                User Growth
              </h3>
              <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
                <FaChartLine className="text-6xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
                <p>Chart visualization coming soon</p>
                <p className="text-sm mt-2">Integrate with Chart.js or Recharts for detailed graphs</p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                Subscriber Growth
              </h3>
              <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
                <FaChartLine className="text-6xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
                <p>Chart visualization coming soon</p>
                <p className="text-sm mt-2">Integrate with Chart.js or Recharts for detailed graphs</p>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                Average Engagement Rate
              </p>
              <p className="text-4xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                ---%
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Coming Soon
              </p>
            </div>

            <div className="card text-center">
              <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                Newsletter Open Rate
              </p>
              <p className="text-4xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                ---%
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Coming Soon
              </p>
            </div>

            <div className="card text-center">
              <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                Event Attendance Rate
              </p>
              <p className="text-4xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                ---%
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Coming Soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
