import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fff8e8",
        meadow: "#4f7f52",
        pond: "#4c8ca8",
        berry: "#b64e64",
        ink: "#26352b"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(49, 72, 56, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
