import Link from 'next/link'
import { siteConfig } from '@/lib/site'

/** 导航链接配置，便于后续依据需求扩展菜单项 */
const navItems: Array<{ label: string; href: string }> = [
  { label: '首页', href: '/' },
  { label: '关于我', href: '/about' },
  { label: '作品集', href: '/works' },
  { label: '博客', href: '/blog' },
]

/**
 * 全站导航栏（服务端组件）。
 * 采用毛玻璃（glass）粘性顶栏，链接复用 next/link；高度精简、无多余包裹层级。
 * 使用语义化 <header>/<nav>，保持静态预渲染友好与爬虫可读。
 */
export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-black/5">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5">
        <Link href="/" className="text-ink text-[17px] font-semibold tracking-tight no-underline">
          {siteConfig.author}
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-soft hover:text-ink text-[13px] font-normal no-underline transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
