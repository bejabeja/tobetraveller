import React from 'react'
import ButtonLink from './ButtonLink'
import './Components.css'

const Card = ({image, id, countryName, cityName, countryText}) => {
  return (
    <a href='/discover?id={id}' className='card'>
        <img src='placeholder.svg' alt='country card' className='card--img'></img>
        <div className='card--body'>
            <h3><span>{cityName}</span> , {countryName}</h3>
            <p>{countryText}</p>
        </div>
    </a>

  )
}

export default Card