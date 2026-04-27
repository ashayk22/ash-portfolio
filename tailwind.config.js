/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f0f0f0",
        ink: "#0e0e0e",
        red: "#c8392b",       // toned down from #e84c2b
        yellow: "#e6b800",    // toned down from #f5c518
        blue: "#1a1aff",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        body: ["Bricolage Grotesque", "sans-serif"],
      },
    },
  },
  plugins: [],
};
