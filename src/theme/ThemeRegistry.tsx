'use client'

import { useMemo, type ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { muiTheme } from './muiTheme'

/**
 * MUI 与 Next App Router 的集成层（客户端组件）。
 * - AppRouterCacheProvider 处理 Emotion SSR 样式注入，避免首屏样式闪烁。
 * - ThemeProvider 注入统一主题，CssBaseline 保证基础样式一致性。
 * 作为客户端组件挂载在根布局顶层，不参与具体页面业务。
 */
export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const theme = useMemo(() => muiTheme, [])
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
