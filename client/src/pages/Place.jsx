import React from "react";
import { useParams } from "react-router-dom";

const Place = () => {
    const { name } = useParams()
    return (
        <section className="section">
            <h1>{name}</h1>
        </section>
    )
};

export default Place;
