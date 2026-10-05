/** 站点级常量，供 metadata、sitemap、页面共用 */

export const siteConfig = {
  name: 'My Portfolio',
  title: '个人博客与作品集',
  description: '分享技术文章与个人作品的个人网站，基于 Next.js 构建。',
  url: 'https://example.com',
  author: '陈华灵',
  locale: 'zh-CN',
} as const

export type SiteConfig = typeof siteConfig