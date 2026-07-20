import type { NextConfig } from "next";
import path from "path";

// セキュリティヘッダー（CSP 含む）は public/_headers で一元管理しています。
// output: "export" の静的エクスポートでは headers() は本番ビルドに適用されないため、
// ここでは定義していません。新しい外部画像ソースを追加する際は、
// public/_headers の img-src と images.remotePatterns（下記）の両方を更新してください。

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.seki-saki.com",
      },
    ],
  },
};

export default nextConfig;
