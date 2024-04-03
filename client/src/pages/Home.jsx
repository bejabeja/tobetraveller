import React from 'react'
import './Home.css'
import ButtonLink from '../components/ButtonLink'
import Layout from '../layout/Layout'

const Home = () => {

  return (
    < Layout>
      <section className='tittle-group section'>
        <h1 className='title--h1'>Travel Smarter, Dream Bigger</h1>
        <h2 className='title--h2'>Your Journey Begins Here</h2>
        <ButtonLink href='/discover' className='primary-button' text='Start'> </ButtonLink>
      </section>
    </ Layout>
  )
}

export default Home