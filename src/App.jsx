import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LogIn from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Appointments from './Pages/Appointments'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Appointments' element={<Appointments />} />
      </Routes>
    </Router>
  )
}

export default App