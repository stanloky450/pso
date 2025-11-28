"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import axios from "axios";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaReply,
  FaSearch,
  FaFilter,
  FaArchive,
} from "react-icons/fa";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
}

export default function MessagesManagement() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, filter, searchTerm]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Apply status filter
    if (filter === "unread") {
      filtered = filtered.filter((m) => !m.read);
    } else if (filter === "read") {
      filtered = filtered.filter((m) => m.read);
    } else if (filter === "archived") {
      filtered = filtered.filter((m) => m.archived);
    } else {
      filtered = filtered.filter((m) => !m.archived);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  };

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message);
    setShowReply(false);

    // Mark as read if unread
    if (!message.read) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${message._id}`,
          { read: true },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchMessages();
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    }
  };

  const handleToggleRead = async (message: Message) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${message._id}`,
        { read: !message.read },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };

  const handleArchive = async (message: Message) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${message._id}`,
        { archived: !message.archived },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
      if (selectedMessage?._id === message._id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error archiving message:", error);
    }
  };

  const handleDelete = async (message: Message) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${message._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
      if (selectedMessage?._id === message._id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/reply`,
        {
          to: selectedMessage.email,
          subject: `Re: ${selectedMessage.subject || "Your message"}`,
          message: replyText,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reply sent successfully!");
      setReplyText("");
      setShowReply(false);
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Error sending reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.read && !m.archived).length;

  return (
    <ProtectedRoute requiredRole="editor">
      <div className="min-h-screen pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Messages <span className="gradient-text">Management</span>
            </h1>
            <p className="text-xl" style={{ color: "var(--text-muted)" }}>
              View and respond to contact form submissions
              {unreadCount > 0 && (
                <span className="ml-4 px-3 py-1 bg-red-600 text-white rounded-full text-sm">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="card mb-6">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px] relative">
                <FaSearch
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: "var(--secondary)" }}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--secondary)",
                    color: "var(--text)",
                  }}
                  placeholder="Search messages..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg ${
                    filter === "all" ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-4 py-2 rounded-lg ${
                    filter === "unread" ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter("read")}
                  className={`px-4 py-2 rounded-lg ${
                    filter === "read" ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Read
                </button>
                <button
                  onClick={() => setFilter("archived")}
                  className={`px-4 py-2 rounded-lg ${
                    filter === "archived" ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Archived
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: "var(--secondary)" }}>
                Messages ({filteredMessages.length})
              </h2>
              {filteredMessages.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                    No messages found
                  </p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message._id}
                    className={`card cursor-pointer hover:scale-[1.02] transition-all ${
                      selectedMessage?._id === message._id ? "ring-2 ring-secondary" : ""
                    }`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {message.read ? (
                          <FaEnvelopeOpen style={{ color: "var(--text-muted)" }} />
                        ) : (
                          <FaEnvelope style={{ color: "var(--secondary)" }} />
                        )}
                        <h3
                          className={`font-bold ${!message.read ? "text-lg" : ""}`}
                          style={{ color: "var(--text)" }}
                        >
                          {message.name}
                        </h3>
                      </div>
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
                      {message.email}
                    </p>
                    {message.subject && (
                      <p className="font-semibold mb-2" style={{ color: "var(--secondary)" }}>
                        {message.subject}
                      </p>
                    )}
                    <p className="line-clamp-2" style={{ color: "var(--text-muted)" }}>
                      {message.message}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Message Detail */}
            <div className="sticky top-24">
              {selectedMessage ? (
                <div className="card">
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                      {selectedMessage.name}
                    </h2>
                    <p style={{ color: "var(--text-muted)" }}>{selectedMessage.email}</p>
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {selectedMessage.subject && (
                    <div className="mb-4">
                      <h3 className="font-bold mb-1" style={{ color: "var(--text)" }}>
                        Subject:
                      </h3>
                      <p style={{ color: "var(--text-muted)" }}>{selectedMessage.subject}</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-bold mb-2" style={{ color: "var(--text)" }}>
                      Message:
                    </h3>
                    <p className="whitespace-pre-wrap" style={{ color: "var(--text-muted)" }}>
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap mb-6">
                    <button
                      onClick={() => setShowReply(!showReply)}
                      className="btn-primary flex items-center"
                    >
                      <FaReply className="mr-2" />
                      {showReply ? "Cancel Reply" : "Reply"}
                    </button>
                    <button
                      onClick={() => handleToggleRead(selectedMessage)}
                      className="btn-secondary flex items-center"
                    >
                      {selectedMessage.read ? <FaEnvelope className="mr-2" /> : <FaEnvelopeOpen className="mr-2" />}
                      Mark as {selectedMessage.read ? "Unread" : "Read"}
                    </button>
                    <button
                      onClick={() => handleArchive(selectedMessage)}
                      className="btn-secondary flex items-center"
                    >
                      <FaArchive className="mr-2" />
                      {selectedMessage.archived ? "Unarchive" : "Archive"}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>

                  {/* Reply Form */}
                  {showReply && (
                    <div className="border-t pt-6" style={{ borderColor: "var(--secondary)" }}>
                      <h3 className="font-bold mb-4" style={{ color: "var(--text)" }}>
                        Send Reply
                      </h3>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 mb-4"
                        style={{
                          backgroundColor: "var(--bg)",
                          borderColor: "var(--secondary)",
                          color: "var(--text)",
                        }}
                        rows={6}
                        placeholder="Type your reply..."
                      />
                      <button
                        onClick={handleReply}
                        disabled={loading || !replyText.trim()}
                        className="btn-primary disabled:opacity-50"
                      >
                        {loading ? "Sending..." : "Send Reply"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <FaEnvelope className="text-6xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
                  <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                    Select a message to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
