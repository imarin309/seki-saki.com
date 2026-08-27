import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 本文・ナビゲーションなどの UI
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        // 大きな見出し・作品タイトル・章番号（明朝）
        display: ["var(--font-display)", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // 紙の面。作品の色が主役になるよう彩度は抑える
        paper: {
          DEFAULT: "#f6f3ec",
          deep: "#eae5da",
        },
        // 罫線（極細でのみ使う）
        line: {
          DEFAULT: "#e0dacd",
          strong: "#c3bbaa",
        },
        // 文字色
        ink: {
          DEFAULT: "#26221e",
          soft: "#6a625a",
          muted: "#a09789",
        },
        // 唯一のアクセント
        terracotta: {
          DEFAULT: "#b4553c",
          dark: "#8f4029",
          soft: "#ead9d2",
        },
      },
    },
  },
  plugins: [],
};

export default config;
