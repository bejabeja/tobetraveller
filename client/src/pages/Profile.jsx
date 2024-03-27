import React, { useState } from 'react'
import { useAuth } from "../auth/AuthProvider";
import ButtonLink from "../components/ButtonLink"
import './Profile.css'


const Profile = () => {
  const [newTrip, setNewTrip] = useState(false)
  const [allTrips, setAllTrips] = useState(false)
  const [placeToGo, setPlaceToGo] = useState('')
  const [travelDays, setTravelDays] = useState(null)



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
    <section className='section section--profile'>
      <div>Hello traveller {user.username}, how are you today?</div>
      {/* <div>How are you today? </div> */}
      {/* <div>Tell me more about your travel</div> */}
      <div className='profile--buttons'>
        <ButtonLink
          onClick={handleNewTrip}
          className={`primary-button ${newTrip ? 'trip-active-button' : ''}`}
          text='Plan a new trip'
        >
        </ButtonLink>
        {/* <ButtonLink
          onClick={handleAllTrips}
          className='primary-button' text='See all my trips'>
        </ButtonLink> */}
      </div>

      {newTrip &&
        <form>

          <div className={`input-container ${placeToGo ? 'has-value' : ''}`}>
            <input
              type="text"
              id="input"
              value={placeToGo}
              onChange={(e) => { setPlaceToGo(e.target.value) }}
              required
            />
            <label htmlFor="input">Where to go?</label>
          </div>

          <div className={`input-container ${travelDays ? 'has-value' : ''}`}>
            <input
              type="text"
              id="input"
              value={travelDays}
              onChange={(e) => { setTravelDays(e.target.value) }}
              required
            />
            <label htmlFor="input">How many days?</label>
          </div>
        </form>
      }
    </section>
  )
}

export default Profile