import React, { useState } from "react";
import './CreateTrip.css'
import ButtonLink from "../../components/ButtonLink";

const CreateTrip = (props) => {
    const [newTrip, setNewTrip] = useState(false)
    const [allTrips, setAllTrips] = useState(false)

    const [tripInfo, setTripInfo] = useState({ placeToGo: '', travelDays: '' })
    const { placeToGo, travelDays } = tripInfo

    async function handleNewTrip(e) {
        e.preventDefault()
        setAllTrips(false)
        setNewTrip(true)
    }


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
        <main className='create-trip'>
            < section >
                <h1>How are you today? Do you wanna plan a trip?</h1>
                <div className='newtrip--form'>
                    <form className='create-trip--form'>

                        <div className={`input-container ${placeToGo ? 'has-value' : ''}`}>
                            <input
                                type="text"
                                id="input"
                                value={placeToGo}
                                onChange={(e) => { setTripInfo({ ...tripInfo, placeToGo: e.target.value }) }}
                                required
                            />
                            <label htmlFor="input">Where to go?</label>
                        </div>

                        <div className={`input-container ${travelDays ? 'has-value' : ''}`}>
                            <input
                                type="text"
                                id="input"
                                value={travelDays}
                                onChange={(e) => { setTripInfo({ ...tripInfo, travelDays: e.target.value }) }}
                                required
                            />
                            <label htmlFor="input">How many days?</label>
                        </div>


                    </form>
                    {/* {placeToGo && travelDays &&
                        <ButtonLink
                            onClick={handleNewTrip}
                            className={`main--button`}
                            text='Create trip'
                        ></ButtonLink>

                    } */}
                </div>
            </section >

            {travelDays && placeToGo &&
                < section >
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
            }
        </main >
    )

};

export default CreateTrip;
