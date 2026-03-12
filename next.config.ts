import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tối ưu bundle - tree-shaking tốt hơn
  reactStrictMode: true,
  // Tối ưu hình ảnh
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // lucide-react đã được tối ưu mặc định bởi Next.js
};

export default nextConfig;
