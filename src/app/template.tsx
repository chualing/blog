import type { ReactNode } from 'react'

/**
 * App Router `template.tsx`：每次路由导航都会重新挂载本文件，
 * 从而实现页面进入过渡动画（与 layout 不同，template 不跨页面保留状态）。
 * 仅包裹一层 fade-in-up 动画类，不引入客户端路由钩子，不破坏 SSG / SEO。
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>
}
