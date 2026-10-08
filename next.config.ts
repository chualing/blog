import type { NextConfig } from 'next'

/**
 * GitHub Pages 部署相关配置。
 * - 项目站点需设置 NEXT_PUBLIC_BASE_PATH=/仓库名（在部署 workflow 中自动注入）；
 *   用户主页站点无需设置，保持为空即可。
 * - output: 'export'：GitHub Pages 无法托管 Next.js 服务端，故静态导出。
 * - images.unoptimized: 静态导出下无图片优化服务端，交由原生 <img> 输出（/media 为本地静态资源）。
 * - assetPrefix 与 basePath 保持一致，确保静态资源在子路径（/repo/）下可被正确加载。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
