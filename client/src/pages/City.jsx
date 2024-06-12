import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCity } from "../services/cities.js";
import './City.css';
import Layout from "../layout/Layout";
import Fav from '../components/Fav.jsx';

const City = () => {
    const { id } = useParams()
    const [city, setCity] = useState({})

    useEffect(() => {
        getCity(id).then((data) => setCity(data))
    }, [])

    return (
        <Layout>
            <main className="city">
                <section>
                    {false && <div className="city-buttons">
                        <Fav id={parseInt(id, 10)}></Fav>
                    </div>
                    }
                    <img src={city.cityThumbnail}></img>
                    <h1>{city.cityName}</h1>
                    <p>{city.cityDescription}</p>
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
                                    <p>{poi.opening_hours}</p>
                                </div>
                                <img src={poi.thumbnail}></img>
                            </li>
                        ))}
                    </ul>
                </section>
                <hr></hr>
                <section>
                    <h1>{city.countryName}</h1>
                    <p>{city.countryDescription}</p>
                </section>
            </main>
        </Layout>
    )
};

export default City;
