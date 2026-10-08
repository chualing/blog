import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import UiCard from '@/components/ui/Card'
import { getAllPostsMeta } from '@/lib/content/getPosts'
import { getAllWorksMeta } from '@/lib/content/getWorks'
import { buildPageMeta } from '@/lib/seo/meta'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildPageMeta({
  title: siteConfig.title,
  path: '/',
})

/**
 * 首页（SSG）。
 * 极简高级 Hero（交错淡入 + 环境光斑浮动）＋ 最新文章 / 精选作品（滚动显现）。
 * 文案与内容均来自服务端预处理，兼顾静态渲染与爬虫抓取。
 */
export default function HomePage() {
  const posts = getAllPostsMeta().slice(0, 3)
  const works = getAllWorksMeta().slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="bg-brand-500/10 animate-float-slow pointer-events-none absolute -top-32 left-1/2 -z-10 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full blur-3xl"
        />
        <div
          aria-hidden
          className="bg-accent-500/10 animate-float pointer-events-none absolute top-40 -right-24 -z-10 h-72 w-72 rounded-full blur-3xl"
        />
        <div className="mx-auto w-full max-w-4xl px-5 pt-28 pb-24 text-center md:pt-36 md:pb-32">
          <p className="animate-fade-in-up text-brand-600 text-[13px] font-medium tracking-[0.22em] uppercase">
            设计师 · 开发者 · 创作者
          </p>
          <h1 className="animate-fade-in-up text-ink mt-6 text-5xl font-semibold tracking-tight [animation-delay:120ms] md:text-7xl">
            你好，我是
            <br className="hidden md:block" />
            <span className="text-gradient">{siteConfig.author}</span>
          </h1>
          <p className="animate-fade-in-up text-slate-soft mx-auto mt-7 max-w-2xl text-lg leading-relaxed [animation-delay:240ms]">
            用简洁优雅的界面与流畅的动效，讲述技术与创意的故事。这里是我的技术思考与作品集。
          </p>
          <div className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:360ms]">
            <Link
              href="/works"
              className="bg-brand-500 hover:bg-brand-600 hover:shadow-brand-500/30 rounded-full px-7 py-3 text-sm font-medium text-white no-underline transition-all hover:shadow-xl"
            >
              查看作品集
            </Link>
            <Link
              href="/about"
              className="glass text-ink rounded-full px-7 py-3 text-sm font-medium no-underline transition-colors hover:bg-white/80"
            >
              关于我
            </Link>
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-brand-600 text-[12px] font-medium tracking-[0.2em] uppercase">
                最新文章
              </p>
              <h2 className="text-ink mt-2 text-3xl font-semibold tracking-tight">Latest Posts</h2>
            </div>
            <Link
              href="/blog"
              className="text-brand-600 hover:text-brand-500 text-sm font-medium no-underline transition-colors"
            >
              查看全部
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80}>
              <UiCard
                href={`/blog/${post.slug}`}
                title={post.title}
                description={post.description}
                tags={post.tags}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 精选作品 */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-brand-600 text-[12px] font-medium tracking-[0.2em] uppercase">
                精选作品
              </p>
              <h2 className="text-ink mt-2 text-3xl font-semibold tracking-tight">
                Selected Works
              </h2>
            </div>
            <Link
              href="/works"
              className="text-brand-600 hover:text-brand-500 text-sm font-medium no-underline transition-colors"
            >
              查看全部
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {works.map((work, index) => (
            <Reveal key={work.slug} delay={index * 80}>
              <UiCard
                href={`/works/${work.slug}`}
                title={work.title}
                description={work.description}
                tags={work.tags}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
