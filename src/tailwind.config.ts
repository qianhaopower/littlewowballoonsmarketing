// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6A2B",
          yellow: "#FFC54D",
          blue: "#2E86FF",
          pink: "#FF4D8D",
          ink: "#0F172A",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2,6,23,0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
