import { useState } from 'react'
import {
  Box, Typography, Card, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, TextField,
  InputAdornment, Avatar
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const allUsers = [
  { id: 1, name: 'Ravi Kumar',  email: 'ravi@gmail.com',  role: 'Admin',  status: 'Active',   joined: 'Jan 2026' },
  { id: 2, name: 'Priya Singh', email: 'priya@gmail.com', role: 'Editor', status: 'Active',   joined: 'Feb 2026' },
  { id: 3, name: 'Amit Verma',  email: 'amit@gmail.com',  role: 'Viewer', status: 'Inactive', joined: 'Mar 2026' },
  { id: 4, name: 'Neha Gupta',  email: 'neha@gmail.com',  role: 'Editor', status: 'Active',   joined: 'Mar 2026' },
  { id: 5, name: 'Suresh Rao',  email: 'suresh@gmail.com',role: 'Viewer', status: 'Active',   joined: 'Apr 2026' },
]

const avatarColors = ['#ff6b35', '#7209b7', '#f72585', '#3a0ca3', '#2e7d32']

export default function User() {
  const [search, setSearch] = useState('')

  const filtered = allUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: 18, sm: 22 }}>
        Users
      </Typography>
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography fontWeight={600}>All Users ({filtered.length})</Typography>
          <TextField
            size="small"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: 250 } }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                {['User', 'Role', 'Status', 'Joined'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((user, i) => (
                <TableRow key={user.id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 36, height: 36, fontSize: 14, bgcolor: avatarColors[i % avatarColors.length] }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.role}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === 'Active' ? 'success' : 'default'}
                      size="small"
                      sx={{ fontWeight: 600, fontSize: 11 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.joined}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}