import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
    <div>
        <h3>Places</h3>
        {selectData?.map((place, index) => (
          <div key={index}>
            <p>{place.cityName}</p>
            <p>{place.countryName}</p>
          </div>
        ))}             
</div>
  )
}

export default Places