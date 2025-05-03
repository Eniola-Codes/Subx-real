import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './routes/_index'
import InvestorSignup from './routes/signup/investor'
import DeveloperSignup from './routes/signup/developer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/investor" element={<InvestorSignup />} />
        <Route path="/signup/developer" element={<DeveloperSignup />} />
      </Routes>
    </Router>
  )
}

export default App
