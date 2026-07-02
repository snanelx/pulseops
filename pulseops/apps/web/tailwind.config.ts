import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        paper: "#f6f5ef",
        moss: "#315c45",
        limewash: "#d8e7a8",
        coral: "#e46f55",
        blueglass: "#6fa7b8"
      },
      boxShadow: {
        panel: "0 18px 45px rgba(27, 38, 31, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
