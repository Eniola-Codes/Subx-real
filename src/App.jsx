import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import InvestorSignup from './routes/signup/investor'
import DeveloperSignup from './routes/signup/developer'
import InvestorDashboard from './routes/dashboard/investor'
import DeveloperDashboard from './routes/dashboard/developer'
import AdminDashboard from './routes/dashboard/admin'
import Messaging from './routes/messaging/Messaging'
import ToastProvider from './components/ToastProvider'

const App = () => {
  return (
    <Router>
      <ToastProvider />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/investor" element={<InvestorSignup />} />
        <Route path="/signup/developer" element={<DeveloperSignup />} />
        <Route path="/dashboard/investor" element={<InvestorDashboard />} />
        <Route path="/dashboard/developer" element={<DeveloperDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/messaging" element={<Messaging />} />
      </Routes>
    </Router>
  )
}

export default App
