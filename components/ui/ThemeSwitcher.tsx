"use client";

import { useTheme } from "@/lib/ThemeContext";
import { FaSun, FaMoon, FaAdjust } from "react-icons/fa";
import { motion } from "framer-motion";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "normal", label: "Normal", icon: FaAdjust, color: "#0c0c69" },
    { value: "light", label: "Light", icon: FaSun, color: "#ffffff" },
    { value: "dark", label: "Dark", icon: FaMoon, color: "#0b0b3e" },
  ];

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
        Theme Settings
      </h3>
      <p className="mb-6" style={{ color: "var(--text-muted)" }}>
        Choose your preferred color theme
      </p>

      <div className="grid grid-cols-3 gap-4">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.value;

          return (
            <motion.button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-lg border-2 transition-all ${
                isActive
                  ? "border-secondary shadow-lg"
                  : "border-transparent hover:border-secondary/50"
              }`}
              style={{
                backgroundColor: isActive
                  ? "var(--bg-light)"
                  : "var(--bg-dark)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{
                  backgroundColor: themeOption.color,
                  color:
                    themeOption.value === "light" ? "#0c0c69" : "#ffffff",
                }}
              >
                <Icon className="text-xl" />
              </div>
              <p
                className={`font-semibold ${
                  isActive ? "text-secondary" : ""
                }`}
                style={{
                  color: isActive ? "var(--secondary)" : "var(--text)",
                }}
              >
                {themeOption.label}
              </p>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "var(--bg-dark)" }}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          <strong style={{ color: "var(--secondary)" }}>Current Theme:</strong>{" "}
          {themes.find((t) => t.value === theme)?.label}
        </p>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
