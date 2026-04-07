import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar  from './Navbar'
import Sidebar from './Sidebar'

const SIDEBAR_WIDTH = 240

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme    = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        width={SIDEBAR_WIDTH}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isMobile={isMobile}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: isMobile ? '100%' : `calc(100% - ${SIDEBAR_WIDTH}px)`,
          minWidth: 0,
        }}
      >
        <Navbar
          onMenuClick={() => setMobileOpen(true)}
          isMobile={isMobile}
          sidebarWidth={SIDEBAR_WIDTH}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            mt: '64px',
            bgcolor: '#f5f5f5',
            minHeight: 'calc(100vh - 64px)',
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}