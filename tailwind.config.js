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
        "pretendard-regular": ["Pretendard-Regular"],
        "pretendard-medium": ["Pretendard-Medium"],
        "pretendard-semibold": ["Pretendard-SemiBold"],
        "pretendard-bold": ["Pretendard-Bold"],
      },
      fontSize: {
        "heading-24-bold": ["24px", { lineHeight: "36px", fontFamily: "Pretendard-Bold" }],
        "heading-24-semibold": ["24px", { lineHeight: "36px", fontFamily: "Pretendard-SemiBold" }],
        "heading-24-regular": ["24px", { lineHeight: "36px", fontFamily: "Pretendard-Regular" }],
        "heading-20-bold": ["20px", { lineHeight: "28px", fontFamily: "Pretendard-Bold" }],
        "heading-20-semibold": ["20px", { lineHeight: "28px", fontFamily: "Pretendard-SemiBold" }],
        "heading-20-regular": ["20px", { lineHeight: "28px", fontFamily: "Pretendard-Regular" }],

        "body-16-bold": ["16px", { lineHeight: "24px", fontFamily: "Pretendard-Bold" }],
        "body-16-semibold": ["16px", { lineHeight: "24px", fontFamily: "Pretendard-SemiBold" }],
        "body-16-regular": ["16px", { lineHeight: "24px", fontFamily: "Pretendard-Regular" }],
        "body-14-bold": ["14px", { lineHeight: "20px", fontFamily: "Pretendard-Bold" }],
        "body-14-semibold": ["14px", { lineHeight: "20px", fontFamily: "Pretendard-SemiBold" }],
        "body-14-medium": ["14px", { lineHeight: "20px", fontFamily: "Pretendard-Medium" }],
        "body-14-regular": ["14px", { lineHeight: "20px", fontFamily: "Pretendard-Regular" }],
        "body-12-bold": ["12px", { lineHeight: "18px", fontFamily: "Pretendard-Bold" }],
        "body-12-semibold": ["12px", { lineHeight: "18px", fontFamily: "Pretendard-SemiBold" }],
        "body-12-regular": ["12px", { lineHeight: "18px", fontFamily: "Pretendard-Regular" }],
        "body-10-bold": ["10px", { lineHeight: "16px", fontFamily: "Pretendard-Bold" }],
        "body-10-semibold": ["10px", { lineHeight: "16px", fontFamily: "Pretendard-SemiBold" }],
        "body-10-regular": ["10px", { lineHeight: "16px", fontFamily: "Pretendard-Regular" }],
        "body-8-bold": ["8px", { lineHeight: "16px", fontFamily: "Pretendard-Bold" }],
        "body-8-semibold": ["8px", { lineHeight: "16px", fontFamily: "Pretendard-SemiBold" }],
        "body-8-regular": ["8px", { lineHeight: "16px", fontFamily: "Pretendard-Regular" }],
      },
    },
  },
  plugins: [],
};
