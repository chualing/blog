import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPostsMeta, getPostBySlug } from '@/lib/content/getPosts'
import { renderMdx } from '@/lib/content/render-mdx'
import { buildPageMeta } from '@/lib/seo/meta'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

/** 静态生成所有文章详情页的动态路由参数 */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return {}
  }
  return buildPageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
  })
}

/**
 * 文章详情页（SSG）。
 * 服务端读取 mdx 源并编译渲染，兼顾爬虫抓取与自定义组件支持。
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const content = await renderMdx({ content: post.content })

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-20 md:py-24">
      <header className="mb-10">
        <p className="animate-fade-in-up text-brand-600 text-[12px] font-medium tracking-[0.2em] uppercase">
          Blog
        </p>
        <h1 className="animate-fade-in-up text-ink mt-4 text-3xl font-semibold tracking-tight [animation-delay:120ms] md:text-5xl">
          {post.title}
        </h1>
        <div className="animate-fade-in-up mt-5 flex items-center gap-3 [animation-delay:240ms]">
          <span className="text-slate-soft text-[13px]">
            {new Date(post.date).toLocaleDateString('zh-CN')}
          </span>
          {post.tags && post.tags.length > 0 && (
            <span className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-brand-50 text-brand-600 rounded-full px-2.5 py-1 text-[11px] font-medium"
                >
                  {tag}
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
