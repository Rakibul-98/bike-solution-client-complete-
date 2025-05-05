/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mycustomtheme: {
          primary: "#eab308",
          secondary: "#e5490d",
          accent: "#2a5ea7",
          neutral: "#f5ffff",
          "base-100": "#ffffff",
          "base-200": "#000000",
          info: "#2a3063",
          success: "#22c55e",
          warning: "#facc15",
          error: "#ef4444",
        },
      },
    ],
  },
};
