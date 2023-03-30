/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        1500: "1500ms",
      },
      colors: {
        "primary-dark": "#1f1f1f",
        primary: "#ffffff",
        highlight: {
          dark: "#FFFFFF",
          light: "#1f1f1f",
        },
        secondary: {
          dark: "#707070",
          light: "#e6e6e6",
        },
        action: "#3B82F6",
      },
      transitionProperty: {
        width: "width",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-30deg)" },
          "50%": { transform: "rotate(60deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
