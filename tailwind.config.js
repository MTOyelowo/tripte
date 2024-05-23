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
      fontSize: {
        responsiveListItem: "clamp(0.25rem, 2.5vw, 4rem)",
        responsivePoem: "clamp(0.35rem, 3.5vw, 5rem)",
        responsiveParagraph: "clamp(0.3rem, 3vw, 4.5rem)",
        responsiveSideline: "clamp(1rem, 5vw, 8rem)",
        responsiveHeadline: "clamp(5rem, 24.5vw, 40rem)",
        dynamic: "clamp(8rem, 2vw + 8rem, 24rem)",
      },
      fontFamily: {
        poetsen: ["PoetsenOne", "sans-serif"],
        freeman: ["Freeman", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
