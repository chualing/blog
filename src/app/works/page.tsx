import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'
import UiCard from '@/components/ui/Card'
import { getAllWorksMeta } from '@/lib/content/getWorks'
import { buildPageMeta } from '@/lib/seo/meta'

export const metadata: Metadata = buildPageMeta({
  title: '作品集',
  path: '/works',
})

/**
 * 作品集列表页（SSG）。
 * 极简页头 + 卡片网络，卡片逐项滚动显现。
 */
export default function WorksListPage() {
  const works = getAllWorksMeta()

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-24">
      <Reveal direction="none">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-brand-600">Works</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">作品集</h1>
        <p className="mt-4 max-w-xl text-[15px] text-slate-soft">
          一些我做过并为之骄傲的实践与创意项目。
        </p>
      </Reveal>

      {works.length === 0 ? (
        <p className="mt-12 text-slate-soft">暂无作品。</p>
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => (
            <Reveal key={work.slug} delay={(index % 3) * 80}>
              <UiCard
                href={`/works/${work.slug}`}
                title={work.title}
                description={work.description}
                tags={work.tags}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}