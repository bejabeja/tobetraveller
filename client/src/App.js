import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let apiUrl = process.env.REACT_APP_API_URL;


    fetch(`${apiUrl}/places`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(res => {
        setData(res);
      })
      .catch(err => console.log(err)) 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {data ? (
          <div>
          {data.map((item) => (
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