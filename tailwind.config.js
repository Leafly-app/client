import plugin from "tailwindcss/plugin";
import { colors } from "./styles/colors";

const FONTS = {
  bold: "Pretendard-Bold",
  semibold: "Pretendard-SemiBold",
  medium: "Pretendard-Medium",
  regular: "Pretendard-Regular",
};

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
          fontFamily: FONTS.bold,
        },
        ".text-heading-24-semibold": {
          fontSize: "1.5rem",
          lineHeight: "2.25rem",
          fontFamily: FONTS.semibold,
        },
        ".text-heading-24-regular": {
          fontSize: "1.5rem",
          lineHeight: "2.25rem",
          fontFamily: FONTS.regular,
        },
        ".text-heading-20-bold": {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          fontFamily: FONTS.bold,
        },
        ".text-heading-20-semibold": {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          fontFamily: FONTS.semibold,
        },
        ".text-heading-20-regular": {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          fontFamily: FONTS.regular,
        },
        ".text-body-16-bold": {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontFamily: FONTS.bold,
        },
        ".text-body-16-semibold": {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontFamily: FONTS.semibold,
        },
        ".text-body-16-regular": {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontFamily: FONTS.regular,
        },
        ".text-body-14-bold": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: FONTS.bold,
        },
        ".text-body-14-semibold": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: FONTS.semibold,
        },
        ".text-body-14-medium": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: FONTS.medium,
        },
        ".text-body-14-regular": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontFamily: FONTS.regular,
        },
        ".text-body-12-bold": {
          fontSize: "0.75rem",
          lineHeight: "1.125rem",
          fontFamily: FONTS.bold,
        },
        ".text-body-12-semibold": {
          fontSize: "0.75rem",
          lineHeight: "1.125rem",
          fontFamily: FONTS.semibold,
        },
        ".text-body-12-regular": {
          fontSize: "0.75rem",
          lineHeight: "1.125rem",
          fontFamily: FONTS.regular,
        },
        ".text-body-10-bold": {
          fontSize: "0.625rem",
          lineHeight: "1rem",
          fontFamily: FONTS.bold,
        },
        ".text-body-10-semibold": {
          fontSize: "0.625rem",
          lineHeight: "1rem",
          fontFamily: FONTS.semibold,
        },
        ".text-body-10-regular": {
          fontSize: "0.625rem",
          lineHeight: "1rem",
          fontFamily: FONTS.regular,
        },
        ".text-body-8-bold": {
          fontSize: "0.5rem",
          lineHeight: "1rem",
          fontFamily: FONTS.bold,
        },
        ".text-body-8-semibold": {
          fontSize: "0.5rem",
          lineHeight: "1rem",
          fontFamily: FONTS.semibold,
        },
        ".text-body-8-regular": {
          fontSize: "0.5rem",
          lineHeight: "1rem",
          fontFamily: FONTS.regular,
        },
      });
    }),
  ],
};
