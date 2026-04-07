import {
  Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar,
  Typography, Divider, Box
} from '@mui/material'
import DashboardIcon    from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon    from '@mui/icons-material/Inventory'
import PeopleIcon       from '@mui/icons-material/People'
import LocalOfferIcon   from '@mui/icons-material/LocalOffer'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />,    path: '/'         },
  { label: 'Orders',    icon: <ShoppingCartIcon />, path: '/orders'   },
  { label: 'Products',  icon: <InventoryIcon />,    path: '/products' },
  { label: 'Users',     icon: <PeopleIcon />,       path: '/users'    },
  { label: 'Coupons',   icon: <LocalOfferIcon />,   path: '/coupons'  },
]

function SidebarContent({ onNavigate }) {
  const location = useLocation()
  return (
    <Box sx={{ bgcolor: '#1e1e2d', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="h6" fontWeight={700} color="white">
          MyAdmin
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ mt: 1 }}>
        {navItems.map(({ label, icon, path }) => {
          const active = location.pathname === path
          return (
            <ListItem key={label} disablePadding>
              <ListItemButton
                onClick={() => onNavigate(path)}
                sx={{
                  mx: 1, borderRadius: 2, mb: 0.5,
                  bgcolor: active ? '#ff6b35' : 'transparent',
                  '&:hover': {
                    bgcolor: active ? '#e55a28' : 'rgba(255,255,255,0.08)',
                  },
                  transition: 'background 0.2s',
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>{icon}</ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: 14, color: 'white' }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default function Sidebar({ width, mobileOpen, onClose, isMobile }) {
  const navigate = useNavigate()
  const handleNavigate = (path) => {
    navigate(path)
    if (isMobile) onClose()
  }

  const paperStyles = {
    width,
    boxSizing: 'border-box',
    bgcolor: '#1e1e2d',
    border: 'none',
  }

  return (
    <Box component="nav" sx={{ width: { md: width }, flexShrink: { md: 0 } }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': paperStyles }}
        >
          <SidebarContent onNavigate={handleNavigate} />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{ '& .MuiDrawer-paper': paperStyles }}
        >
          <SidebarContent onNavigate={handleNavigate} />
        </Drawer>
      )}
    </Box>
  )
}
