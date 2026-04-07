import { useState } from 'react'
import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, TextField, InputAdornment, Button, IconButton,
  Avatar, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Tooltip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon    from '@mui/icons-material/Add'
import EditIcon   from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useData } from '../context/DataContext'

const STATUSES = ['Delivered', 'Pending', 'Cancelled']

const statusConfig = {
  Delivered: { color: 'success' },
  Pending:   { color: 'warning' },
  Cancelled: { color: 'error'   },
}

const emptyForm = { customer: '', email: '', status: 'Pending', amount: '' }

export default function Orders() {
  const { orders, addOrder, updateOrder, deleteOrder } = useData()

  const [search,        setSearch]        = useState('')
  const [open,          setOpen]          = useState(false)
  const [editId,        setEditId]        = useState(null)
  const [form,          setForm]          = useState(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const filtered = orders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditId(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (order) => {
    setEditId(order.id)
    setForm({ customer: order.customer, email: order.email, status: order.status, amount: order.amount })
    setOpen(true)
  }

  const handleSave = () => {
    if (!form.customer || !form.amount) return
    const data = { ...form, amount: Number(form.amount) }
    if (editId) updateOrder(editId, data)
    else        addOrder(data)
    setOpen(false)
  }

  const handleDelete = (id) => {
    deleteOrder(id)
    setDeleteConfirm(null)
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: 18, sm: 22 }}>
        Orders
      </Typography>

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography fontWeight={600}>All Orders ({filtered.length})</Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              size="small"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
              sx={{ width: { xs: '100%', sm: 220 } }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openAdd}
              sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a28' }, borderRadius: 2, textTransform: 'none', fontWeight: 600, flexShrink: 0 }}
            >
              Add Order
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                {['Order ID', 'Customer', 'Date', 'Status', 'Amount', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="primary">{order.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: '#ff6b35' }}>
                        {order.customer.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>{order.customer}</Typography>
                        <Typography variant="caption" color="text.secondary">{order.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={order.status} color={statusConfig[order.status].color} size="small" sx={{ fontWeight: 600, fontSize: 11 }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>${order.amount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => openEdit(order)} sx={{ color: '#4361ee' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => setDeleteConfirm(order.id)} sx={{ color: '#e53935' }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>{editId ? 'Edit Order' : 'Add New Order'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
          <TextField label="Customer Name" value={form.customer} onChange={e => setForm(p => ({ ...p, customer: e.target.value }))} fullWidth size="small" required />
          <TextField label="Email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} fullWidth size="small" />
          <TextField select label="Status" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} fullWidth size="small">
            {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <TextField label="Amount ($)" type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} fullWidth size="small" required />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a28' }, textTransform: 'none', fontWeight: 600 }}>
            {editId ? 'Update' : 'Add Order'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>Delete Order?</DialogTitle>
        <DialogContent><Typography>Kya aap sure hain? Yeh order permanently delete ho jaayega.</Typography></DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteConfirm(null)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteConfirm)} variant="contained" color="error" sx={{ textTransform: 'none', fontWeight: 600 }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
