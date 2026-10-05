/**
 * Tailwind CSS v4 采用 CSS-first 配置，通过 @tailwindcss/postcss 插件接入构建链路。
 * 无需 tailwind.config.js，配置以 globals.css 内指令 + 主题变量承载。
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config