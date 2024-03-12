import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Share from './pages/Share'
import Discover from './pages/Discover'
import Profile from './pages/Profile'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/weather' element={<Weather />} />
        <Route path='/share' element={<Share />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App