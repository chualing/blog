'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'

interface OptimizedImageProps {
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
  /** fill 模式下的占位宽高比（Tailwind aspect-* 类），默认 16:9 */
  ratio?: string
  className?: string
  priority?: boolean
}

/** 将可能以字符串形态到达的参数归一化为 number；非法/缺失时返回 NaN 以便走 fallback */
function toNumber(value: number | string | undefined): number {
  if (typeof value === 'number') {
    return value
  }
  return Number(value)
}

/**
 * 图片组件封装（客户端）。
 * - next/image 强制要求提供有效 width/height，否则抛出 “missing required width” 运行时错误。
 * - 当明确提供有效尺寸时按固定尺寸渲染；未提供或尺寸无效时改用 fill + 相对容器，
 *   规避 MDX 向客户端组件传递数字 props 时宽度丢失导致的报错。
 * - 懒加载、格式转换、尺寸优化由 next/image 提供；加载失败降级为文字提示。
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  ratio = 'aspect-video',
  className,
  priority = false,
}: OptimizedImageProps) {
  const [error, setError] = useState(false)

  const numericWidth = toNumber(width)
  const numericHeight = toNumber(height)
  const hasSize =
    Number.isFinite(numericWidth) &&
    numericWidth > 0 &&
    Number.isFinite(numericHeight) &&
    numericHeight > 0

  const imageClass = `rounded-lg object-cover ${className ?? ''}`

  if (error) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500 ${ratio} ${className ?? ''}`}
      >
        图片加载失败
      </div>
    )
  }

  // 尺寸缺失/无效时使用 fill，next/image 不再要求 width/height。
  if (!hasSize) {
    return (
      <div className={`relative w-full overflow-hidden ${ratio} ${className ?? ''}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          onError={() => setError(true)}
          className={imageClass}
        />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={numericWidth}
      height={numericHeight}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      onError={() => setError(true)}
      className={`h-auto ${imageClass}`}
    />
  )
}