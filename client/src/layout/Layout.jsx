import React from "react";
import { Link } from "react-router-dom";
import './Layout.css'
import NavbarSide from "../components/navbarSide/NavbarSide.jsx";
import logo from '../logos/sticker.png'
import Navbar from '../navbar/Navbar.jsx'

const Layout = ({ children }) => {

    const useOldLayout = false;

    if (useOldLayout) {
        return (
            <section className='old-layout'>
                <Navbar />
                {children}
            </section>
        );
    }
    return (
        <section className="layout">
            <div className="leftSide">
                <Link to="/" className="layout-logo"><img src={logo}></img></Link>
                <NavbarSide></NavbarSide>
            </div>

            <div className="mainContent">
                <div className="header">
                    ToBe@Traveler
                </div>
                <div className="middleSide">
                    {children}
                </div>
                {/* <div className="rightSide">
                    5
                </div> */}
                {/* <div className="footer">
                    6
                </div> */}
            </div>
        </section>
    )
};



export default Layout;
