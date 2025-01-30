import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import HomeIcon from '../icons/HomeIcon'
import TravelIcon from '../icons/TravelIcon'
import WeatherIcon from '../icons/WeatherIcon'
import ProfileIcon from '../icons/ProfileIcon'
import ShareIcon from '../icons/ShareIcon'
import LogOutIcon from '../icons/LogOutIcon'
import LogoutLink from '../components/LogoutLink'
import { useAuth } from '../hooks/useAuth.js'

const Navbar = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth();


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
          <li className={location.pathname === '/private-profile' ? 'navbar-link--active' : 'navbar-link'}>
            <Link to="/private-profile"><ProfileIcon></ProfileIcon></Link>
          </li>
          {isAuthenticated &&
            <li className='navbar-link'>
              <LogoutLink> <LogOutIcon></LogOutIcon> </LogoutLink>
            </li>
          }
        </ul>
      </nav>
    </div>
  )
}

export default Navbar