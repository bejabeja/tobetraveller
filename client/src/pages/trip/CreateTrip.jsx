import React from "react";
import { useParams } from "react-router-dom";

const CreateTrip = (props) => {
    console.log('props')
    console.log(props)


    const { placeToGo, travelDays } = useParams();

    const renderTripDays = () => {
        const days = []
        for (let i = 1; i <= travelDays; i++) {
            days.push(
                <div key={i}>
                    dia {1}
                    <form>
                        
                    </form>
                </div>
            )
        }
        return days
    }

    return (
        <section className='section'>
            <h1>{placeToGo ?? 'h'}</h1>
            <h3>{travelDays ?? 'o'}</h3>
            {
                travelDays > 0 &&
                <div>
                    {
                        renderTripDays()
                    }
                </div>
            }

        </section>
    )

};

export default CreateTrip;
