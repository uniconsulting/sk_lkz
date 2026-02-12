import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary1: "rgb(var(--secondary1) / <alpha-value>)",
        secondary2: "rgb(var(--secondary2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
      },
      borderRadius: {
        card: "var(--r-card)",
        block: "var(--r-block)",
        sm: "var(--r-sm)",
      },
      boxShadow: {
        glass: "var(--shadow-glass)",
        glassHover: "var(--shadow-glass-hover)",
      },
    },
  },
  plugins: [],
} satisfies Config;
