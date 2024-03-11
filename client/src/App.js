import React from 'react'
import './App.css'
import Places from './places/Places'
import Navbar from './navbar/Navbar'

const App = () => {
  return (
    <div className='app-container'>
      <Navbar></Navbar>
      <div className='app--main-content scrollable-div'>
        <Places></Places>
        <Places></Places>
        <Places></Places>
        <Places></Places>
      </div>
    </div>
  )
}

export default App