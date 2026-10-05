import MuiButton from '@mui/material/Button'
import MuiLink from '@mui/material/Link'
import Callout from '@/components/ui/Callout'
import ImageGallery from '@/components/ui/ImageGallery'
import OptimizedImage from '@/components/media/OptimizedImage'
import AudioPlayer from '@/components/media/AudioPlayer'
import VideoPlayer from '@/components/media/VideoPlayer'
import ModelViewer from '@/components/three/ModelViewer'

/* ---------- 标准 Markdown 标签的 Tailwind 样式覆盖 ---------- */

function MdxH1({ className, ...rest }: React.JSX.IntrinsicElements['h1']) {
  return <h1 className={`mb-4 mt-8 text-3xl font-bold text-slate-900 ${className ?? ''}`} {...rest} />
}

function MdxH2({ className, ...rest }: React.JSX.IntrinsicElements['h2']) {
  return <h2 className={`mb-3 mt-7 text-2xl font-bold text-slate-900 ${className ?? ''}`} {...rest} />
}

function MdxH3({ className, ...rest }: React.JSX.IntrinsicElements['h3']) {
  return <h3 className={`mb-2 mt-6 text-xl font-semibold text-slate-900 ${className ?? ''}`} {...rest} />
}

function MdxParagraph({ className, ...rest }: React.JSX.IntrinsicElements['p']) {
  return <p className={`my-3 text-slate-700 ${className ?? ''}`} {...rest} />
}

function MdxList({ className, ...rest }: React.JSX.IntrinsicElements['ul']) {
  return <ul className={`my-3 list-disc space-y-1 pl-6 text-slate-700 ${className ?? ''}`} {...rest} />
}

function MdxOrderedList({ className, ...rest }: React.JSX.IntrinsicElements['ol']) {
  return <ol className={`my-3 list-decimal space-y-1 pl-6 text-slate-700 ${className ?? ''}`} {...rest} />
}

function MdxAnchor({ className, ...rest }: React.JSX.IntrinsicElements['a']) {
  return <a className={`text-brand-600 underline hover:text-brand-500 ${className ?? ''}`} {...rest} />
}

function MdxBlockquote({ className, children, ...rest }: React.JSX.IntrinsicElements['blockquote']) {
  return (
    <blockquote
      className={`my-4 border-l-4 border-brand-500/30 bg-brand-50 px-4 py-2 text-slate-700 ${className ?? ''}`}
      {...rest}
    >
      {children}
    </blockquote>
  )
}

function MdxCode({ className, ...rest }: React.JSX.IntrinsicElements['code']) {
  const isBlock = className?.includes('language-')
  return (
    <code
      {...rest}
      className={
        isBlock
          ? `block ${className ?? ''}`
          : `rounded bg-slate-100 px-1.5 py-0.5 text-sm text-pink-600 ${className ?? ''}`
      }
    />
  )
}

/**
 * MDX 组件映射表。
 * - 标准标签使用 Tailwind 定制样式，保证与全站设计语言统一。
 * - 具名组件（Button、Callout、媒体、3D 模型）可在 mdx 文档内直接以 <Button/> 等方式使用。
 */
export const mdxComponents = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  p: MdxParagraph,
  ul: MdxList,
  ol: MdxOrderedList,
  a: MdxAnchor,
  blockquote: MdxBlockquote,
  code: MdxCode,
  Button: MuiButton,
  Link: MuiLink,
  Callout,
  ImageGallery,
  OptimizedImage,
  AudioPlayer,
  VideoPlayer,
  ModelViewer,
}

export type AllowedMdxComponentNames = keyof typeof mdxComponents