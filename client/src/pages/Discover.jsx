import React, { useState, useEffect } from 'react'
import './Discover.css'
import Layout from '../layout/Layout'
import { getCities } from '../services/cities.js'
import ButtonLink from '../components/ButtonLink'
import { useFilters } from '../hooks/useFilters.js'
import Filters from '../components/Filters.jsx'
import SpinnerLoader from '../components/SpinnerLoader.jsx'

const Discover = () => {
  const { filterCities } = useFilters()
  const [initialAllCities, setInitialAllCities] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredCities = filterCities(initialAllCities)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setInitialAllCities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


    setTimeout(() => {
      fetchCities();
    }, 500);

  }, []);

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Layout>
      <main className='cities'>
        <Filters></Filters>
        <section>
          <ul>
            {filteredCities?.map((city) => (
              <ButtonLink key={city.id} href={`/discover/${city.id}`} className='card--button'>
                <li>
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
            ))}
          </ul>
        </section>
      </main>
    </Layout >
  )
}

export default Discover