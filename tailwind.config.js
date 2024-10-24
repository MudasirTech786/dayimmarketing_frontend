/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-banner": "url('/images/dsa/banner.jpg')",
        bg1: "url('/images/dsa/bg-1.png')",
        bg2: "url('/images/dsa/bg-2.jpg')",
        "bg-building": "url('/images/dsa/building_bg.jpg')",
        "bg-about-map": "url('/images/dsa/about/map-bg.jpeg')",
      },
      fontFamily: {
        Tangerine: "Tangerine",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
    screens: {
      xs: "380px",
      sm: "520px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      first: "#282F44",
      second: "#E6AF2E",
      third: "#F5D061",
      fourth: "#F5D061",
      fifth: "#f9f7f5",
      white: "#ffffff",
      red: "#dc2626",
      gray: "#b5b5b5",
      black: "#000000",
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
};
