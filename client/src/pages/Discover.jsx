import React, { useState, useEffect } from 'react'
import './Discover.css'
import Layout from '../layout/Layout'
import { getPlaces } from '../services/places'

const Discover = () => {
  const [citiesData, setcitiesData] = useState([])

  useEffect(() => {
    getPlaces().then((data) => setcitiesData(data))
  }, [])


  return (
    <Layout>
      <main className='products'>
        <ul>
          {citiesData?.map((place, index) => (

            <>
              <li key={place.id}>
                <div>
                  <img
                    src={place.cityThumbnail}
                    alt={place.cityName}
                  ></img>
                  <div>
                    <strong>{place.cityName}</strong> - ${place.countryName}
                    <p>{place.cityDescription}</p>
                  </div>
                </div>
                <div>
                  <button>Button
                    {/* {isFav ? <RemoveFromFavIcon></RemoveFromFavIcon> : <AddToFavIcon></AddToFavIcon>} */}
                  </button>
                </div>
              </li>
            </>
          ))}
        </ul>
      </main>
    </Layout>
  )
}

export default Discover