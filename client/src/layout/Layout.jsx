import React from 'react'
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <section className='app-container'>
      <div className='app--main-content scrollable-div'>
        {children}
      </div>
    </section>
  )
}

export default Layout