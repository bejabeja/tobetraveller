import React, { useState, useEffect, useId } from 'react'
import './Discover.css'
import Layout from '../layout/Layout'
import { getCities } from '../services/cities.js'
import ButtonLink from '../components/ButtonLink'

const Discover = () => {
  const [citiesData, setcitiesData] = useState([])
  const [filters, setFilters] = useState({
    currency: 'all',
    country: 'all'
  })

  const currencyFilterId = useId()

  useEffect(() => {
    getCities().then((data) => setcitiesData(data))
  }, [])

  function filterCities() {
    return citiesData.filter(city => {
      return (filters.currency === 'all' || city.currency === filters.currency)
    })
  }

  const handleChangeCurrency = (event) => {
    setFilters(prevState => ({
      ...prevState,
      currency: event.target.value
    }))
  }


  return (
    <Layout>
      <main className='cities'>
        <section className='cities--filters'>
          <div>
            <label htmlFor={currencyFilterId}>Currency</label>
            <select id={currencyFilterId} onChange={handleChangeCurrency}>
              <option value='all'>All</option>
              <option value='EUR'>EUR</option>
              <option value='AUD'>AUD</option>
              <option value='USD'>USD</option>
            </select>
          </div>
        </section>
        <section>
          <ul>
            {filterCities()?.map((city) => (

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