# AGENTS.md

本文件是仓库级智能体协作规范与架构约定，供 AI 编码助手与开发者共同遵守。它由《项目框架搭建提示词》与《项目 AGENTS 配置提示词》沉淀而来，并与当前已落地的代码结构保持一致。

## 1. 项目概述

个人博客与作品集网站，基于 **Next.js 16 App Router + TypeScript** 构建。

- 内容：博客文章、作品集均由本地 `src/content` 目录下的 MDX 文件驱动。
- 样式：MUI 提供高频通用组件，Tailwind CSS v4 + 自定义组件用于定制化页面与 MDX 渲染。
- 渲染：博客、作品详情页优先静态生成（SSG），无动态内容，不使用 ISR / 客户端渲染兜底。
- SEO：原生 metadata API、自动 sitemap.xml、robots.txt、语义化 HTML。

## 2. 全局硬性约束

1. 所有依赖、API、函数、变量必须为 npm 上存在的真实稳定版本，禁止臆造包名、版本、方法或 API。
2. 强制组件化、模块化与严格 TypeScript 类型，尽量避免 `any`；复用逻辑抽离为 hooks / 工具函数 / 类型声明，避免大文件。
3. 开发任何功能前先评估 6 项指标：是否刚需、是否过度设计、是否现代生态最优解、是否有冗余代码、是否优先采用成熟三方库、是否评估了替代方案（例如用 `glob` 代替原生 `fs`，规避环境差异）。
4. Node API（`fs`、`glob`、`path`、`process`）只能在服务端组件 / 服务端函数执行，严禁在客户端组件直接调用。相关文件必须引入 `server-only`。
5. 重资源（图片、音视频、3D 模型、MDX 解析）实现懒加载、加载占位与错误兜底 UI。
6. 输出文本、代码注释语义明确严谨，禁止使用 emoji、颜文字、特殊装饰符号。
7. 分步交付，不一次性输出全部代码；每个代码块标注完整文件路径并附带选型理由与边界说明。

## 3. 技术栈与真实依赖清单

依据 `package.json`（当前已安装的正式稳定版本）：

| 分类 | 依赖 | 版本 |
| --- | --- | --- |
| 框架 | next | 16.3.8 |
| 框架 | react / react-dom | 19.3.0 |
| 语言 | typescript | 5.9.3 |
| UI | @mui/material | 9.4.0 |
| UI | @mui/icons-material | 9.4.0 |
| UI | @mui/material-nextjs | 9.4.0 |
| UI | @emotion/cache / react / styled / server | 11.x |
| 样式 | tailwindcss / @tailwindcss/postcss | 4.3.3 |
| 内容 | next-mdx-remote | 6.0.0 |
| 内容 | gray-matter | 4.0.3 |
| 内容 | glob | 13.0.6 |
| 内容 | remark-gfm | 4.0.1 |
| 内容 | rehype-highlight | 7.0.2 |
| 工具 | server-only | 0.0.1 |
| 工具 | sharp | 0.35.5 |
| 3D | three / @types/three | 0.186.x |
| 工具 | eslint / eslint-config-next | 9.39.5 / 16.3.8 |

- 路径别名：`@/*` 指向 `./src/*`（见 `tsconfig.json`）。
- 模块规范：`module: esnext`，`moduleResolution: bundler`。

## 4. 目录结构与职责边界

```text
src/
  app/                        # App Router 路由层（服务端为主）
    layout.tsx                # 根布局 + 全局 metadata / viewport + ThemeRegistry
    page.tsx                  # 首页
    about/page.tsx            # 关于我
    blog/page.tsx             # 文章列表
    blog/[slug]/page.tsx      # 文章详情（SSG）
    works/page.tsx            # 作品列表
    works/[slug]/page.tsx     # 作品详情（SSG）
    sitemap.ts                # 自动站点地图
    robots.ts                 # 爬虫规则
    globals.css               # Tailwind v4 @theme 主题 token + 全局样式
  components/
    ui/                       # MUI 封装 / 通用 UI：Card、Callout、ErrorFallback、LoadingSkeleton
    layout/                   # 布局：Header、Footer
    media/                    # 媒体：OptimizedImage、VideoPlayer、AudioPlayer
    mdx/mdx-components.tsx    # MDX 组件映射器（标准标签 + 自定义组件注册）
    three/ModelViewer.tsx     # 3D 模型（'use client'，动态加载 + 资源释放）
  lib/
    site.ts                   # 站点常量
    seo/meta.ts               # 统一 metadata 生成工具
    content/types.ts          # 文章 / 作品 frontmatter 与元数据类型
    content/getPosts.ts       # 服务端读取 posts（glob + gray-matter，'server-only'）
    content/getWorks.ts       # 服务端读取 works（glob + gray-matter，'server-only'）
    content/render-mdx.tsx    # 服务端 MDX 编译（next-mdx-remote，'server-only'）
  theme/
    ThemeRegistry.tsx         # MUI 客户端主题上下文
    muiTheme.ts               # MUI 主题定义
```

内容数据目录（由业务提供，不放入 `src` 之外）：

- `src/content/posts/**/*.mdx`：博客文章
- `src/content/works/**/*.mdx`：作品集

## 5. 服务端 / 客户端组件边界（最重要约定）

- **服务端（`'use server'` / 默认服务端组件）可调用 Node API**：`getPosts.ts`、`getWorks.ts`、`render-mdx.tsx` 均以 `import 'server-only'` 声明，只能被服务端组件引用，例如各 `page.tsx`、`sitemap.ts`。
- **客户端组件（`'use client'`）禁止 Node API**：`ModelViewer.tsx`、`ThemeRegistry.tsx`、媒体播放器、交互组件。它们通过 props 接收数据或在 `useEffect` 中加载资源。
- 页面（`page.tsx`）作为服务端组装层：读取内容 → 编译 MDX → 传入客户端组件渲染，保持页面薄、业务逻辑下沉到 `lib`。

## 6. 渲染策略与 SEO

- 文章详情 / 作品详情：`generateStaticParams` + `generateMetadata` 实现 SSG，见 `blog/[slug]/page.tsx`、`works/[slug]/page.tsx`。
- 列表页、首页、关于页：默认服务端组件（无动态内容即为 SSG）。
- metadata 统一由 `lib/seo/meta.ts` 的 `buildPageMeta` 生成（title、description、canonical、openGraph、twitter）。
- 根级 metadata 见 `app/layout.tsx`。
- `app/sitemap.ts` 抓取 posts / works 元信息动态生成站点地图。
- `app/robots.ts` 声明抓取规则与 sitemap 位置。
- 使用语义化标签、合理 heading 层级，图片提供 alt。

## 7. 样式与主题约定

- Tailwind v4 通过 `globals.css` 的 `@theme` 定义设计 token（`brand-500/600/50`、`accent-500`、字体栈），品牌色与 MUI 主题对齐。
- MUI 主题在 `theme/muiTheme.ts` 定义，`ThemeRegistry.tsx` 包裹根布局。
- 两者共存时注意样式优先级冲突：优先用 CSS 变量 / 类名语义区分，避免 `!important` 滥用。
- MDX 渲染元素的样式由 `mdx-components.tsx` 中的 Tailwind 覆盖类统一定制。

## 8. 各职责模块映射（原 Agent 体系落地）

| 职责 | 对应文件 | 关键约束 |
| --- | --- | --- |
| 架构与依赖约定 | `package.json`、`tsconfig.json`、本文件 | 真实版本、全局规则 |
| 构建与环境 | `next.config.ts`、`postcss.config.mjs`、`eslint.config.mjs`、`globals.css` | 不写业务逻辑 |
| 内容读取（服务端） | `lib/content/getPosts.ts`、`getWorks.ts`、`types.ts` | 仅服务端，`server-only`，用 glob 而非仅 fs |
| MDX 渲染 | `lib/content/render-mdx.tsx`、`components/mdx/mdx-components.tsx` | 服务端编译；组件映射器可注册客户端组件 |
| UI 组件 | `components/ui/*`、`components/layout/*` | 单一职责、可复用、支持在 MDX 注册使用 |
| 媒体与 3D | `components/media/*`、`components/three/ModelViewer.tsx` | 懒加载、占位、错误兜底、卸载释放资源 |
| 页面路由 | `app/**/page.tsx`、`app/layout.tsx` | 薄组装层，复用底层模块，SSG |
| SEO 与爬虫 | `lib/seo/meta.ts`、`app/sitemap.ts`、`app/robots.ts` | 语义化、统一 metadata |

## 9. 常用命令

```bash
npm run dev        # 本地开发
npm run build      # 生产构建（next build）
npm run start      # 生产启动
npm run lint       # ESLint 校验（eslint .）
```

## 10. 修改本仓库时的高优先级清单

1. 新增页面：遵循 App Router 路由、服务端组件默认、SSG 优先，配置 `generateMetadata` 与 `generateStaticParams`（如为动态详情页）。
2. 新增 MDX 自定义组件：在 `mdx-components.tsx` 注册，组件自身需明确服务端 / 客户端边界。
3. 新增 Node API 调用：置于 `lib/content` 等 `server-only` 模块，禁止出现在 `'use client'` 文件。
4. 新增依赖：先确认可在 npm 检索到真实稳定版本，再写入 `package.json`，并评估体积与 tree-shaking。
5. 新增媒体 / 3D：必须带加载占位、错误兜底，3D 组件卸载时 dispose 渲染器 / 场景 / 纹理。