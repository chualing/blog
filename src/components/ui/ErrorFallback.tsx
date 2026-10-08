import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface ErrorFallbackProps {
  message?: string
}

/**
 * 通用错误兜底 UI（服务端组件）。
 * 用于组件或页面加载失败时的降级展示，保证页面不至于白屏。
 */
export default function ErrorFallback({
  message = '内容加载失败，请稍后重试。',
}: ErrorFallbackProps) {
  return (
    <Box role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center">
      <Typography variant="body1" color="error">
        {message}
      </Typography>
    </Box>
  )
}
