import { useState } from 'react'
import {
  Box, Typography, Card, Grid, CardContent, Chip,
  TextField, InputAdornment, Button, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Tooltip,
} from '@mui/material'
import SearchIcon    from '@mui/icons-material/Search'
import AddIcon       from '@mui/icons-material/Add'
import EditIcon      from '@mui/icons-material/Edit'
import DeleteIcon    from '@mui/icons-material/Delete'
import InventoryIcon from '@mui/icons-material/Inventory'
import { useData }   from '../context/DataContext'

const CATEGORIES = ['Electronics', 'Footwear', 'Appliances', 'Fitness', 'Furniture', 'Other']
const STATUSES   = ['In Stock', 'Low Stock', 'Out of Stock']

const stockConfig = {
  'In Stock':     'success',
  'Low Stock':    'warning',
  'Out of Stock': 'error',
}

const categoryColors = {
  Electronics: '#4361ee',
  Footwear:    '#7209b7',
  Appliances:  '#f72585',
  Fitness:     '#2e7d32',
  Furniture:   '#e65100',
  Other:       '#555',
}

const emptyForm = { name: '', category: 'Electronics', price: '', stock: '', status: 'In Stock' }

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useData()

  const [search,      setSearch]      = useState('')
  const [open,        setOpen]        = useState(false)
  const [editId,      setEditId]      = useState(null)
  const [form,        setForm]        = useState(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null) // product id to delete

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditId(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (product) => {
    setEditId(product.id)
    setForm({ name: product.name, category: product.category, price: product.price, stock: product.stock, status: product.status })
    setOpen(true)
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) }
    if (editId) updateProduct(editId, data)
    else        addProduct(data)
    setOpen(false)
  }

  const handleDelete = (id) => {
    deleteProduct(id)
    setDeleteConfirm(null)
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3} fontSize={{ xs: 18, sm: 22 }}>
        Products
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography color="text.secondary" fontSize={14}>Showing {filtered.length} products</Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Search products..."
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
            Add Product
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {filtered.map((product) => (
          <Grid item xs={12} sm={6} lg={4} key={product.id}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', height: '100%', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }, transition: 'box-shadow 0.2s' }}>
              <Box sx={{ bgcolor: categoryColors[product.category] || '#4361ee', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                <InventoryIcon sx={{ color: 'white', fontSize: 36 }} />
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => openEdit(product)} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' } }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => setDeleteConfirm(product.id)} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(220,50,50,0.5)' } }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography fontWeight={600} fontSize={15}>{product.name}</Typography>
                  <Chip label={product.status} color={stockConfig[product.status]} size="small" sx={{ fontSize: 10, fontWeight: 600 }} />
                </Box>
                <Typography variant="caption" color="text.secondary">{product.category}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography fontWeight={700} fontSize={18} color="primary">${product.price}</Typography>
                  <Typography variant="caption" color="text.secondary">Stock: {product.stock}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>{editId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
          <TextField label="Product Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} fullWidth size="small" required />
          <TextField select label="Category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} fullWidth size="small">
            {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
          <TextField label="Price ($)" type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} fullWidth size="small" required />
          <TextField label="Stock Quantity" type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} fullWidth size="small" />
          <TextField select label="Status" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} fullWidth size="small">
            {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a28' }, textTransform: 'none', fontWeight: 600 }}>
            {editId ? 'Update' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>Delete Product?</DialogTitle>
        <DialogContent><Typography>Kya aap sure hain? Yeh product permanently delete ho jaayega.</Typography></DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteConfirm(null)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteConfirm)} variant="contained" color="error" sx={{ textTransform: 'none', fontWeight: 600 }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
