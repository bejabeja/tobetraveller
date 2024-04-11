import React, { useState } from 'react'
import { useAuth } from "../auth/AuthProvider";
import ButtonLink from "../components/ButtonLink"
import './PrivateProfile.css'
import avatar from '../img/favicon-avatar.ico'


const PrivateProfile = () => {
  const [newTrip, setNewTrip] = useState(false)
  const [allTrips, setAllTrips] = useState(false)

  const [tripInfo, setTripInfo] = useState({ placeToGo: '', travelDays: '' })
  const { placeToGo, travelDays } = tripInfo

  const auth = useAuth()
  const user = auth.getUser()

  console.log(user)

  async function handleNewTrip(e) {
    e.preventDefault()
    setAllTrips(false)
    setNewTrip(true)
  }

  return (
    <main className='private-profile'>
      <h1>Hello traveller {user.username}! Welcome to your profile,</h1>
      <section className='private-profile--buttons'>
        <ButtonLink
          onClick={handleNewTrip}
          className={`main--button ${newTrip ? 'active-button' : ''}`}
          text='Plan a new trip'
        >
        </ButtonLink>
        <ButtonLink href='/discover' className='main--button' text='Add favs'> </ButtonLink>
        <ButtonLink href='' className='main--button' text='Post in forum'> </ButtonLink>
        <ButtonLink href='/' className='main--button' text='Add your status'> </ButtonLink>

      </section>
      <section className='private-profile--header'>
        <div className='private-profile--info'>
          <img src={avatar}></img>
          <div>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
        <div className='private-profile--socialnetwork'>
          <div>
            <p>Trips</p>
            <p>{user.followers}</p>
          </div>
          <div>
            <p>Followers</p>
            <p>{user.followers}</p>
          </div>
          <div>
            <p>Following</p>
            <p>{user.following}</p>
          </div>
          <div>
            <p>Favs</p>
            <p>{user.followers}</p>
          </div>
          <div>
            <p>Posts</p>
            <p>{user.followers}</p>
          </div>
          <div>
            <p>Comments</p>
            <p>{user.followers}</p>
          </div>
        </div>

      </section>
      <section>
        <h1>How are you today? Do you wanna plan a trip?</h1>
        <ButtonLink
          onClick={handleNewTrip}
          className={`main--button ${newTrip ? 'active-button' : ''}`}
          text='Plan a new trip'
        >
        </ButtonLink>

        {newTrip &&
          <div className='newtrip--form'>
            <form className='form-private-profile'>

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
      </section>
      <section>
        <h1> Would you like to add some favs?</h1>

        <p>Currently you have 0 travels on favs!</p>
        <ButtonLink href='/discover' className='main--button' text='Start'> </ButtonLink>
      </section>


    </main >
  )
}





export default PrivateProfile