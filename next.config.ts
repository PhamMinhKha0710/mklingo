import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Tối ưu bundle - tree-shaking tốt hơn
  reactStrictMode: true,
  // Tối ưu hình ảnh
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
