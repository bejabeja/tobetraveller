import React, { useState } from 'react'
import { useAuth } from "../auth/AuthProvider";
import ButtonLink from "../components/ButtonLink"
import './Profile.css'


const Profile = () => {
  const [newTrip, setNewTrip] = useState(false)
  const [allTrips, setAllTrips] = useState(false)
  const [createTrip, setCreateTrip] = useState(false)

  const [tripInfo, setTripInfo] = useState({ placeToGo: '', travelDays: '' })
  const { placeToGo, travelDays } = tripInfo



  const auth = useAuth()
  const user = auth.getUser()

  async function handleNewTrip(e) {
    e.preventDefault()
    setAllTrips(false)
    setNewTrip(true)
  }

  async function handleAllTrips(e) {
    e.preventDefault()
    setNewTrip(false)
    setAllTrips(true)
  }

  return (
    <section className='section--profile section'>
      <div>Hello traveller {user.username}, how are you today?</div>
      {/* <div>How are you today? </div> */}
      {/* <div>Tell me more about your travel</div> */}
      <div className='profile--buttons'>
        <ButtonLink
          onClick={handleNewTrip}
          className={`main--button ${newTrip ? 'active-button' : ''}`}
          text='Plan a new trip'
        >
        </ButtonLink>
        {/* <ButtonLink
          onClick={handleAllTrips}
          className='main--button' text='See all my trips'>
        </ButtonLink> */}
      </div>

      {newTrip &&
        <div className='newtrip--form'>
          <form className='form-profile'>

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
          {placeToGo && travelDays &&
            <ButtonLink
              href={`/trip/create/${placeToGo}/${travelDays}`}
              className={`main--button`}
              text='Create trip'
            ></ButtonLink>

          }
        </div>
      }



    </section >
  )
}





export default Profile