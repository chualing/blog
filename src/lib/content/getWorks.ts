import 'server-only'
import { globSync } from 'glob'
import path from 'node:path'
import matter from 'gray-matter'
import { readFileSync } from 'node:fs'
import fs from 'node:fs/promises'
import type { WorkFrontmatter, WorkMeta } from './types'

const WORKS_DIR = path.join(process.cwd(), 'src/content/works')

/** 提取文件名作为 slug，并返回作品 frontmatter 元信息 */
function fileToMeta(filePath: string): WorkMeta {
  const slug = path.basename(filePath, path.extname(filePath))
  const fileContent = readFileSync(filePath, 'utf-8')
  const { data } = matter(fileContent)
  const fm = data as WorkFrontmatter
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ?? [],
    tech: fm.tech ?? [],
    cover: fm.cover,
  }
}

/** 服务端专用：遍历 works 目录下所有 .mdx 文件并返回作品元信息列表。 */
export function getAllWorksMeta(): WorkMeta[] {
  const files = globSync('**/*.mdx', { cwd: WORKS_DIR })
  return files.map((f) => fileToMeta(path.join(WORKS_DIR, f)))
}

/** 按 slug 读取单个作品的 mdx 源内容（服务端专用）。返回 null 表示不存在。 */
export async function getWorkBySlug(slug: string): Promise<WorkMeta & { content: string } | null> {
  const filePath = path.join(WORKS_DIR, `${slug}.mdx`)
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const fm = data as WorkFrontmatter
    return {
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      tags: fm.tags ?? [],
      tech: fm.tech ?? [],
      cover: fm.cover,
      content,
    }
  } catch {
    return null
  }
}