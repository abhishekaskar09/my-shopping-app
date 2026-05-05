import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Product from './pages/product/Product'
import Login from './auth/login'
import Signup from './auth/Signup'
import Cart from './pages/cart/Cart'
import CheckOut from './pages/checkout/CheckOut'
import Payment from './pages/payment/Payment'
import OrderHistory from './pages/ordersHistory/OrderHistory'
import SingleProductDetail from './pages/productDetails/SingleProductDetail'
  

// rounting for  url pages
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Product/> },
      { path: '/productDetails/:id', element: <SingleProductDetail/> },
      { path: '/cart', element: <Cart/> },
      { path: '/login', element: <Login/> },
      { path: '/signup', element: <Signup/> },
      { path: '/checkout', element: <CheckOut/> },
      { path: '/payment', element: <Payment/> },
      { path: '/orderHistory', element: <OrderHistory/> },
    ]
  }
])