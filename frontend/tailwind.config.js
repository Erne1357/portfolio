/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#00f5d4",
        "accent-2": "#6c63ff",
        "bg-primary": "#050b1a",
        "bg-secondary": "#0d1b35",
        "bg-card": "rgba(13, 27, 53, 0.6)",
        "text-primary": "#e8f4fd",
        "text-secondary": "#8bafd0",
        "text-muted": "#4a6fa5",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 245, 212, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 245, 212, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};
