import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FAQ from './pages/FAQ'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes here as we migrate them */}
        <Route path="faq" element={<FAQ />} />
      </Routes>
    </Router>
  )
}

export default App
