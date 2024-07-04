import React, { useState, useEffect } from "react";
import './CreateTravel.css'
import ButtonLink from "../../components/ButtonLink";
import logo from "../../logos/tobetraveller3black.png"

const CreateTravel = (props) => {
    const [newTrip, setNewTrip] = useState(false)
    const [allTrips, setAllTrips] = useState(false)

    const [tripInfo, setTripInfo] = useState({
        destination: '',
        travelDays: 0,
        headerImg: null,
        itinerary: {}
    })
    const { destination, travelDays } = tripInfo

    // async function handleNewTrip(e) {
    //     e.preventDefault()
    //     setAllTrips(false)
    //     setNewTrip(true)
    // }

    const handleSaveTravelButtonClick = () => {
        // createTravel()
    }

    function handleHeaderImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTripInfo({ ...tripInfo, headerImg: reader.result })
            };
            reader.readAsDataURL(file);
        }
    }

    const handleAddImgButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleRemoveImgButtonClick = () => {
        setTripInfo({ ...tripInfo, headerImg: null })
    }

    useEffect(() => {
        const newItinerary = {};
        for (let i = 1; i <= travelDays; i++) {
            newItinerary[`day${i}`] = tripInfo.itinerary[`day${i}`] || [{ activityId: 1, activity: '', notes: '' }];
        }
        setTripInfo(prev => ({ ...prev, itinerary: newItinerary }));
    }, [travelDays]);


    const handleTripItineraryChange = (day, index, field, value) => {
        setTripInfo(prev => {
            const dayActivities = [...prev.itinerary[day]];
            dayActivities[index] = { ...dayActivities[index], [field]: value };
            return { ...prev, itinerary: { ...prev.itinerary, [day]: dayActivities } };
        });
    };
    const renderTripDays = () => (
        Array.from({ length: travelDays }, (_, i) => {
            const day = `day${i + 1}`;
            return (
                <div key={i}>
                    <h2>Day {i + 1}</h2>
                    {tripInfo.itinerary[day]?.map((activity, index) => (
                        <form key={activity.activityId} className="day-form">
                            <div className="input-container">
                                <label htmlFor={`activity-${day}-${index}`}>Activity:</label>
                                <input
                                    type="text"
                                    id={`activity-${day}-${index}`}
                                    name={`activity-${day}-${index}`}
                                    value={activity.activity}
                                    onChange={(e) => handleTripItineraryChange(day, index, 'activity', e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor={`notes-${day}-${index}`}>Notes:</label>
                                <textarea
                                    id={`notes-${day}-${index}`}
                                    name={`notes-${day}-${index}`}
                                    value={activity.notes}
                                    onChange={(e) => handleTripItineraryChange(day, index, 'notes', e.target.value)}
                                />
                            </div>
                        </form>
                    ))}
                </div>
            );
        })
    );


    console.log(tripInfo)

    return (
        <main className='create-trip'>
            < section >
                <h1>Let`s plan a trip together!</h1>
                <form className='create-trip--form'>
                    <div className='input-container'>
                        <label htmlFor="input">Where to go?</label>
                        <input
                            type="text"
                            id="input"
                            value={destination}
                            onChange={(e) => { setTripInfo({ ...tripInfo, destination: e.target.value }) }}
                            required
                        />
                    </div>

                    <div className='input-container'>
                        <label htmlFor="input">How many days?</label>
                        <input
                            type="number"
                            id="input"
                            value={travelDays}
                            onChange={(e) => { setTripInfo({ ...tripInfo, travelDays: e.target.value }) }}
                            required
                        />
                    </div>


                </form>
                {/* {destination && travelDays &&
                        <ButtonLink
                            onClick={handleNewTrip}
                            className={`main--button`}
                            text='Create trip'
                        ></ButtonLink>

                    } */}
            </section >

            {
                travelDays && destination &&
                <>
                    < section className="create-trip--header" >
                        <div className="create-trip--header-title">
                            <h1 > {travelDays} days in </h1>
                            <h1> {destination}</h1>
                        </div>

                        <div className="create-trip--header-img">
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleHeaderImageChange}
                                accept="image/*"
                            />
                            {tripInfo.headerImg ?
                                <img src={tripInfo.headerImg} alt="Uploaded" />
                                : <img src={logo} alt="placeholder logo"></img>}
                        </div>
                        <div className="create-trip--header-buttons">
                            <ButtonLink
                                onClick={handleAddImgButtonClick}
                                className='main--button'
                            >
                                Upload Image
                            </ButtonLink>
                            {tripInfo.headerImg &&
                                <ButtonLink
                                    onClick={handleRemoveImgButtonClick}
                                    className='main--button'
                                >
                                    Remove Image
                                </ButtonLink>
                            }
                        </div>
                    </section>
                    <section>
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
                    <ButtonLink
                        onClick={handleSaveTravelButtonClick}
                        className='main--button'
                    >
                        Save itinerary
                    </ButtonLink>
                </>
            }


        </main >
    )

};

export default CreateTravel;
