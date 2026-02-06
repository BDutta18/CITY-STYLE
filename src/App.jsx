import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SizeGuide from './pages/SizeGuide'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        {/* Add other routes here as we migrate them */}
      </Routes>
    </Router>
  )
}

export default App
