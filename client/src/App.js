import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios'

function App() {
  const [placeData, setPlaceData] = useState([]);


  useEffect(() => {
    let apiUrl = process.env.REACT_APP_API_URL;

    let processing = true 
    axiosFetchData(processing, apiUrl)
    return() => {
      processing = false
    }
  }, [])

  const axiosFetchData = async(processing, apiUrl) => {
    await axios.get(`${apiUrl}/places`)
    .then(res => {
      console.info(res.data)
      if(processing){
        setPlaceData(res.data)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {placeData ? (
          <div>
          {placeData.map((item) => (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.cityName}</p>
              <p>{item.countryName}</p>
            </div>
          ))}
        </div>
          
        ) : (
          <div>
            Loading...
          </div>
        )}
      </header>
    </div>
  );
}

export default App;