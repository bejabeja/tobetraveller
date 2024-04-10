import React, { useState } from 'react'
import { useAuth } from "../auth/AuthProvider";
import ButtonLink from "../components/ButtonLink"
import './Profile.css'
import avatar from '../img/favicon-avatar.ico'


const Profile = () => {
  const [newTrip, setNewTrip] = useState(false)
  const [allTrips, setAllTrips] = useState(false)

  const [tripInfo, setTripInfo] = useState({ placeToGo: '', travelDays: '' })
  const { placeToGo, travelDays } = tripInfo



  const auth = useAuth()
  const user = auth.getUser()

  async function handleNewTrip(e) {
    e.preventDefault()
    setAllTrips(false)
    setNewTrip(true)
  }

  return (
    <main className='profile'>
      <section>
        <h1>Hello traveller! Welcome to your profile, this is your data</h1>
        <div className='profile--info'>
          <img src={avatar}></img>
          <div>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>

        </div>

        <h1>How are you today {user.username} ?</h1>
      </section>

      <div className='profile--buttons'>
        <ButtonLink
          onClick={handleNewTrip}
          className={`main--button ${newTrip ? 'active-button' : ''}`}
          text='Plan a new trip'
        >
        </ButtonLink>

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



    </main >
  )
}





export default Profile