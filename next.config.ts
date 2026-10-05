import type { NextConfig } from 'next'

/**
 * Next.js 16 的 App Router 路由级配置。
 * - images: 允许加载本地 media 目录以及开启图片优化所需要的内置能力
 * - eslint: lint 校验交给独立命令执行，构建不做硬阻断，避免 jarring
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig