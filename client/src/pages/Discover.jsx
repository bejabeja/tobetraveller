import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Discover.css'
import Card from '../components/Card'
import DashboardLayout from '../layout/DashboardLayout'

const Discover = () => {
  const [selectData, setSelectData] = useState([])

  useEffect(() => {
    let processing = true
    axiosFetchData(processing)
    return () => {
      processing = false
    }
  }, [])


  const axiosFetchData = async (processing) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/places`)
      .then(res => {
        if (processing) {
          setSelectData(res.data)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <DashboardLayout>
      <section className='section-discover section'>
        {selectData?.map((place, index) => (
          <Card key={index} id={place.id} countryName={place.countryName} cityName={place.cityName} countryText={place.countryText} countryCode={place.countryCode}></Card>
        ))}
      </section>
    </DashboardLayout>
  )
}

export default Discover