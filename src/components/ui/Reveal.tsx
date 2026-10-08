'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** 出场位移方向 */
  direction?: 'up' | 'left' | 'right' | 'none'
  /** 触发后的过渡延迟（ms），用于交错显现 */
  delay?: number
}

/**
 * 滚动显现容器（客户端组件）。
 * 通过 IntersectionObserver 在元素进入视口时添加 is-visible，触发淡入 + 位移过渡。
 * - 仅在首次进入时触发一次，随后断开观察，减少开销。
 * - 无 IO 支持或用户偏好减动效时直接显示（CSS 层已兜底 opacity/transition）。
 */
export default function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) {
      return
    }
    if (typeof IntersectionObserver === 'undefined') {
      queueMicrotask(() => setVisible(true))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-direction={direction}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
