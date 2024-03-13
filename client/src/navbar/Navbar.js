import React from 'react'
import './Navbar.css'
import HomeIcon from '../icons/HomeIcon'
import TravelIcon from '../icons/TravelIcon'
import WeatherIcon from '../icons/WeatherIcon'
import ProfileIcon from '../icons/ProfileIcon'
import ShareIcon from '../icons/ShareIcon'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  return (
    <div className='app-navbar'>
        <nav className='navbar-list'>
          <ul className='navbar-links'>
            <li className={location.pathname === '/' ? 'navbar-link--active' : 'navbar-link'}>
              <a href="/"><HomeIcon></HomeIcon></a>
            </li>
            <li className={location.pathname === '/discover' ? 'navbar-link--active' : 'navbar-link'}>
              <a href="/discover"><TravelIcon></TravelIcon></a>
            </li>
            <li className={location.pathname === '/weather' ? 'navbar-link--active' : 'navbar-link'}>
              <a href="/weather"><WeatherIcon></WeatherIcon></a>
            </li>
            <li className={location.pathname === '/share' ? 'navbar-link--active' : 'navbar-link'}>
              <a href="/share"><ShareIcon></ShareIcon></a>
            </li>
            <li className={location.pathname === '/profile' ? 'navbar-link--active' : 'navbar-link'}>
              <a href="/profile"><ProfileIcon></ProfileIcon></a>
            </li>
          </ul>
        </nav>
      </div>
  )
}

export default Navbar