import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      login({ name: form.email.split('@')[0], email: form.email })
      setLoading(false)
      navigate('/')
    }, 800)
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 2, sm: 4 },
    }}>
      <Box sx={{
        display: 'flex',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        maxWidth: 820,
        width: '100%',
        minHeight: 480,
        flexWrap: 'wrap',
      }}>

        {/* Left orange panel */}
        <Box sx={{
          flex: 1,
          minWidth: { xs: '100%', sm: 240 },
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          p: { xs: '36px 28px', sm: '48px 36px' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>
            🛡 MyAdmin
          </Typography>
          <Typography sx={{
            fontSize: { xs: 26, sm: 32 },
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.2,
          }}>
            My<br />admin panel,<br />is here.
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            Sign in to manage your dashboard, orders, products and users.
          </Typography>
          <Box sx={{
            width: 200, height: 200, borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
            position: 'absolute', bottom: -60, right: -60,
          }} />
          <Box sx={{
            width: 130, height: 130, borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.15)',
            position: 'absolute', bottom: -20, right: -20,
          }} />
        </Box>

        {/* Right white panel */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: 1,
            minWidth: { xs: '100%', sm: 280 },
            bgcolor: '#fff',
            p: { xs: '36px 28px', sm: '48px 40px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2.5,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', mb: 0.5 }}>
              Welcome back 👋
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#999' }}>
              Login to access your admin panel
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  '&:hover fieldset': { borderColor: '#ff6b35' },
                  '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' },
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  '&:hover fieldset': { borderColor: '#ff6b35' },
                  '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' },
              }}
            />
          </Box>

          {error && (
            <Box sx={{ bgcolor: '#fff5f5', borderRadius: 2, px: 2, py: 1.5 }}>
              <Typography sx={{ color: '#e53e3e', fontSize: 13 }}>⚠ {error}</Typography>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              bgcolor: '#ff6b35',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: 15,
              textTransform: 'none',
              '&:hover': { bgcolor: '#e55a28' },
              '&:disabled': { bgcolor: '#ffb59a', color: '#fff' },
            }}
          >
            {loading
              ? <CircularProgress size={22} sx={{ color: '#fff' }} />
              : 'Login →'
            }
          </Button>

          <Typography sx={{ fontSize: 12, color: '#bbb', textAlign: 'center' }}>
            Enter any email & password to login
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}