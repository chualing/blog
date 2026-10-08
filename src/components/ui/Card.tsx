import type { ReactNode } from 'react'
import Link from 'next/link'

interface UiCardProps {
  href: string
  title: string
  description?: string
  date?: string
  tags?: string[]
  children?: ReactNode
}

/**
 * 通用内容卡片（服务端组件）。
 * 极简玻璃质感：圆角曲面、细描边、hover 浮起微交互（card-lift）。
 * 整体以 next/link 包裹实现可点击与客户端导航，不跨越服务端/客户端边界。
 */
export default function UiCard({ href, title, description, tags = [] }: UiCardProps) {
  return (
    <Link href={href} className="block h-full no-underline">
      <div className="card-lift hover:border-brand-500/25 h-full rounded-2xl border border-black/[0.08] bg-white/70 p-6 transition-colors hover:bg-white/90">
        <p className="text-ink mb-2 text-[17px] font-semibold tracking-tight">{title}</p>
        {description && (
          <p className="text-slate-soft mb-4 line-clamp-2 text-[13px] leading-relaxed">
            {description}
          </p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-brand-50 text-brand-600 rounded-full px-2.5 py-1 text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
