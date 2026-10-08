import 'server-only'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { mdxComponents } from '@/components/mdx/mdx-components'

interface RenderMdxOptions {
  content: string
}

/**
 * 服务端专用：将 mdx 源内容编译为可渲染元素。
 * - remark-gfm 支持表格 / 任务列表等 GFM 语法。
 * - rehype-highlight 实现代码块语法高亮。
 * - components 继承 mdxComponents 映射，支持文档内嵌入 MUI 与自定义 Tailwind 组件。
 * 仅在服务端组件中调用，读取与解析均发生在服务端，利于 SSG。
 */
export async function renderMdx({ content }: RenderMdxOptions): Promise<React.ReactElement> {
  const { content: element } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  })
  return element
}
