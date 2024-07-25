import React from 'react'
import './Home.css'
import ButtonLink from '../components/ButtonLink'
import logo from '../logos/g5.png'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <main className='home no-scroll'>
      <Link href='/discover'>
        <img src={logo}></img>
      </Link>
      {/* <h1 className='title--h1'>Travel Smarter,</h1>
        <h1 className='title--h1'> Dream Bigger</h1>

        <h2 className='title--h2'>Your Journey Begins Here</h2> */}
      {/* <ButtonLink href='/discover' className='main--button' text='Start'> </ButtonLink> */}
    </main>
  )
}

export default Home