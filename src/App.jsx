import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SizeGuide from './pages/SizeGuide'
import FAQ from './pages/FAQ'
import About from './pages/About'
import Auth from './pages/Auth'
import Career from './pages/Career'
import CoatsParkas from './pages/CoatsParkas'
import Contact from './pages/Contact'
import HoodiesSweatshirts from './pages/HoodiesSweatshirts'
import InstagramTrending from './pages/InstagramTrending'
import OrderTracking from './pages/OrderTracking'
import OversizedTShirt from './pages/OversizedTShirt'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Profile from './pages/Profile'
import Shop from './pages/Shop'
import StoreLocation from './pages/StoreLocation'
import Support from './pages/Support'
import TermsConditions from './pages/TermsConditions'
import Under40 from './pages/Under40'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/size-guide' element={<SizeGuide />} />
        <Route path='/faq' element={<FAQ />} />
        
        {/* Migrated Routes */}
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/career' element={<Career />} />
        <Route path='/coats-parkas' element={<CoatsParkas />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/hoodies-sweatshirts' element={<HoodiesSweatshirts />} />
        <Route path='/instagram-trending' element={<InstagramTrending />} />
        <Route path='/order-tracking' element={<OrderTracking />} />
        <Route path='/oversized-tshirt' element={<OversizedTShirt />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/store-location' element={<StoreLocation />} />
        <Route path='/support' element={<Support />} />
        <Route path='/terms' element={<TermsConditions />} />
        <Route path='/under-40' element={<Under40 />} />
      </Routes>
    </Router>
  )
}

export default App
