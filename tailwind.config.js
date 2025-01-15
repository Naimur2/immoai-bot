import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Scan all files in src/ for classes
  theme: {
    extend: {
      fontFamily: {
        heading: ["Mulish", ...fontFamily.sans],
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        dark: "#191D23",
        primary: {
          100: "#5C2BFF",
        },
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        slide: "slide var(--speed) ease-in-out infinite alternate",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      backgroundImage: {
        "input-border": "linear-gradient(90deg, #ccbdff 0%, #f6c5d1 100%)",
        "get-started-bg": "url('/svg/get-started.svg')",
        "faq-separator": "linear-gradient(90deg, #CCBDFF 0%, #F6C5D1 100%)",
        "gradient-primary": "linear-gradient(90deg, #5C2BFF 0%, #EA576D 100%)",
        "pricing-bg":
          "linear-gradient(90deg, rgba(204, 189, 255, 0.20) 0%, rgba(246, 197, 209, 0.20) 100%)",
        headerBg: "linear-gradient(90deg, #5C2BFF 0%, #EA576D 100%)",
        "chat-item-bg":
          "linear-gradient(90deg, rgba(204, 189, 255, 0.30) 0%, rgba(246, 197, 209, 0.30) 100%)",
      },
      boxShadow: {
        attachmentImage: "0px 2px 15px 6px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
