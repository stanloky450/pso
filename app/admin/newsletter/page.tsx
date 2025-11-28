"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import axios from "axios";
import {
  FaPaperPlane,
  FaUsers,
  FaEnvelope,
  FaHistory,
  FaEye,
  FaTrash,
} from "react-icons/fa";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  subscribed: boolean;
  createdAt: string;
}

interface NewsletterHistory {
  _id: string;
  subject: string;
  sentTo: number;
  sentAt: string;
  status: string;
}

export default function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [history, setHistory] = useState<NewsletterHistory[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"compose" | "subscribers" | "history">("compose");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    fetchSubscribers();
    fetchHistory();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubscribers(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleSendNewsletter = async () => {
    if (!subject.trim() || !content.trim()) {
      alert("Please fill in both subject and content");
      return;
    }

    if (!confirm(`Send newsletter to ${activeSubscribers.length} subscribers?`)) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/send`,
        { subject, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Newsletter sent successfully!");
      setSubject("");
      setContent("");
      fetchHistory();
    } catch (error) {
      console.error("Error sending newsletter:", error);
      alert("Error sending newsletter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSubscribers();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  const activeSubscribers = subscribers.filter((s) => s.subscribed);

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Newsletter <span className="gradient-text">Management</span>
            </h1>
            <p className="text-xl" style={{ color: "var(--text-muted)" }}>
              Send newsletters and manage subscribers
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-green-600 to-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-2">Total Subscribers</p>
                  <p className="text-4xl font-bold text-white">{subscribers.length}</p>
                </div>
                <FaUsers className="text-6xl text-green-300 opacity-50" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-blue-600 to-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-2">Active Subscribers</p>
                  <p className="text-4xl font-bold text-white">{activeSubscribers.length}</p>
                </div>
                <FaEnvelope className="text-6xl text-blue-300 opacity-50" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-purple-600 to-purple-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 mb-2">Newsletters Sent</p>
                  <p className="text-4xl font-bold text-white">{history.length}</p>
                </div>
                <FaPaperPlane className="text-6xl text-purple-300 opacity-50" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setActiveTab("compose")}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === "compose" ? "btn-primary" : "btn-secondary"
              }`}
            >
              Compose Newsletter
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === "subscribers" ? "btn-primary" : "btn-secondary"
              }`}
            >
              Subscribers ({activeSubscribers.length})
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === "history" ? "btn-primary" : "btn-secondary"
              }`}
            >
              History
            </button>
          </div>

          {/* Compose Tab */}
          {activeTab === "compose" && (
            <div className="card">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                Compose Newsletter
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--secondary)",
                      color: "var(--text)",
                    }}
                    placeholder="Enter newsletter subject..."
                  />
                </div>

                <div>
                  <label className="block mb-4 font-semibold" style={{ color: "var(--text)" }}>
                    Email Content
                  </label>
                  <div className="bg-white rounded-lg">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      style={{ height: "400px", marginBottom: "50px" }}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSendNewsletter}
                    disabled={loading}
                    className="btn-primary flex items-center disabled:opacity-50"
                  >
                    <FaPaperPlane className="mr-2" />
                    {loading ? "Sending..." : `Send to ${activeSubscribers.length} Subscribers`}
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn-secondary flex items-center"
                  >
                    <FaEye className="mr-2" />
                    {showPreview ? "Hide Preview" : "Preview"}
                  </button>
                </div>

                {/* Preview */}
                {showPreview && (
                  <div className="mt-6 p-6 border-2 rounded-lg" style={{ borderColor: "var(--secondary)" }}>
                    <h3 className="text-xl font-bold mb-4" style={{ color: "var(--secondary)" }}>
                      Preview
                    </h3>
                    <div className="mb-4">
                      <strong style={{ color: "var(--text)" }}>Subject:</strong>
                      <p style={{ color: "var(--text-muted)" }}>{subject || "No subject"}</p>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text)" }}>Content:</strong>
                      <div
                        className="mt-2"
                        style={{ color: "var(--text-muted)" }}
                        dangerouslySetInnerHTML={{ __html: content || "No content" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === "subscribers" && (
            <div className="card">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                All Subscribers
              </h2>

              {subscribers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                    No subscribers yet
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2" style={{ borderColor: "var(--secondary)" }}>
                        <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                          Email
                        </th>
                        <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                          Name
                        </th>
                        <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                          Status
                        </th>
                        <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                          Subscribed On
                        </th>
                        <th className="text-right py-4 px-4" style={{ color: "var(--text)" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber) => (
                        <tr
                          key={subscriber._id}
                          className="border-b hover:bg-opacity-50"
                          style={{ borderColor: "var(--bg)" }}
                        >
                          <td className="py-4 px-4" style={{ color: "var(--text)" }}>
                            {subscriber.email}
                          </td>
                          <td className="py-4 px-4" style={{ color: "var(--text-muted)" }}>
                            {subscriber.name || "N/A"}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-sm ${
                                subscriber.subscribed ? "bg-green-600" : "bg-gray-600"
                              }`}
                            >
                              {subscriber.subscribed ? "Active" : "Unsubscribed"}
                            </span>
                          </td>
                          <td className="py-4 px-4" style={{ color: "var(--text-muted)" }}>
                            {new Date(subscriber.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleDeleteSubscriber(subscriber._id)}
                              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center ml-auto"
                            >
                              <FaTrash className="mr-1" />
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="card">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                Newsletter History
              </h2>

              {history.length === 0 ? (
                <div className="text-center py-12">
                  <FaHistory className="text-6xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
                  <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                    No newsletters sent yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div
                      key={item._id}
                      className="p-6 rounded-lg border-2"
                      style={{ borderColor: "var(--secondary)" }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                          {item.subject}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            item.status === "sent" ? "bg-green-600" : "bg-yellow-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="flex gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
                        <span>Sent to: {item.sentTo} subscribers</span>
                        <span>•</span>
                        <span>{new Date(item.sentAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
