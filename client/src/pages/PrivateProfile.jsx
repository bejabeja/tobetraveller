import React, { useEffect } from 'react'
import { useAuth } from "../hooks/useAuth.js";
import ButtonLink from "../components/ButtonLink"
import './PrivateProfile.css'
import avatar from '../icons/favicon-avatar.ico'
import getFavs from '../services/getAllFavs.js';


const PrivateProfile = () => {
  const { user, favsInfo, setFavsInfo } = useAuth()

  useEffect(() => {

    const fetchAllFavs = async () => {
      try {
        const data = await getFavs(user.user_id);
        setFavsInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllFavs();

  }, [])

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
      <section className='private-profile--section'>
        <h1> Would you like to add some favs?</h1>

        <p>Currently you have <strong>{favsInfo.length} trips</strong> on favs!</p>

        {/* FF => FEATURE FLAG */}
        {true && favsInfo?.map((fav) => (
          <ButtonLink key={fav.id} href={`/discover/${fav.id}`} className='private-profile--fav-info'>
            <img src={fav.city_thumbnail}></img>
            <p>{fav.city_name}</p>
          </ButtonLink>
        ))}
        <ButtonLink href='/discover' className='main--button' text='Add fav'> </ButtonLink>
      </section>
    </main >
  )
}





export default PrivateProfile