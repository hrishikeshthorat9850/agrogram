"use client";

import React from "react";
import { useTheme } from "@/Context/themecontext";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
