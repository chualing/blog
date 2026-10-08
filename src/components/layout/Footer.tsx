import { siteConfig } from '@/lib/site'

/**
 * 全站页脚（服务端组件）。
 * 简洁居中排版，轻量顶部描边与毛玻璃底，与整体极简质感一致。
 */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-black/5 py-8">
      <div className="mx-auto w-full max-w-6xl px-5 text-center">
        <p className="text-slate-soft text-[12px]">
          © {year} {siteConfig.author} · {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}
