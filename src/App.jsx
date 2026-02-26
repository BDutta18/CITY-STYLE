import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './contexts/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import CartDrawer from './components/Cart/CartDrawer'
import BackToTop from './components/BackToTop'

const Home = lazy(() => import('./pages/Home'))
const SizeGuide = lazy(() => import('./pages/SizeGuide'))
const FAQ = lazy(() => import('./pages/FAQ'))
const About = lazy(() => import('./pages/About'))
const Auth = lazy(() => import('./pages/Auth'))
const Career = lazy(() => import('./pages/Career'))
const CoatsParkas = lazy(() => import('./pages/CoatsParkas'))
const Contact = lazy(() => import('./pages/Contact'))
const HoodiesSweatshirts = lazy(() => import('./pages/HoodiesSweatshirts'))
const InstagramTrending = lazy(() => import('./pages/InstagramTrending'))
const OrderTracking = lazy(() => import('./pages/OrderTracking'))
const OversizedTShirt = lazy(() => import('./pages/OversizedTShirt'))
const LegalNotice = lazy(() => import('./pages/LegalNotice'))
const Profile = lazy(() => import('./pages/Profile'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Shop = lazy(() => import('./pages/Shop'))
const StoreLocation = lazy(() => import('./pages/StoreLocation'))
const Support = lazy(() => import('./pages/Support'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const Under40 = lazy(() => import('./pages/Under40'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderDetail = lazy(() => import('./pages/OrderDetail'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <CartDrawer />
          <BackToTop />
          <Suspense fallback={<div className="loading-screen">Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/size-guide' element={<SizeGuide />} />
              <Route path='/faq' element={<FAQ />} />
              
              {/* Migrated Routes */}
              <Route path='/about' element={<About />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/career' element={<Career />} />
              <Route path='/coats-parkas' element={<NotFound />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/hoodies-sweatshirts' element={<NotFound />} />
              <Route path='/instagram-trending' element={<NotFound />} />
              <Route path='/order-tracking' element={<NotFound />} />
              <Route path='/oversized-tshirt' element={<NotFound />} />
              <Route path='/privacy' element={<NotFound />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/product/:slug' element={<ProductDetail />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/store-location' element={<NotFound />} />
              <Route path='/support' element={<Support />} />
              <Route path='/terms' element={<TermsConditions />} />
              <Route path='/under-40' element={<NotFound />} />
              <Route path='*' element={<NotFound />} />

              {/* Upstream Routes */}
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/orders/:orderId' element={<OrderDetail />} />
              <Route path='/order-confirmation/:orderId' element={<OrderConfirmation />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
