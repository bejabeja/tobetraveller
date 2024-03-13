import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Discover.css'
import Card from '../components/Card'

const Discover = () => {
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
    <div className='section-discover'>
        {selectData?.map((place, index) => (
            <Card key={index} id={place.id} countryName={place.countryName} cityName={place.cityName} countryText={place.cityName}></Card>            
        ))}             
    </div>
)
}

export default Discover