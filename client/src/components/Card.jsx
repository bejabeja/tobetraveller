import React from 'react'
import './Components.css'
import { Link } from 'react-router-dom'

const Card = ({ image, id, countryName, cityName, countryText, countryCode }) => {

  // const countryFlag = `https://flagcdn.com/${countryCode}.svg` ?? 'placeholder.svg';
  return (
    <Link to={`/discover/${id}`} className='card'>
      <img src='placeholder.svg' alt='country card' className='card--img'></img>
      <div className='card--body'>
        <h3><span>{cityName}</span> , {countryName}</h3>
        <p>{countryText}</p>
      </div>
    </Link>

  )
}

export default Card