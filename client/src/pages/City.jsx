import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCity } from "../services/cities.js";
import './City.css';
import Layout from "../layout/Layout";
import Fav from '../components/Fav.jsx';


const City = () => {
    const { id } = useParams()
    const [city, setCity] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const data = await getCity(id);
                setCity(data)
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

    const SpinnerLoader = () => {
        return (
            <div className="spinner">
                <img src="/spinnerWorld.gif" alt="Loading..." loading="lazy" />
            </div>
        );
    };

    if (loading) {
        return <SpinnerLoader></SpinnerLoader>;
    }

    return (
        <Layout>
            <main className="city">
                <section>
                    {true && <div className="city-buttons">
                        <Fav id={parseInt(id, 10)}></Fav>
                    </div>
                    }
                    <img src={city?.cityInfo?.cityThumbnail} alt={`${city?.cityInfo?.city_name} thumbnail`} loading="lazy"></img>
                    <h1>{city?.cityInfo?.cityName}</h1>
                    <p>{city?.cityInfo?.cityDescription}</p>
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
                                <img src={poi.thumbnail} loading="lazy" alt={`${poi.name} thumbnail`}></img>
                            </li>
                        ))}
                    </ul>
                </section>
                <hr></hr>
                <section>
                    <h1>{city?.cityInfo?.countryName}</h1>
                    <p>{city?.cityInfo?.countryDescription}</p>
                </section>
            </main>
        </Layout>
    )
};

export default City;
