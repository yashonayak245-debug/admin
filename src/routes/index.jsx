import { Routes, Route, Navigate } from 'react-router-dom'
import Layout       from '../components/Layout'
import PrivateRoute from '../components/PrivateRoute'
import Dashboard    from '../pages/Dashboard'
import Login        from '../pages/Login'
import Orders       from '../pages/Orders'
import Products     from '../pages/Products'
import User         from '../pages/Users'
import Coupons      from '../pages/Coupons'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index           element={<Dashboard />} />
        <Route path="orders"   element={<Orders />}   />
        <Route path="products" element={<Products />} />
        <Route path="users"    element={<User />}     />
        <Route path="coupons"  element={<Coupons />}  />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
