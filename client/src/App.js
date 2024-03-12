import React from 'react'
import './App.css'
import Navbar from './navbar/Navbar'
import MainContent from './components/MainContent'

const App = () => {
  return (
    <div className='app-container'>
      <Navbar></Navbar>
      <MainContent></MainContent>      
    </div>
  )
}

export default App