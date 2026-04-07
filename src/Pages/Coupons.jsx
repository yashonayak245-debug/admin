import { useState } from 'react'
import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, TextField, InputAdornment, Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Tooltip,
} from '@mui/material'
import SearchIcon        from '@mui/icons-material/Search'
import AddIcon           from '@mui/icons-material/Add'
import EditIcon          from '@mui/icons-material/Edit'
import DeleteIcon        from '@mui/icons-material/Delete'
import LocalOfferIcon    from '@mui/icons-material/LocalOffer'
import ContentCopyIcon   from '@mui/icons-material/ContentCopy'
import { useData }       from '../context/DataContext'

const TYPES = ['Percentage', 'Flat']

const emptyForm = {
  code: '', discount: '', type: 'Percentage', minOrder: '', expiry: '', status: 'Active',
}

export default function Coupons() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useData()

  const [search,        setSearch]        = useState('')
  const [open,          setOpen]          = useState(false)
  const [editId,        setEditId]        = useState(null)
  const [form,          setForm]          = useState(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [copied,        setCopied]        = useState(null)

  const filtered = coupons.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditId(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (coupon) => {
    setEditId(coupon.id)
    setForm({
      code: coupon.code, discount: coupon.discount, type: coupon.type,
      minOrder: coupon.minOrder, expiry: coupon.expiry, status: coupon.status,
    })
    setOpen(true)
  }

  const handleSave = () => {
    if (!form.code || !form.discount) return
    const data = { ...form, discount: Number(form.discount), minOrder: Number(form.minOrder), code: form.code.toUpperCase() }
    if (editId) updateCoupon(editId, data)
    else        addCoupon(data)
    setOpen(false)
  }

  const handleDelete = (id) => {
    deleteCoupon(id)
    setDeleteConfirm(null)
  }

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: 18, sm: 22 }}>
        Coupons
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Coupons', value: coupons.length,                              color: '#4361ee' },
          { label: 'Active',        value: coupons.filter(c => c.status === 'Active').length,  color: '#2e7d32' },
          { label: 'Expired',       value: coupons.filter(c => c.status === 'Expired').length, color: '#c62828' },
        ].map(({ label, value, color }) => (
          <Card key={label} elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2, flex: '1 1 120px' }}>
            <Box sx={{ bgcolor: color, borderRadius: 2, p: 1, display: 'flex', color: 'white' }}>
              <LocalOfferIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">{label}</Typography>
              <Typography fontWeight={700} fontSize={20}>{value}</Typography>
            </Box>
          </Card>
        ))}
      </Box>

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography fontWeight={600}>All Coupons ({filtered.length})</Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              size="small"
              placeholder="Search coupon code..."
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
              Add Coupon
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                {['Coupon Code', 'Discount', 'Type', 'Min Order', 'Expiry', 'Status', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((coupon) => (
                <TableRow key={coupon.id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body2" fontWeight={700}
                        sx={{ fontFamily: 'monospace', bgcolor: '#f5f5f5', px: 1.5, py: 0.5, borderRadius: 1, letterSpacing: 1 }}
                      >
                        {coupon.code}
                      </Typography>
                      <Tooltip title={copied === coupon.code ? 'Copied!' : 'Copy'}>
                        <IconButton size="small" onClick={() => handleCopy(coupon.code)} sx={{ color: copied === coupon.code ? '#2e7d32' : 'text.secondary' }}>
                          <ContentCopyIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {coupon.type === 'Percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={coupon.type} size="small" sx={{ fontSize: 11, fontWeight: 600, bgcolor: coupon.type === 'Percentage' ? '#e3f2fd' : '#fce4ec', color: coupon.type === 'Percentage' ? '#1565c0' : '#880e4f' }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">${coupon.minOrder}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{coupon.expiry}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={coupon.status} color={coupon.status === 'Active' ? 'success' : 'default'} size="small" sx={{ fontWeight: 600, fontSize: 11 }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => openEdit(coupon)} sx={{ color: '#4361ee' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => setDeleteConfirm(coupon.id)} sx={{ color: '#e53935' }}>
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
        <DialogTitle fontWeight={700}>{editId ? 'Edit Coupon' : 'Add New Coupon'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
          <TextField
            label="Coupon Code" value={form.code}
            onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
            fullWidth size="small" required
            inputProps={{ style: { fontFamily: 'monospace', letterSpacing: 2, fontWeight: 700 } }}
          />
          <TextField select label="Discount Type" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} fullWidth size="small">
            {TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <TextField
            label={form.type === 'Percentage' ? 'Discount (%)' : 'Discount ($)'}
            type="number" value={form.discount}
            onChange={e => setForm(p => ({ ...p, discount: e.target.value }))}
            fullWidth size="small" required
          />
          <TextField label="Min Order ($)" type="number" value={form.minOrder} onChange={e => setForm(p => ({ ...p, minOrder: e.target.value }))} fullWidth size="small" />
          <TextField label="Expiry Date" type="date" value={form.expiry} onChange={e => setForm(p => ({ ...p, expiry: e.target.value }))} fullWidth size="small" InputLabelProps={{ shrink: true }} />
          <TextField select label="Status" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} fullWidth size="small">
            {['Active', 'Expired'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a28' }, textTransform: 'none', fontWeight: 600 }}>
            {editId ? 'Update' : 'Add Coupon'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>Delete Coupon?</DialogTitle>
        <DialogContent><Typography>Kya aap sure hain? Yeh coupon permanently delete ho jaayega.</Typography></DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteConfirm(null)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteConfirm)} variant="contained" color="error" sx={{ textTransform: 'none', fontWeight: 600 }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
