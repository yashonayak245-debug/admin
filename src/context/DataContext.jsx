import { createContext, useState, useContext } from 'react'

const DataContext = createContext(null)

const initialProducts = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99,  stock: 45, status: 'In Stock'     },
  { id: 2, name: 'Running Shoes',       category: 'Footwear',    price: 120, stock: 12, status: 'Low Stock'    },
  { id: 3, name: 'Coffee Maker',        category: 'Appliances',  price: 75,  stock: 0,  status: 'Out of Stock' },
  { id: 4, name: 'Yoga Mat',            category: 'Fitness',     price: 35,  stock: 80, status: 'In Stock'     },
  { id: 5, name: 'Smartwatch',          category: 'Electronics', price: 199, stock: 20, status: 'In Stock'     },
  { id: 6, name: 'Desk Lamp',           category: 'Furniture',   price: 45,  stock: 5,  status: 'Low Stock'    },
]

const initialOrders = [
  { id: '#1023', customer: 'Ravi Kumar',  email: 'ravi@gmail.com',   date: 'Apr 1, 2026', status: 'Delivered', amount: 120 },
  { id: '#1024', customer: 'Priya Singh', email: 'priya@gmail.com',  date: 'Apr 2, 2026', status: 'Pending',   amount: 89  },
  { id: '#1025', customer: 'Amit Verma',  email: 'amit@gmail.com',   date: 'Apr 3, 2026', status: 'Cancelled', amount: 340 },
  { id: '#1026', customer: 'Neha Gupta',  email: 'neha@gmail.com',   date: 'Apr 4, 2026', status: 'Delivered', amount: 210 },
  { id: '#1027', customer: 'Suresh Rao',  email: 'suresh@gmail.com', date: 'Apr 5, 2026', status: 'Pending',   amount: 175 },
  { id: '#1028', customer: 'Meera Patel', email: 'meera@gmail.com',  date: 'Apr 5, 2026', status: 'Delivered', amount: 95  },
]

const initialCoupons = [
  { id: 1, code: 'SAVE10',   discount: 10, type: 'Percentage', minOrder: 50,  expiry: '2026-06-30', status: 'Active'   },
  { id: 2, code: 'FLAT50',   discount: 50, type: 'Flat',       minOrder: 200, expiry: '2026-05-15', status: 'Active'   },
  { id: 3, code: 'SUMMER20', discount: 20, type: 'Percentage', minOrder: 100, expiry: '2026-04-01', status: 'Expired'  },
]

export function DataProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)
  const [orders,   setOrders]   = useState(initialOrders)
  const [coupons,  setCoupons]  = useState(initialCoupons)

  // ── Products ──────────────────────────────────────────
  const addProduct = (product) => {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1
    setProducts(prev => [...prev, { ...product, id: newId }])
  }
  const updateProduct = (id, updated) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p))
  const deleteProduct = (id) =>
    setProducts(prev => prev.filter(p => p.id !== id))

  // ── Orders ────────────────────────────────────────────
  const addOrder = (order) => {
    const nums  = orders.map(o => parseInt(o.id.replace('#', ''))).filter(Boolean)
    const newId = '#' + ((nums.length ? Math.max(...nums) : 1028) + 1)
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    setOrders(prev => [...prev, { ...order, id: newId, date: today }])
  }
  const updateOrder = (id, updated) =>
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updated } : o))
  const deleteOrder = (id) =>
    setOrders(prev => prev.filter(o => o.id !== id))

  // ── Coupons ───────────────────────────────────────────
  const addCoupon = (coupon) => {
    const newId = coupons.length ? Math.max(...coupons.map(c => c.id)) + 1 : 1
    setCoupons(prev => [...prev, { ...coupon, id: newId }])
  }
  const updateCoupon = (id, updated) =>
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c))
  const deleteCoupon = (id) =>
    setCoupons(prev => prev.filter(c => c.id !== id))

  return (
    <DataContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      orders,   addOrder,   updateOrder,   deleteOrder,
      coupons,  addCoupon,  updateCoupon,  deleteCoupon,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
