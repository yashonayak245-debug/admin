import {
  Grid, Card, CardContent, Typography,
  Box, Divider
} from '@mui/material'
import PeopleIcon       from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon    from '@mui/icons-material/Inventory'
import AttachMoneyIcon  from '@mui/icons-material/AttachMoney'
import TrendingUpIcon   from '@mui/icons-material/TrendingUp'

const stats = [
  { label: 'Total Users',  value: '3,240', icon: <PeopleIcon />,       color: '#4361ee', trend: '+12%' },
  { label: 'Total Orders', value: '1,820', icon: <ShoppingCartIcon />, color: '#3a0ca3', trend: '+8%'  },
  { label: 'Products',     value: '540',   icon: <InventoryIcon />,    color: '#7209b7', trend: '+3%'  },
  { label: 'Revenue',      value: '$12.4k',icon: <AttachMoneyIcon />,  color: '#f72585', trend: '+18%' },
]

const recentOrders = [
  { id: '#1023', customer: 'Ravi Kumar',  status: 'Delivered', amount: '$120' },
  { id: '#1024', customer: 'Priya Singh', status: 'Pending',   amount: '$89'  },
  { id: '#1025', customer: 'Amit Verma',  status: 'Cancelled', amount: '$340' },
  { id: '#1026', customer: 'Neha Gupta',  status: 'Delivered', amount: '$210' },
]

const statusColor = {
  Delivered: '#2e7d32',
  Pending:   '#e65100',
  Cancelled: '#c62828',
}

export default function Dashboard() {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: 18, sm: 22 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        {stats.map(({ label, value, icon, color, trend }) => (
          <Grid item xs={6} lg={3} key={label}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', bgcolor: 'white', height: '100%' }}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                  <Box sx={{ bgcolor: color, borderRadius: 2, p: { xs: 1, sm: 1.5 }, display: 'flex', color: 'white', flexShrink: 0 }}>
                    {icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography color="text.secondary" fontSize={{ xs: 11, sm: 12 }} noWrap>{label}</Typography>
                    <Typography fontWeight={700} fontSize={{ xs: 16, sm: 20 }}>{value}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                      <TrendingUpIcon sx={{ fontSize: 12, color: 'success.main' }} />
                      <Typography variant="caption" color="success.main" fontWeight={600} fontSize={10}>{trend}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card elevation={0} sx={{ mt: 3, borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" fontWeight={600} fontSize={{ xs: 15, sm: 18 }}>Recent Orders</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: { xs: 'none', sm: 'grid' }, gridTemplateColumns: '1fr 2fr 1fr 1fr', px: 3, py: 1.5, bgcolor: '#fafafa' }}>
          {['Order ID', 'Customer', 'Status', 'Amount'].map(h => (
            <Typography key={h} variant="caption" fontWeight={600} color="text.secondary" textTransform="uppercase">{h}</Typography>
          ))}
        </Box>
        <Divider sx={{ display: { xs: 'none', sm: 'block' } }} />
        {recentOrders.map((order, i) => (
          <Box key={order.id}>
            <Box sx={{ display: { xs: 'none', sm: 'grid' }, gridTemplateColumns: '1fr 2fr 1fr 1fr', px: 3, py: 2, alignItems: 'center', '&:hover': { bgcolor: '#fafafa' } }}>
              <Typography variant="body2" fontWeight={600} color="primary">{order.id}</Typography>
              <Typography variant="body2">{order.customer}</Typography>
              <Typography variant="body2" fontWeight={600} sx={{ color: statusColor[order.status] }}>{order.status}</Typography>
              <Typography variant="body2" fontWeight={600}>{order.amount}</Typography>
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, '&:hover': { bgcolor: '#fafafa' } }}>
              <Box>
                <Typography variant="body2" fontWeight={600} color="primary">{order.id}</Typography>
                <Typography variant="caption" color="text.secondary">{order.customer}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: statusColor[order.status] }}>{order.status}</Typography>
                <Typography variant="caption" fontWeight={600}>{order.amount}</Typography>
              </Box>
            </Box>
            {i < recentOrders.length - 1 && <Divider />}
          </Box>
        ))}
      </Card>
    </Box>
  )
}