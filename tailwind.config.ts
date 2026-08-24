import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 紙のような薄い茶色〜クリームのベース面
        paper: {
          DEFAULT: "#f5ecdd",
          deep: "#ece0cc",
          card: "#fdf8f0",
        },
        // 罫線・枠線
        line: {
          DEFAULT: "#ddcdb3",
          strong: "#c9b499",
        },
        // 文字色（濃い茶）
        ink: {
          DEFAULT: "#3d2f24",
          soft: "#6f5c4a",
          muted: "#94816d",
        },
        // アクセント（テラコッタ）
        terracotta: {
          DEFAULT: "#e2725b",
          dark: "#c85a44",
          soft: "#f7ded6",
        },
        // カテゴリーなどのサブアクセント
        mustard: "#e8a33d",
        leaf: "#7fa650",
        sky: "#6b93a8",
      },
      boxShadow: {
        // 絵本の紙が浮いているような、やわらかい影
        soft: "0 6px 20px -8px rgba(61, 47, 36, 0.25)",
        lift: "0 14px 32px -12px rgba(61, 47, 36, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
