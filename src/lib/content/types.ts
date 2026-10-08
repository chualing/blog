/** 文章 frontmatter 元信息 */
export interface ArticleFrontmatter {
  title: string
  description?: string
  date: string
  tags?: string[]
}

/** 作品集 frontmatter 元信息 */
export interface WorkFrontmatter {
  title: string
  description?: string
  date: string
  tags?: string[]
  tech?: string[]
  cover?: string
}

/** 单篇文章（含渲染所需 mdx 源内容） */
export interface ArticleMeta extends ArticleFrontmatter {
  slug: string
}

/** 单个作品（含渲染所需 mdx 源内容） */
export interface WorkMeta extends WorkFrontmatter {
  slug: string
}
