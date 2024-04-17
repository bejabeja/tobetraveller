import React, { useState } from "react";
import './CreateTrip.css'
import ButtonLink from "../../components/ButtonLink";
import logo from "../../logos/tobetraveller3black.png"

const CreateTrip = (props) => {
    const [newTrip, setNewTrip] = useState(false)
    const [allTrips, setAllTrips] = useState(false)

    const [tripInfo, setTripInfo] = useState({ placeToGo: '', travelDays: '', headerImg: null })
    const { placeToGo, travelDays } = tripInfo

    async function handleNewTrip(e) {
        e.preventDefault()
        setAllTrips(false)
        setNewTrip(true)
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
                <h1>Let`s plan a trip together!</h1>
                <form className='create-trip--form'>
                    <div className='input-container'>
                        <label htmlFor="input">Where to go?</label>
                        <input
                            type="text"
                            id="input"
                            value={placeToGo}
                            onChange={(e) => { setTripInfo({ ...tripInfo, placeToGo: e.target.value }) }}
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
                {/* {placeToGo && travelDays &&
                        <ButtonLink
                            onClick={handleNewTrip}
                            className={`main--button`}
                            text='Create trip'
                        ></ButtonLink>

                    } */}
            </section >

            {
                travelDays && placeToGo &&
                <>
                    < section className="create-trip--header" >
                        <div className="create-trip--header-title">
                            <h1 > {travelDays} days in </h1>
                            <h1> {placeToGo}</h1>
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
                </>
            }
        </main >
    )

};

export default CreateTrip;
