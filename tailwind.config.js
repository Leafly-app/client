import { colors } from "./styles/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: { ...colors },
      fontFamily: {
        sans: ["Pretendard Variable", "Arial", "sans-serif"],
      },
      fontSize: {
        "heading-24-bold": ["24px", { lineHeight: "36px", fontWeight: "700" }],
        "heading-24-semibold": ["24px", { lineHeight: "36px", fontWeight: "600" }],
        "heading-24-regular": ["24px", { lineHeight: "36px", fontWeight: "400" }],
        "heading-20-bold": ["20px", { lineHeight: "28px", fontWeight: "700" }],
        "heading-20-semibold": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "heading-20-regular": ["20px", { lineHeight: "28px", fontWeight: "400" }],

        "body-16-bold": ["16px", { lineHeight: "24px", fontWeight: "700" }],
        "body-16-semibold": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        "body-16-regular": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-14-bold": ["14px", { lineHeight: "20px", fontWeight: "700" }],
        "body-14-semibold": ["14px", { lineHeight: "20px", fontWeight: "600" }],
        "body-14-medium": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "body-14-regular": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-12-bold": ["12px", { lineHeight: "18px", fontWeight: "700" }],
        "body-12-semibold": ["12px", { lineHeight: "18px", fontWeight: "600" }],
        "body-12-regular": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "body-10-bold": ["10px", { lineHeight: "16px", fontWeight: "700" }],
        "body-10-semibold": ["10px", { lineHeight: "16px", fontWeight: "600" }],
        "body-10-regular": ["10px", { lineHeight: "16px", fontWeight: "400" }],
        "body-8-bold": ["8px", { lineHeight: "16px", fontWeight: "700" }],
        "body-8-semibold": ["8px", { lineHeight: "16px", fontWeight: "600" }],
        "body-8-regular": ["8px", { lineHeight: "16px", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
