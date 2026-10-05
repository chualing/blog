import 'server-only'
import { globSync } from 'glob'
import path from 'node:path'
import matter from 'gray-matter'
import { readFileSync } from 'node:fs'
import fs from 'node:fs/promises'
import type { ArticleFrontmatter, ArticleMeta } from './types'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

/** 提取文件名作为 slug，并返回 frontmatter 元信息 */
function fileToMeta(filePath: string): ArticleMeta {
  const slug = path.basename(filePath, path.extname(filePath))
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
 * 仅读取 frontmatter，避免加载正文，供列表页与 sitemap 使用。
 */
export function getAllPostsMeta(): ArticleMeta[] {
  const files = globSync('**/*.mdx', { cwd: POSTS_DIR })
  return files.map((f) => fileToMeta(path.join(POSTS_DIR, f)))
}

/** 按 slug 读取单篇文章的 mdx 源内容（服务端专用）。返回 null 表示不存在。 */
export async function getPostBySlug(slug: string): Promise<ArticleMeta & { content: string } | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
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
  } catch {
    return null
  }
}