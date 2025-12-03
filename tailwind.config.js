import plugin from "tailwindcss/plugin";
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
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-heading-24-bold": {
          fontSize: "1.5rem",
          lineHeight: "2.25rem",
          fontFamily: "Pretendard-Bold",
        },
        ".text-heading-24-semibold": {
          fontSize: "1.5rem",
          lineHeight: "2.25rem",
          fontFamily: "Pretendard-SemiBold",
        },
        ".text-heading-24-regular": {
          fontSize: "1.5rem",
          lineHeight: "2.25rem",
          fontFamily: "Pretendard-Regular",
        },
        ".text-heading-20-bold": {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          fontFamily: "Pretendard-Bold",
        },
        ".text-heading-20-semibold": {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          fontFamily: "Pretendard-SemiBold",
        },
        ".text-heading-20-regular": {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          fontFamily: "Pretendard-Regular",
        },
        ".text-body-16-bold": {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontFamily: "Pretendard-Bold",
        },
        ".text-body-16-semibold": {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontFamily: "Pretendard-SemiBold",
        },
        ".text-body-16-regular": {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontFamily: "Pretendard-Regular",
        },
        ".text-body-14-bold": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: "Pretendard-Bold",
        },
        ".text-body-14-semibold": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: "Pretendard-SemiBold",
        },
        ".text-body-14-medium": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: "Pretendard-Medium",
        },
        ".text-body-14-regular": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: "Pretendard-Regular",
        },
        ".text-body-12-bold": {
          fontSize: "0.75rem",
          lineHeight: "1.125rem",
          fontFamily: "Pretendard-Bold",
        },
        ".text-body-12-semibold": {
          fontSize: "0.75rem",
          lineHeight: "1.125rem",
          fontFamily: "Pretendard-SemiBold",
        },
        ".text-body-12-regular": {
          fontSize: "0.75rem",
          lineHeight: "1.125rem",
          fontFamily: "Pretendard-Regular",
        },
        ".text-body-10-bold": {
          fontSize: "0.625rem",
          lineHeight: "1rem",
          fontFamily: "Pretendard-Bold",
        },
        ".text-body-10-semibold": {
          fontSize: "0.625rem",
          lineHeight: "1rem",
          fontFamily: "Pretendard-SemiBold",
        },
        ".text-body-10-regular": {
          fontSize: "0.625rem",
          lineHeight: "1rem",
          fontFamily: "Pretendard-Regular",
        },
        ".text-body-8-bold": {
          fontSize: "0.5rem",
          lineHeight: "1rem",
          fontFamily: "Pretendard-Bold",
        },
        ".text-body-8-semibold": {
          fontSize: "0.5rem",
          lineHeight: "1rem",
          fontFamily: "Pretendard-SemiBold",
        },
        ".text-body-8-regular": {
          fontSize: "0.5rem",
          lineHeight: "1rem",
          fontFamily: "Pretendard-Regular",
        },
      });
    }),
  ],
};
