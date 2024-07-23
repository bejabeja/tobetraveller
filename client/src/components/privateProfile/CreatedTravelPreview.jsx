import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../pages/City.css';
import Layout from "../../layout/Layout";
import { useAuth } from "../../hooks/useAuth";

const CreatedTravelPreview = () => {
    const { id } = useParams()
    const { userTravels } = useAuth()
    const navigate = useNavigate();
    const travelId = parseInt(id, 10);
    const travel = userTravels.find(trav => trav.id === travelId);
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!travel) {
                navigate('/private-profile');
            }
            setShowSpinner(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [travel]);

    const SpinnerLoader = () => (
        <div className="spinner">
            <img src="/spinnerWorld.gif" alt="Loading..." loading="lazy" />
        </div>
    );

    if (showSpinner) {
        return <SpinnerLoader />;
    }

    return (
        <Layout>
            <main className="city created-travel">
                <section>
                    {travel.thumbnail ? (
                        <img src={travel.thumbnail} alt={`${travel.title} thumbnail`} loading="lazy" />
                    ) : (
                        <div>No thumbnail available</div>
                    )}
                    <h1>{travel.title}</h1>
                    <p>Travel planed for {travel.days} <span>{travel.days === 1 ? 'day' : 'days'}</span></p>
                </section>
                <hr></hr>
                <section>
                    <h1>Points of interest</h1>
                    <ul>
                        {Object.entries(travel.itinerary).map(([day, activities]) => (
                            activities.map((trav) => (
                                <li key={trav.activityId}>
                                    <h1>{day}</h1>
                                    <div>
                                        <p>Activity: {trav.activity}</p>
                                        <p>Notes: {trav.notes}</p>
                                    </div>
                                </li>
                            ))
                        ))}
                    </ul>
                </section>
                <hr></hr>
            </main>
        </Layout>
    )
}

export default CreatedTravelPreview;