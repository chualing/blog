'use client'

import { useEffect, useRef } from 'react'

interface LightboxProps {
  className?: string
}

/**
 * 图片灯箱（客户端组件）。
 * 在 mdx 文档内通过元素级事件委托监听 `.js-lightbox-trigger` 的点击，
 * 读取其 `data-src` / `data-alt` 并弹出全屏 dialog 展示大图。
 * 这样灯箱逻辑不依赖内联 <script>，可通过 MDX components 映射正常注册。
 */
export default function Lightbox({ className = '' }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const lightboxImg = imgRef.current
    if (!dialog || !lightboxImg) return

    const dialogElement = dialog as HTMLDialogElement
    const imageElement = lightboxImg as HTMLImageElement

    function openLightbox(src: string | null, alt: string | null) {
      imageElement.removeAttribute('src')
      if (src) imageElement.src = src
      imageElement.alt = alt || ''
      if (typeof dialogElement.showModal === 'function') dialogElement.showModal()
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const trigger = target?.closest<HTMLElement>('.js-lightbox-trigger')
      if (!trigger) return
      openLightbox(trigger.getAttribute('data-src'), trigger.getAttribute('data-alt'))
    }

    function handleBackdrop(e: MouseEvent) {
      if (e.target === dialogElement) dialogElement.close()
    }

    document.addEventListener('click', handleClick)
    dialogElement.addEventListener('click', handleBackdrop)
    return () => {
      document.removeEventListener('click', handleClick)
      dialogElement.removeEventListener('click', handleBackdrop)
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={`fixed inset-0 m-auto h-screen max-h-none w-screen max-w-none bg-black/80 p-4 open:flex open:items-center open:justify-center sm:p-8 ${className}`}
    >
      <img ref={imgRef} alt="" className="h-full max-h-none w-full max-w-none object-contain" />
    </dialog>
  )
}
