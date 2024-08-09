import React from 'react'
import './Home.css'
import planImage from '../imgs/planImage.png'
import itineraryImage from '../imgs/itineraryImage.png'
import saveImage from '../imgs/saveImage.png'
import ButtonLink from '../components/ButtonLink'
import logo from '../logos/g5.png'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <main className='home'>
      <div className='home-maininfo'>
        <div className='home-leftinfo'>
          {/* <Link href='/discover'>
            <img src={logo}></img>
          </Link> */}
          <h1>Getting started with <span>ToBe@Traveller</span> is very easy</h1>

        </div>
        <div className='home-rightinfo'>
          <section className="home-section">
            <div className="section-text">
              <h2>1. Plan your adventure</h2>
              <p>Enter some basic details, such as your destination and trip duration. This information will help us personalize your experience.</p>
            </div>
            <img src={planImage} alt="Plan your adventure" className="section-image" />
          </section>
          <hr className='separator' />
          <section className="home-section">
            <div className="section-text">
              <h2>2. Customize your itinerary</h2>
              <p>Add activities, places to visit, and unique experiences. Upload an inspiring photo, choose an attractive title for your plan, and write a detailed description.</p>
            </div>
            <img src={itineraryImage} alt="Customize your itinerary" className="section-image" />

          </section>
          <hr className='separator' />
          <section className="home-section">
            <div className="section-text">
              <h2>3. Finalize and save</h2>
              <p>Review your itinerary, adjust any details, and get ready for the adventure. Share your travel plan with friends and family, or save it for later! It`s that easy!</p>
            </div>
            <img src={saveImage} alt="Finalize and save" className="section-image" />
          </section>
        </div>



      </div>
      {/* <h1 className='title--h1'>Travel Smarter,</h1>
      <h1 className='title--h1'> Dream Bigger</h1>

      <h2 className='title--h2'>Your Journey Begins Here</h2> */}

      <ButtonLink href='/trip/create' className='main--button' text='Start'> </ButtonLink>

    </main>
  )
}

export default Home