import Link from "next/link";
import { FaUsers, FaBlog, FaEnvelope, FaCog } from "react-icons/fa";

export const metadata = {
  title: "Admin Dashboard | Pastor Sola Olukoya Ministry",
  description: "Manage your ministry website",
};

export default function AdminDashboard() {
  const adminCards = [
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
    <div className="min-h-screen pt-20 bg-primary-dark">
      <div className="section-container">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-xl text-text-muted">
            Manage your ministry website content and settings
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {adminCards.map((card) => (
            <Link key={card.title} href={card.href}>
              <div className="card group hover:scale-105 transition-all cursor-pointer h-full">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <card.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-secondary">
                  {card.title}
                </h3>
                <p className="text-text-muted">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="card bg-primary-light text-center">
            <div className="text-4xl font-bold text-secondary mb-2">0</div>
            <div className="text-text-muted">Total Posts</div>
          </div>
          <div className="card bg-primary-light text-center">
            <div className="text-4xl font-bold text-secondary mb-2">0</div>
            <div className="text-text-muted">New Messages</div>
          </div>
          <div className="card bg-primary-light text-center">
            <div className="text-4xl font-bold text-secondary mb-2">0</div>
            <div className="text-text-muted">Total Users</div>
          </div>
          <div className="card bg-primary-light text-center">
            <div className="text-4xl font-bold text-secondary mb-2">0</div>
            <div className="text-text-muted">Page Views</div>
          </div>
        </div>
      </div>
    </div>
  );
}
