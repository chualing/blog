'use client'

import { useState } from 'react'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
}

/**
 * 视频播放组件（客户端）。
 * 使用原生 <video>，preload="none" 按需加载媒体，避免阻塞首屏；失败时展示兜底提示。
 */
export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
        视频加载失败。
      </div>
    )
  }

  return (
    <div className="my-4">
      {title && <p className="mb-2 text-sm font-medium text-slate-700">{title}</p>}
      <video
        controls
        preload="none"
        src={src}
        poster={poster}
        onError={() => setError(true)}
        className="w-full rounded-lg"
      >
        当前浏览器不支持视频播放。
      </video>
    </div>
  )
}
