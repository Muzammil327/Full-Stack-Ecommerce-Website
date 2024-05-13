import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        1: "rgb(299 102 241 / 1)",
        h1: "rgb(79 70 229 / 1)",
        secondary: "#22D3EE",
      },
    },
  },
  plugins: [],
};
export default config;
