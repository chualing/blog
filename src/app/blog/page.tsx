import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'
import UiCard from '@/components/ui/Card'
import { getAllPostsMeta } from '@/lib/content/getPosts'
import { buildPageMeta } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMeta({
  title: '博客',
  path: '/blog',
})

/**
 * 博客文章列表页（SSG）。
 * 极简页头 + 卡片网络，卡片逐项滚动显现。
 */
export default function BlogListPage() {
  const posts = getAllPostsMeta()

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-24">
      <Reveal direction="none">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-brand-600">Blog</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">博客</h1>
        <p className="mt-4 max-w-xl text-[15px] text-slate-soft">
          记录技术思考、工程实践与学习心得。
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-12 text-slate-soft">暂无文章。</p>
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 80}>
              <UiCard
                href={`/blog/${post.slug}`}
                title={post.title}
                description={post.description}
                tags={post.tags}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}