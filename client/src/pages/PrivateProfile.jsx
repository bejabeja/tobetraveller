import React from 'react'
import { useAuth } from "../hooks/useAuth.js";
import ButtonLink from "../components/ButtonLink"
import './PrivateProfile.css'
import avatar from '../icons/favicon-avatar.ico'
import UserTravels from '../components/privateProfile/UserTravels.jsx';
import UserFavs from '../components/privateProfile/UserFavs.jsx';


const PrivateProfile = () => {
  const { user, favsInfo } = useAuth()

  return (
    <main className='private-profile'>
      <h1>Hello traveller {user.username}! Welcome to your profile,</h1>
      <section className='private-profile--buttons'>
        <ButtonLink
          href='/trip/create'
          // onClick={handleNewTrip}
          // className={`main--button ${newTrip ? 'active-button' : ''}`}
          text='Plan a new trip'
          className='main--button'
        >
        </ButtonLink>
        <ButtonLink href='/discover' className='main--button' text='Add favs'> </ButtonLink>

        {/* FF => FEATURE FLAG */}
        {false &&
          <>
            <ButtonLink href='' className='main--button' text='Post in forum'> </ButtonLink>
            <ButtonLink href='/' className='main--button' text='Add your status'> </ButtonLink>
          </>
        }

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
            <p>0</p>
          </div>

          {/* FF => FEATURE FLAG */}
          {true &&
            <>
              <div>
                <p>Followers</p>
                <p>{user.followers}</p>
              </div>
              <div>
                <p>Following</p>
                <p>{user.following}</p>
              </div>
            </>}

          <div>
            <p>Favs</p>
            <p>{favsInfo.length}</p>
          </div>

          {/* FF => FEATURE FLAG */}
          {false &&
            <>
              <div>
                <p>Posts</p>
                <p>0</p>
              </div>
              <div>
                <p>Comments</p>
                <p>0</p>
              </div>
            </>}

        </div>

      </section>

      <UserFavs></UserFavs>
      <UserTravels></UserTravels>


    </main >
  )
}





export default PrivateProfile