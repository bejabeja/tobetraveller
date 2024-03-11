import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Places.css'

const Places = () => {

const [selectData, setSelectData] = useState([])

  useEffect(() => {
    let apiUrl = process.env.API_URL || 'http://localhost:3001/api';

    let processing = true 
    axiosFetchData(processing, apiUrl)
    return() => {
      processing = false
    }
  }, [])


  const axiosFetchData = async(processing, apiUrl) => {
    await axios.get(`${apiUrl}/places`)
    .then(res => {
      if(processing){
        setSelectData(res.data)
      }
    })
    .catch(err => console.log(err))
  }


  return (
    <section className='section-places'>
        <h3>ToBeTraveller</h3>
        {selectData?.map((place, index) => (
          <div key={index}>
            <p>{place.cityName}</p>
            <p>{place.countryName}</p>
          </div>
        ))}             
    </section>
  )
}

export default Places