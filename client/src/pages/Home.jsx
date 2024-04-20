import React from 'react'
import './Home.css'
import ButtonLink from '../components/ButtonLink'
import Layout from '../layout/Layout'
import logo from '../logos/g5.png'

const Home = () => {

  return (
    < Layout>
      <main className='home no-scroll'>
        <a href='/discover'>
          <img src={logo}></img>
        </a>
        {/* <h1 className='title--h1'>Travel Smarter,</h1>
        <h1 className='title--h1'> Dream Bigger</h1>

        <h2 className='title--h2'>Your Journey Begins Here</h2> */}
        {/* <ButtonLink href='/discover' className='main--button' text='Start'> </ButtonLink> */}
      </main>
    </ Layout>
  )
}

export default Home