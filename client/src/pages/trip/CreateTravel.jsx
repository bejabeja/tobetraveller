import React, { useState, useEffect } from "react";
import './CreateTravel.css'
import ButtonLink from "../../components/ButtonLink";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import Tooltip from "../../components/tooltip/Tooltip";
import { USER_GUEST } from "../../utils/constants";


const CreateTravel = (props) => {
    const { user, saveCity } = useAuth()
    const goTo = useNavigate()
    const [tripInfo, setTripInfo] = useState({
        destination: '',
        travelDays: '',
        thumbnail: null,
        itinerary: {}
    })
    const { destination, travelDays } = tripInfo

    const handleSaveTravelButtonClick = async () => {
        if (user.username === USER_GUEST) {
            return;
        } else {
            const userTravel = tripInfo
            await saveCity(userTravel)
            goTo('/private-profile')
        }

    }

    function handleHeaderImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTripInfo({ ...tripInfo, thumbnail: reader.result })
            };
            reader.readAsDataURL(file);
        }
    }

    const handleAddImgButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleRemoveImgButtonClick = () => {
        setTripInfo({ ...tripInfo, thumbnail: null })
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
                <>
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
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="input-container">
                                    <label htmlFor={`notes-${day}-${index}`}>Notes:</label>
                                    <textarea
                                        id={`notes-${day}-${index}`}
                                        name={`notes-${day}-${index}`}
                                        value={activity.notes}
                                        onChange={(e) => handleTripItineraryChange(day, index, 'notes', e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                            </form>
                        ))}
                    </div>
                    {/* <hr></hr> */}
                </>
            );
        })
    );


    return (
        <main className='create-trip'>
            < section >
                <h1>Let`s plan a trip together!</h1>
                <form className='create-trip--form'>
                    <div className='input-container'>
                        <label htmlFor="input">Where do you want to go?
                            <Tooltip tooltipText='Please enter the name of the city you want to travel to.'></Tooltip>
                        </label>
                        <input
                            type="text"
                            id="input"
                            value={destination}
                            onChange={(e) => { setTripInfo({ ...tripInfo, destination: e.target.value }) }}
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className='input-container'>
                        <label htmlFor="input">How many days?
                            <Tooltip tooltipText='Please enter the number of travel days.'></Tooltip>
                        </label>
                        <input
                            type="number"
                            id="input"
                            value={travelDays}
                            onChange={(e) => { setTripInfo({ ...tripInfo, travelDays: e.target.value }) }}
                            required
                            min="0"
                            autoComplete="off"
                        />
                    </div>
                </form>
            </section >

            {
                travelDays > 0 && destination &&
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
                                autoComplete="off"
                            />
                            {tripInfo.thumbnail ?
                                <img src={tripInfo.thumbnail} alt="Uploaded" />
                                :
                                (
                                    <div className="placeholder-img" onClick={handleAddImgButtonClick}>
                                        <span>📷</span>
                                        <p>Click to add an image</p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="create-trip--header-buttons">
                            <ButtonLink onClick={handleAddImgButtonClick} className='main--button'>
                                Upload Image
                            </ButtonLink>
                            {tripInfo.thumbnail &&
                                <ButtonLink onClick={handleRemoveImgButtonClick} className='main--button'>
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
                    <ButtonLink onClick={handleSaveTravelButtonClick} className='main--button'>
                        Save itinerary
                    </ButtonLink>
                    {user.username === USER_GUEST &&
                        <small>Create your own account to save your trips.</small>

                    }
                </>
            }
        </main >
    )
};

export default CreateTravel;
