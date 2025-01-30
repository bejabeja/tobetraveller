import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fav from "../components/Fav.jsx";
import SpinnerLoader from "../components/spinnerLoader/SpinnerLoader.jsx";
import { getCity } from "../services/cities.js";
import "./City.css";

const City = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const data = await getCity(id);
        setCity(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchCity();
    }, 500);
  }, [id]);

  if (loading) {
    return <SpinnerLoader></SpinnerLoader>;
  }

  return (
    <main className="city">
      <section>
        <div className="image-container-city">
          <div className="city-buttons">
            <Fav id={parseInt(id, 10)} />
          </div>
          <img
            src={city?.thumbnail}
            alt={`${city?.name} thumbnail`}
            loading="lazy"
          ></img>
        </div>
        <h1>{city?.name}</h1>
        <p>{city?.description}</p>
      </section>
      <hr></hr>
      <section>
        <h1>Points of interest</h1>
        <ul>
          {city?.pointsOfInterest?.map((poi) => (
            <li key={poi.name}>
              <h1>{poi.name}</h1>
              <p>{poi.description}</p>
              <div>
                <p>Opening hours: </p>
                <p>{poi.openingHours}</p>
              </div>
              <img
                src={poi.thumbnail}
                loading="lazy"
                alt={`${poi.name} thumbnail`}
              ></img>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default City;
