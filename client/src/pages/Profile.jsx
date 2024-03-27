import React from 'react'
import SignoutButton from '../components/SignoutButton'
import { useAuth } from "../auth/AuthProvider";


const Profile = () => {
  const auth = useAuth()
  const user = auth.getUser()

  return (
    <section className='section'>
      <div>Hello {user.username},</div>
      <div>How are you today? Tell me more about your next travel</div>
      <SignoutButton></SignoutButton>
    </section>
  )
}

export default Profile