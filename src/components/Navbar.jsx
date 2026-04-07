import {
  AppBar, Toolbar, Typography, IconButton,
  Avatar, Box, Badge, Button
} from '@mui/material'
import MenuIcon          from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon        from '@mui/icons-material/Logout'
import useAuth           from '../hooks/useAuth'
import { useNavigate }   from 'react-router-dom'

export default function Navbar({ onMenuClick, isMobile, sidebarWidth }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
        ml:    isMobile ? 0 : `${sidebarWidth}px`,
        bgcolor: 'white',
        color: 'text.primary',
        borderBottom: '1px solid #e0e0e0',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton onClick={onMenuClick} edge="start" sx={{ color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" fontWeight={600} fontSize={{ xs: 16, sm: 20 }}>
            Admin Panel
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar sx={{ bgcolor: '#ff6b35', width: 34, height: 34, fontSize: 14 }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </Avatar>
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            size="small"
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            Logout
          </Button>
          <IconButton
            onClick={handleLogout}
            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'text.secondary' }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}