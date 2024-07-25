import React, { useState, useEffect } from 'react'
import './Discover.css'
import { getAllCities } from '../services/cities.js'
import ButtonLink from '../components/ButtonLink'
import { useFilters } from '../hooks/useFilters.js'
import Filters from '../components/Filters.jsx'
import SpinnerLoader from '../components/spinnerLoader/SpinnerLoader.jsx'

const Discover = () => {
  const { filterCities } = useFilters()
  const [initialAllCities, setInitialAllCities] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredCities = filterCities(initialAllCities)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAllCities();
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
    <main className='cities'>
      <Filters></Filters>
      <section>
        <ul>
          {filteredCities?.map((city) => (
            <ButtonLink key={city.id} href={`/discover/${city.id}`} className='card--button'>
              <li>
                <div className='cities-content'>
                  <img
                    src={city.city_thumbnail}
                    alt={city.city_name}
                  ></img>
                  <div>
                    <strong>{city.city_name}</strong> - {city.country_name}
                    <p>{city.city_description}</p>
                  </div>
                </div>
              </li>
            </ButtonLink >
          ))}
        </ul>
      </section>
    </main >
  )
}

export default Discover