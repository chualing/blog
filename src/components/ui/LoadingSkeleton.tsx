import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

/**
 * 骨架屏加载占位（服务端组件）。
 * 供列表页 / 详情页数据未就绪时展示，配合 Suspense 提升体验。
 */
export default function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="rounded" width="100%" height={120} />
        </Box>
      ))}
    </Box>
  )
}