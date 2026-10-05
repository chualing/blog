import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllWorksMeta, getWorkBySlug } from '@/lib/content/getWorks'
import { renderMdx } from '@/lib/content/render-mdx'
import { buildPageMeta } from '@/lib/seo/meta'

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>
}

/** 静态生成所有作品详情页的动态路由参数 */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllWorksMeta().map((work) => ({ slug: work.slug }))
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const work = await getWorkBySlug(slug)
  if (!work) {
    return {}
  }
  return buildPageMeta({
    title: work.title,
    description: work.description,
    path: `/works/${slug}`,
    type: 'article',
  })
}

/**
 * 作品详情页（SSG）。
 * 服务端读取 mdx 源并编译渲染，支持文档内嵌入媒体、3D 模型等自定义组件。
 */
export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const work = await getWorkBySlug(slug)
  if (!work) {
    notFound()
  }

  const content = await renderMdx({ content: work.content })

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-20 md:py-24">
      <header className="mb-10">
        <p className="animate-fade-in-up text-[12px] font-medium uppercase tracking-[0.2em] text-brand-600">
          Works
        </p>
        <h1 className="animate-fade-in-up mt-4 text-3xl font-semibold tracking-tight text-ink [animation-delay:120ms] md:text-5xl">
          {work.title}
        </h1>
        <div className="animate-fade-in-up mt-5 flex flex-wrap items-center gap-3 [animation-delay:240ms]">
          <span className="text-[13px] text-slate-soft">
            {new Date(work.date).toLocaleDateString('zh-CN')}
          </span>
          {work.tech && work.tech.length > 0 && (
            <span className="flex flex-wrap gap-2">
              {work.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-600"
                >
                  {tech}
                </span>
              ))}
            </span>
          )}
        </div>
      </header>
      <div className="glass rounded-3xl bg-white/60 p-6 md:p-10">{content}</div>
    </article>
  )
}