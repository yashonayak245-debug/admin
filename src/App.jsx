import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import AuthProvider from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import AppRoutes from './routes/index'

const theme = createTheme({
  palette: { mode: 'light' },
})

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  )
}
