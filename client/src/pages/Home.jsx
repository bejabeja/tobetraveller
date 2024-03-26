import React from 'react'
import './Home.css'
import ButtonLink from '../components/ButtonLink'
import DashboardLayout from '../layout/DashboardLayout'

const Home = () => {

  return (
    <DashboardLayout>
      <section className='tittle-group'>
        <h1 className='title--h1'>Travel Smarter, Dream Bigger</h1>
        <h2 className='title--h2'>Your Journey Begins Here</h2>
        <ButtonLink href='/discover' className='primary-button' text='Start'> </ButtonLink>
      </section>
    </DashboardLayout>
  )
}

export default Home