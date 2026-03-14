import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 环境变量暴露给客户端
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "愈见",
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "AI疗愈助手",
  },
  // 图片域名配置（如需外部图片）
  images: {
    remotePatterns: [],
  },
  // 开发配置
  devIndicators: {
    appIsrStatus: true,
  },
};

export default nextConfig;
