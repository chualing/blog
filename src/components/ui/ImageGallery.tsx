import OptimizedImage from '@/components/media/OptimizedImage'

interface ImageGalleryProps {
  /** 最多支持三张图片，以独立字符串 prop 传入，规避 MDX 对数组 prop 的序列化丢失 */
  src1?: string
  src2?: string
  src3?: string
  alt1?: string
  alt2?: string
  alt3?: string
  /** 固定显示宽高（px），供 next/image 使用；内部带兜底，防止 prop 序列化丢失 */
  width?: number | string
  height?: number | string
  className?: string
}

const toPositive = (value: number | string | undefined, fallback: number): number => {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/**
 * 图片画廊（服务端组件）。
 * 将多张图片水平排列（flex-wrap，窄屏自动换行）；每张采用固定宽高渲染以避免布局抖动，
 * 外层响应式布局保证移动端体验。尺寸在组件内部兜底，不依赖 MDX prop 序列化结果。
 */
export default function ImageGallery({
  src1,
  src2,
  src3,
  alt1,
  alt2,
  alt3,
  width,
  height,
  className = '',
}: ImageGalleryProps) {
  const w = toPositive(width, 220)
  const h = toPositive(height, 165)

  const sources = [
    { src: src1, alt: alt1 },
    { src: src2, alt: alt2 },
    { src: src3, alt: alt3 },
  ].filter((item): item is { src: string; alt: string | undefined } => typeof item.src === 'string')

  return (
    <div className={`my-6 flex flex-wrap justify-center gap-4 ${className}`}>
      {sources.map((item, index) => (
        <figure key={item.src} className="m-0" style={{ width: w, height: h }}>
          <OptimizedImage
            src={item.src}
            alt={item.alt ?? `作品图 ${index + 1}`}
            width={w}
            height={h}
          />
        </figure>
      ))}
    </div>
  )
}
