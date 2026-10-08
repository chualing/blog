import { createTheme } from '@mui/material/styles'

/**
 * MUI 主题定义。
 * 设计 token 与 Tailwind 主题（globals.css @theme）保持一致：
 * 墨黑文字 #1d1d1f、Apple 蓝 #0071e3、底色 #fbfbfd，保证全站设计语言统一。
 * MUI 主要用于 MDX 内嵌与高频通用组件，自定义页面优先使用 Tailwind。
 */
export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0071e3',
      dark: '#0062c4',
    },
    secondary: {
      main: '#2997ff',
    },
    background: {
      default: '#fbfbfd',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#6e6e73',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      '"SF Pro Display", "Inter", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 999,
          paddingLeft: 20,
          paddingRight: 20,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})
