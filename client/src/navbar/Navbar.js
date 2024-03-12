import React from 'react'
import './Navbar.css'
import HomeIcon from '../icons/HomeIcon'
import TravelIcon from '../icons/TravelIcon'
import WeatherIcon from '../icons/WeatherIcon'
import ProfileIcon from '../icons/ProfileIcon'
import ShareIcon from '../icons/ShareIcon'

const Navbar = () => {
  return (
    <div className='app-navbar'>
        <nav className='navbar-list'>
          <ul className='navbar-links'>
            <li><a href="/"><HomeIcon></HomeIcon></a></li>
            <li><a href="/"><TravelIcon></TravelIcon></a></li>
            <li><a href="/"><WeatherIcon></WeatherIcon></a></li>
            <li><a href="/"><ShareIcon></ShareIcon></a></li>
            <li><a href="/"><ProfileIcon></ProfileIcon></a></li>
          </ul>
        </nav>
      </div>
  )
}

export default Navbar