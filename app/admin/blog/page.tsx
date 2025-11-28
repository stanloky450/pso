"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ImageUpload from "@/components/admin/ImageUpload";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaEye } from "react-icons/fa";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  published: boolean;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Devotional",
    image: "",
    published: false,
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "script",
    "indent",
    "color",
    "background",
    "align",
    "link",
    "image",
    "video",
    "blockquote",
    "code-block",
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (editingPost) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${editingPost._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      fetchPosts();
      resetForm();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image || "",
      published: post.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Devotional",
      image: "",
      published: false,
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image: url });
  };

  return (
    <ProtectedRoute requiredRole="editor">
      <div className="min-h-screen pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
        <div className="section-container">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
                Blog <span className="gradient-text">Management</span>
              </h1>
              <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                Create and manage blog posts with rich text editor
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary flex items-center"
            >
              {showForm ? <FaTimes className="mr-2" /> : <FaPlus className="mr-2" />}
              {showForm ? "Cancel" : "New Post"}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="card mb-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--secondary)",
                      color: "var(--text)",
                    }}
                    placeholder="Enter post title"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--secondary)",
                      color: "var(--text)",
                    }}
                    rows={3}
                    placeholder="Brief description of the post"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--secondary)",
                      color: "var(--text)",
                    }}
                  >
                    <option value="Devotional">Devotional</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Testimony">Testimony</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                    Featured Image
                  </label>
                  <ImageUpload onUploadSuccess={handleImageUpload} />
                  {formData.image && (
                    <div className="mt-4">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full max-w-md rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block mb-4 font-semibold" style={{ color: "var(--text)" }}>
                    Content
                  </label>
                  <div className="bg-white rounded-lg">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                      modules={modules}
                      formats={formats}
                      style={{ height: "400px", marginBottom: "50px" }}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="mr-2 w-5 h-5"
                  />
                  <label htmlFor="published" className="font-semibold" style={{ color: "var(--text)" }}>
                    Publish immediately
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center disabled:opacity-50"
                  >
                    <FaSave className="mr-2" />
                    {loading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary flex items-center"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posts List */}
          <div className="grid gap-6">
            <h2 className="text-3xl font-bold" style={{ color: "var(--secondary)" }}>
              All Posts ({posts.length})
            </h2>
            {posts.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                  No posts yet. Create your first blog post!
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--secondary)" }}>
                        {post.title}
                      </h3>
                      <p className="mb-2" style={{ color: "var(--text-muted)" }}>
                        {post.excerpt}
                      </p>
                      <div className="flex gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
                        <span>Category: {post.category}</span>
                        <span>•</span>
                        <span>
                          Status:{" "}
                          <span
                            className={post.published ? "text-green-500" : "text-yellow-500"}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full max-w-sm rounded-lg mt-4"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
