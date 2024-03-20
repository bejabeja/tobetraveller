import React from 'react'
import './Layout.css'
import Navbar from '../navbar/Navbar'

const DashboardLayout = ({ children }) => {
    return (
        <section className='app-container'>
            <Navbar></Navbar>
            <div className='app--main-content scrollable-div'>
                {children}
            </div>
        </section>
    )
}

export default DashboardLayout