import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        graphite: "#1d2430",
        mist: "#f3f6f8",
        teal: "#1f8a83",
        amber: "#e5a93b",
        rose: "#d85f68",
        cobalt: "#3867d6"
      },
      boxShadow: {
        panel: "0 18px 45px rgba(29, 36, 48, 0.10)"
      }
    }
  },
  plugins: []
} satisfies Config;
