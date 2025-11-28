import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { FaCog } from "react-icons/fa";

export const metadata = {
  title: "Settings | Admin Dashboard",
  description: "Manage website settings and preferences",
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <FaCog className="text-4xl mr-4" style={{ color: "var(--secondary)" }} />
            <h1 className="text-5xl font-bold" style={{ color: "var(--text)" }}>
              Settings
            </h1>
          </div>
          <p className="text-xl" style={{ color: "var(--text-muted)" }}>
            Configure your website preferences and appearance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Theme Settings */}
          <div>
            <ThemeSwitcher />
          </div>

          {/* Other Settings */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Site Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
                  Site Name
                </label>
                <input
                  type="text"
                  defaultValue="Pastor Sola Olukoya Ministry"
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{
                    backgroundColor: "var(--bg-dark)",
                    borderColor: "var(--secondary)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="contact@pastorsolaolukoya.com"
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{
                    backgroundColor: "var(--bg-dark)",
                    borderColor: "var(--secondary)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{
                    backgroundColor: "var(--bg-dark)",
                    borderColor: "var(--secondary)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <button className="btn-primary w-full">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
