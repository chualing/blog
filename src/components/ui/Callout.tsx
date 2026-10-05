import type { ReactNode } from 'react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'success'
  title?: string
  children: ReactNode
}

const styles: Record<NonNullable<CalloutProps['type']>, string> = {
  info: 'border-sky-300 bg-sky-50 text-sky-800',
  warning: 'border-amber-300 bg-amber-50 text-amber-800',
  success: 'border-emerald-300 bg-emerald-50 text-emerald-800',
}

/**
 * 提示框组件（基于 Tailwind 的自定义组件）。
 * 可注册进 MDX 组件映射，供文档内以 <Callout type="warning"> 使用。
 */
export default function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={`my-4 rounded-lg border-l-4 px-4 py-3 ${styles[type]}`}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-sm">{children}</div>
    </div>
  )
}