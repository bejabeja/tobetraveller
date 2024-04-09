import React from "react";
import './Layout.css'
import Navbar from '../navbar/Navbar'

const Layout = ({ children }) => {
    return (
        <section className='main-app-container'>
            <Navbar></Navbar>
            {children}
        </section>
    )
};

export default Layout;
