import React from 'react'
import './Layout.css'
import Navbar from '../navbar/Navbar'

const Layout = ({children}) => {
  return (
    <section className='app-container'>
        <Navbar></Navbar>
        <div className='app--main-content scrollable-div'>
            {children}
        </div>      
    </section>
  )
}

export default Layout