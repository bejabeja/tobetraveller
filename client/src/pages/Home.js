import React from 'react'
import './Home.css'
import Layout from '../layout/Layout'
import ButtonLink from '../components/ButtonLink'

const Home = () => {



return (
    <Layout>
     
        <div className='tittle-group'>
            <h1 className='title--h1'>Travel Smarter, Dream Bigger</h1>
            <h2 className='title--h2'>Your Journey Begins Here</h2>
            <ButtonLink href='/discover' className='primary-button'  text='Start'> </ButtonLink>
        </div>        
    </Layout>
  )
}

export default Home