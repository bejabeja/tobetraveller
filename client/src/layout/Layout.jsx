import React from "react";
import './Layout.css'
import Navbar from '../navbar/Navbar.jsx'

const Layout = ({ children }) => {
    return (
        <section className='main-app-container'>
            <Navbar></Navbar>
            {children}
        </section>
    )
};

export default Layout;
