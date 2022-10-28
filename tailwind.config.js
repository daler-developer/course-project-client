/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: { max: "769px" },
        mobile: { max: "480px" },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  darkMode: "class",
};
