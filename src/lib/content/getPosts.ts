import 'server-only'
import { globSync } from 'glob'
import path from 'node:path'
import matter from 'gray-matter'
import { readFileSync } from 'node:fs'
import type { ArticleFrontmatter, ArticleMeta } from './types'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

/** 提取相对路径作为 slug：保留嵌套层级，路径分隔符统一为 `/`，并去掉 .mdx 后缀 */
function toSlug(relative: string): string {
  return relative.replace(/\\/g, '/').replace(/\.mdx$/i, '')
}

/** 提取文件相对路径作为 slug，并返回 frontmatter 元信息 */
function fileToMeta(filePath: string): ArticleMeta {
  const slug = toSlug(path.relative(POSTS_DIR, filePath))
  const fileContent = readFileSync(filePath, 'utf-8')
  const { data } = matter(fileContent)
  const fm = data as ArticleFrontmatter
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ?? [],
  }
}

/**
 * 服务端专用：遍历 posts 目录下所有 .mdx 文件并返回文章元信息列表。
 * 仅读取 frontmatter，避免加载正文，供列表页、sitemap 与路由参数使用。
 * slug 即相对目录的层级路径（如 `frontend/react`），与内容目录结构一一对应。
 */
export function getAllPostsMeta(): ArticleMeta[] {
  const files = globSync('**/*.mdx', { cwd: POSTS_DIR })
  return files.map((f) => fileToMeta(path.join(POSTS_DIR, f)))
}

/** 按层级 slug 读取单篇文章的 mdx 源内容（服务端专用）。返回 null 表示不存在。 */
export async function getPostBySlug(
  slug: string,
): Promise<(ArticleMeta & { content: string }) | null> {
  // 通过 glob 在目录内定位文件，避免用路径拼接可能导致的越界访问。
  const [match] = globSync(`**/${slug}.mdx`, { cwd: POSTS_DIR })
  if (!match) {
    return null
  }
  const fileContent = readFileSync(path.join(POSTS_DIR, match), 'utf-8')
  const { data, content } = matter(fileContent)
  const fm = data as ArticleFrontmatter
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ?? [],
    content,
  }
}
