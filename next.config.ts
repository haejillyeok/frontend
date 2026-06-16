import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 정적 export에서는 Next.js 이미지 최적화 API를 사용할 수 없어서 추가
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;
