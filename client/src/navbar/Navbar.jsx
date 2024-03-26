import React from 'react'
import './Navbar.css'
import HomeIcon from '../icons/HomeIcon'
import TravelIcon from '../icons/TravelIcon'
import WeatherIcon from '../icons/WeatherIcon'
import ProfileIcon from '../icons/ProfileIcon'
import ShareIcon from '../icons/ShareIcon'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  return (
    <div className='app-navbar'>
      <nav className='navbar-list'>
        <ul className='navbar-links'>
          <li className={location.pathname === '/' ? 'navbar-link--active' : 'navbar-link'}>
            <Link to="/"><HomeIcon></HomeIcon></Link>
          </li>
          <li className={location.pathname === '/discover' ? 'navbar-link--active' : 'navbar-link'}>
            <Link to="/discover"><TravelIcon></TravelIcon></Link>
          </li>
          {/* <li className={location.pathname === '/weather' ? 'navbar-link--active' : 'navbar-link'}>
            <Link to="/weather"><WeatherIcon></WeatherIcon></Link>
          </li>
          <li className={location.pathname === '/share' ? 'navbar-link--active' : 'navbar-link'}>
            <Link to="/share"><ShareIcon></ShareIcon></Link>
          </li> */}
          <li className={location.pathname === '/profile' ? 'navbar-link--active' : 'navbar-link'}>
            <Link to="/profile"><ProfileIcon></ProfileIcon></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar