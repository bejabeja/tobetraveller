import React from "react";
import { useParams } from "react-router-dom";
import './CreateTrip.css'

const CreateTrip = (props) => {

    const { placeToGo, travelDays } = useParams();

    const renderTripDays = () => {
        const days = []
        for (let i = 1; i <= travelDays; i++) {
            days.push(
                <div key={i}>
                    <h2>Day {i}</h2>
                    <form>

                    </form>
                </div>
            )
        }
        return days
    }

    return (
        <section className='section'>
            <div className="create-trip--header">
                <h3 className="create-trip--travelDays"> {travelDays} days in </h3>
                <h1 className="create-trip--placeToGo"> {placeToGo}</h1>
            </div>

            {
                travelDays > 0 &&
                <div className="create-trip--itinerary">
                    <h1>Itinerary</h1>
                    {
                        renderTripDays()
                    }
                </div>
            }

        </section>
    )

};

export default CreateTrip;
