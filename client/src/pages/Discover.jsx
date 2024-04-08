import React, { useState, useEffect } from 'react'
import './Discover.css'
import Card from '../components/Card'
import Layout from '../layout/Layout'
import { getPlaces } from '../services/places'

const Discover = () => {
  const [selectData, setSelectData] = useState([])

  useEffect(() => {
    let processing = true
    getPlaces(processing).then((places) => setSelectData(places))
    return () => {
      processing = false
    }
  }, [])


  return (
    <Layout>
      <section className='section-discover section'>
        {selectData?.map((place, index) => (
          <Card key={index} id={place.id} countryName={place.countryName} cityName={place.cityName} countryText={place.countryText} countryCode={place.countryCode}></Card>
        ))}
      </section>
    </Layout>
  )
}

export default Discover