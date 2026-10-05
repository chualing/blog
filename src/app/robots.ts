import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

/**
 * robots.txt 生成配置。
 * 允许所有爬虫抓取全站，并在同域声明 sitemap 位置。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}