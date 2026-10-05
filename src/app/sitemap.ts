import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { getAllPostsMeta } from '@/lib/content/getPosts'
import { getAllWorksMeta } from '@/lib/content/getWorks'

/**
 * sitemap.xml 自动生成。
 * 静态主路由 + 动态抓取 posts/works 的 mdx 内容页，全站静态预渲染地址一并纳入。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: new Date(), priority: 1, changeFrequency: 'weekly' },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), priority: 0.6, changeFrequency: 'monthly' },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), priority: 0.7, changeFrequency: 'weekly' },
    { url: `${siteConfig.url}/works`, lastModified: new Date(), priority: 0.7, changeFrequency: 'weekly' },
  ]

  const postRoutes: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  const workRoutes: MetadataRoute.Sitemap = getAllWorksMeta().map((work) => ({
    url: `${siteConfig.url}/works/${work.slug}`,
    lastModified: work.date,
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  return [...staticRoutes, ...postRoutes, ...workRoutes]
}