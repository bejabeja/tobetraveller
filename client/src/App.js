import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Places from './components/places/Places'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/discover' element={<Places />} />
        <Route path='/weather' element={<Places />} />
        <Route path='/share' element={<Places />} />
        <Route path='/profile' element={<Places />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App