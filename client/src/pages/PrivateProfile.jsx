import React from 'react'
import { useAuth } from "../hooks/useAuth.js";
import ButtonLink from "../components/ButtonLink";
import './PrivateProfile.css';
import avatar from '../icons/favicon-avatar.ico';


const PrivateProfile = () => {
  const { user, favsInfo, userTravels } = useAuth()

  return (
    <main className='private-profile'>
      <h1>Hello traveller {user.username}! Welcome to your profile,</h1>

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
            <p>My Trips</p>
            <p>{userTravels?.length}</p>
          </div>

          <div>
            <p>Favs</p>
            <p>{favsInfo.length}</p>
          </div>

          {/* FF => FEATURE FLAG */}
          {false &&
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

      <section className='private-profile--buttons'>
        <ButtonLink
          href='/trip/create'
          // onClick={handleNewTrip}
          // className={`main--button ${newTrip ? 'active-button' : ''}`}
          text='Plan a trip'
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
    </main >
  )
}





export default PrivateProfile