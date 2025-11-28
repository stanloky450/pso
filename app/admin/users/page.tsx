"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import axios from "axios";
import {
  FaUser,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaUserShield,
  FaUserEdit,
  FaUserCheck,
} from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  isActive: boolean;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as "admin" | "editor" | "user",
    isActive: true,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (editingUser) {
        // Update existing user
        const updateData = { ...formData };
        if (!updateData.password) {
          delete (updateData as any).password; // Don't update password if empty
        }
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${editingUser._id}`,
          updateData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new user
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      fetchUsers();
      resetForm();
      alert(editingUser ? "User updated successfully!" : "User created successfully!");
    } catch (error: any) {
      console.error("Error saving user:", error);
      alert(error.response?.data?.message || "Error saving user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      isActive: user.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      alert("User deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting user:", error);
      alert(error.response?.data?.message || "Error deleting user. Please try again.");
    }
  };

  const handleToggleActive = async (user: User) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}`,
        { isActive: !user.isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      isActive: true,
    });
    setEditingUser(null);
    setShowForm(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <FaUserShield className="text-red-500" />;
      case "editor":
        return <FaUserEdit className="text-blue-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-600";
      case "editor":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
        <div className="section-container">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
                User <span className="gradient-text">Management</span>
              </h1>
              <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                Manage user accounts, roles, and permissions (Admin Only)
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary flex items-center"
            >
              {showForm ? <FaTimes className="mr-2" /> : <FaUserPlus className="mr-2" />}
              {showForm ? "Cancel" : "New User"}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="card mb-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
                {editingUser ? "Edit User" : "Create New User"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--secondary)",
                        color: "var(--text)",
                      }}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--secondary)",
                        color: "var(--text)",
                      }}
                      placeholder="user@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                      Password {editingUser && "(Leave blank to keep current)"}
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--secondary)",
                        color: "var(--text)",
                      }}
                      placeholder="••••••••"
                      required={!editingUser}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold" style={{ color: "var(--text)" }}>
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value as any })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--secondary)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="user">User (Read-only)</option>
                      <option value="editor">Editor (Content Management)</option>
                      <option value="admin">Admin (Full Access)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="mr-2 w-5 h-5"
                  />
                  <label htmlFor="isActive" className="font-semibold" style={{ color: "var(--text)" }}>
                    Account is active
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center disabled:opacity-50"
                  >
                    <FaSave className="mr-2" />
                    {loading ? "Saving..." : editingUser ? "Update User" : "Create User"}
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

          {/* Users Table */}
          <div className="card">
            <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--secondary)" }}>
              All Users ({users.length})
            </h2>

            {users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl" style={{ color: "var(--text-muted)" }}>
                  No users found
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: "var(--secondary)" }}>
                      <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                        User
                      </th>
                      <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                        Email
                      </th>
                      <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                        Role
                      </th>
                      <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                        Status
                      </th>
                      <th className="text-left py-4 px-4" style={{ color: "var(--text)" }}>
                        Created
                      </th>
                      <th className="text-right py-4 px-4" style={{ color: "var(--text)" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b hover:bg-opacity-50"
                        style={{ borderColor: "var(--bg)" }}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {getRoleIcon(user.role)}
                            <span style={{ color: "var(--text)" }}>{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4" style={{ color: "var(--text-muted)" }}>
                          {user.email}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-white text-sm ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleActive(user)}
                            className={`px-3 py-1 rounded-full text-white text-sm ${
                              user.isActive ? "bg-green-600" : "bg-gray-600"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="py-4 px-4" style={{ color: "var(--text-muted)" }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleEdit(user)}
                              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center text-sm"
                            >
                              <FaEdit className="mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center text-sm"
                            >
                              <FaTrash className="mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Role Description */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <FaUserShield className="text-2xl text-red-500" />
                <h3 className="text-xl font-bold" style={{ color: "var(--secondary)" }}>
                  Admin
                </h3>
              </div>
              <p style={{ color: "var(--text-muted)" }}>
                Full access to all features including user management, system settings, and delete permissions.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <FaUserEdit className="text-2xl text-blue-500" />
                <h3 className="text-xl font-bold" style={{ color: "var(--secondary)" }}>
                  Editor
                </h3>
              </div>
              <p style={{ color: "var(--text-muted)" }}>
                Can create and edit content, manage blog posts, events, and view analytics.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <FaUser className="text-2xl text-gray-500" />
                <h3 className="text-xl font-bold" style={{ color: "var(--secondary)" }}>
                  User
                </h3>
              </div>
              <p style={{ color: "var(--text-muted)" }}>
                View-only access with personal profile management capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
