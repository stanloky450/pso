"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaComment, FaPaperPlane } from "react-icons/fa";
import axios from "axios";

interface Comment {
  _id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  parentId: string | null;
}

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}`);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
        postId,
        ...formData,
      });

      setStatus("success");
      setFormData({ name: "", email: "", comment: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="card mt-12">
      <div className="flex items-center mb-6">
        <FaComment className="text-3xl mr-3" style={{ color: "var(--secondary)" }} />
        <h3 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comments List */}
      <div className="space-y-6 mb-8">
        {comments.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment, index) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg"
              style={{ backgroundColor: "var(--bg-dark)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold" style={{ color: "var(--secondary)" }}>
                  {comment.name}
                </h4>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p style={{ color: "var(--text)" }}>{comment.comment}</p>
            </motion.div>
          ))
        )}
      </div>

      {/* Comment Form */}
      <div className="border-t pt-8" style={{ borderColor: "var(--secondary)" }}>
        <h4 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Leave a Comment
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border-2"
                style={{
                  backgroundColor: "var(--bg-dark)",
                  borderColor: "var(--secondary)",
                  color: "var(--text)",
                }}
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border-2"
                style={{
                  backgroundColor: "var(--bg-dark)",
                  borderColor: "var(--secondary)",
                  color: "var(--text)",
                }}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
              Comment *
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border-2 resize-none"
              style={{
                backgroundColor: "var(--bg-dark)",
                borderColor: "var(--secondary)",
                color: "var(--text)",
              }}
              placeholder="Share your thoughts..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            <FaPaperPlane className="mr-2" />
            {status === "loading" ? "Submitting..." : "Post Comment"}
          </button>

          {status === "success" && (
            <p className="text-green-500">
              Comment submitted! It will appear after approval.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500">
              Failed to submit comment. Please try again.
            </p>
          )}
        </form>

        <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
          Your email will not be published. All comments are moderated before appearing.
        </p>
      </div>
    </section>
  );
};

export default CommentsSection;
