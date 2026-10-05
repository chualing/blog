import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

interface PageMetaInput {
  title: string
  description?: string
  path: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
}

/**
 * 生成统一的页面 metadata（openGraph / twitter / description）。
 * 供各页面 generateMetadata 复用，保证 SEO 元信息一致。
 */
export function buildPageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`
  const desc = description ?? siteConfig.description
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      type,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(image ? { images: [{ url: image }] } : {}),
      ...(publishedTime && type === 'article' ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      ...(image ? { images: [image] } : {}),
    },
  }
}