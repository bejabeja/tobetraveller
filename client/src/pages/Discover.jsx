import React, { useState, useEffect } from 'react'
import './Discover.css'
import Layout from '../layout/Layout'
import { getPlaces } from '../services/places'
import ButtonLink from '../components/ButtonLink'

const Discover = () => {
  const [citiesData, setcitiesData] = useState([])

  useEffect(() => {
    getPlaces().then((data) => setcitiesData(data))
  }, [])


  return (
    <Layout>
      <main className='cities'>
        <ul>
          {citiesData?.map((place) => (

            <>
              <ButtonLink href={`/discover/${place.id}`} className='main--button'>
                <li key={place.id}>
                  <div className='cities-content'>
                    <img
                      src={place.cityThumbnail}
                      alt={place.cityName}
                    ></img>
                    <div>
                      <strong>{place.cityName}</strong> - {place.countryName}
                      <p>{place.cityDescription}</p>
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