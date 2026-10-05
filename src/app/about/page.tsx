import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { buildPageMeta } from "@/lib/seo/meta";

export const metadata: Metadata = buildPageMeta({
  title: "关于我",
  path: "/about",
});

/** 技能栈分组，便于卡片化呈现 */
const skillGroups: Array<{ title: string; items: string[] }> = [
  {
    title: "前端",
    items: ["Next.js / React", "TypeScript", "Tailwind CSS / MUI", "Three.js"],
  },
];

/**
 * 关于我页面（SSG）。
 * 极简 Hero + 分段滚动显现 + 毛玻璃技能卡片，信息层级清晰、质感统一。
 */
export default function AboutPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl px-5 pt-24 pb-16 text-center md:pt-32">
        <p className="animate-fade-in-up text-[12px] font-medium uppercase tracking-[0.22em] text-brand-600">
          About
        </p>
        <h1 className="animate-fade-in-up mt-5 text-5xl font-semibold tracking-tight text-ink [animation-delay:120ms] md:text-6xl">
          关于我
        </h1>
        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-soft [animation-delay:240ms]">
          热爱ps、pr、Ai、剪辑、拍摄、关注设计系统与用户体验，致力于用简洁优雅的设计方案创造可靠的数字设计产品。
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl px-5 pb-10">
        <Reveal>
          <p className="text-center text-[15px] leading-relaxed text-slate-soft">
            我是一名专注于数字媒体技术的设计者，擅长将创意与技术结合，在视觉、动效与性能之间找到平衡。
            这里沉淀了我的技术思考、学习笔记与作品。
          </p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 100}>
              <div className="glass card-lift h-full rounded-3xl p-7">
                <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-brand-600">
                  {group.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[15px] text-ink"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
