import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import ThemeRegistry from '@/theme/ThemeRegistry'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { siteConfig } from '@/lib/site'
import './globals.css'

/**
 * 根布局。
 * - ThemeRegistry 为客户端组件，包裹 MUI 主题上下文。
 * - Header / Footer 为全站公共区域。
 * - 通过 metadata / viewport export 配置全局 SEO 与移动端视口。
 */
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.locale}>
      <body>
        <ThemeRegistry>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeRegistry>
      </body>
    </html>
  )
}