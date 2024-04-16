import React, { useState, useEffect } from 'react'
import './Discover.css'
import Layout from '../layout/Layout'
import { getCities } from '../services/cities.js'
import ButtonLink from '../components/ButtonLink'
import { useFilters } from '../hooks/useFilters.js'
import Filters from '../components/Filters.jsx'

const Discover = () => {
  const { filterCities } = useFilters()
  const [initialAllCities, setInitialAllCities] = useState([])

  const filteredCities = filterCities(initialAllCities)

  useEffect(() => {
    getCities().then((data) => setInitialAllCities(data))
  }, [])

  return (
    <Layout>
      <main className='cities'>
        <Filters></Filters>
        <section>
          <ul>
            {filteredCities?.map((city) => (
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
        </section>
      </main>
    </Layout >
  )
}

export default Discover