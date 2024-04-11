import React, { useState, useEffect } from 'react'
import './Discover.css'
import Layout from '../layout/Layout'
import { getCities } from '../services/cities.js'
import ButtonLink from '../components/ButtonLink'

const Discover = () => {
  const [citiesData, setcitiesData] = useState([])

  useEffect(() => {
    getCities().then((data) => setcitiesData(data))
  }, [])


  return (
    <Layout>
      <main className='cities'>
        <ul>
          {citiesData?.map((city) => (

            <>
              <ButtonLink href={`/discover/${city.id}`} className='card--button'>
                <li key={city.id}>
                  <div className='cities-content'>
                    <img
                      src={city.cityThumbnail}
                      alt={city.cityName}
                    ></img>
                    <div>
                      <strong>{city.cityName}</strong> - {city.countryName}
                      <p>{city.cityDescription}</p>
                    </div>
                  </div>
                </li>
              </ButtonLink >
            </>
          ))}
        </ul>
      </main>
    </Layout >
  )
}

export default Discover