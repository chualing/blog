'use client'

import { useState } from 'react'

interface AudioPlayerProps {
  src: string
  title?: string
}

/**
 * 音频播放组件（客户端）。
 * 使用原生 <audio>，声明 preload="none" 按需加载媒体资源，避免阻塞首屏；加载失败时展示兜底提示。
 */
export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
        音频加载失败。
      </div>
    )
  }

  return (
    <div className="my-4">
      {title && <p className="mb-2 text-sm font-medium text-slate-700">{title}</p>}
      <audio
        controls
        preload="none"
        src={src}
        onError={() => setError(true)}
        className="w-full"
      >
        当前浏览器不支持音频播放。
      </audio>
    </div>
  )
}