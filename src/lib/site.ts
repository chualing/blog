/** 站点级常量，供 metadata、sitemap、页面共用 */

/** 线上站点地址：优先读取环境变量，部署时可注入 GitHub Pages 地址；本地回退到占位值 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const siteConfig = {
  name: 'My Portfolio',
  title: '个人博客与作品集',
  description: '分享技术文章与个人作品的个人网站，基于 Next.js 构建。',
  url: siteUrl,
  author: '陈华灵',
  locale: 'zh-CN',
} as const

export type SiteConfig = typeof siteConfig
