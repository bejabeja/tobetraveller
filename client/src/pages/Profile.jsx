import React from 'react'
import { useAuth } from "../auth/AuthProvider";


const Profile = () => {
  const auth = useAuth()
  const user = auth.getUser()

  return (
    <section className='section'>
      <div>Hello {user.username},</div>
      <div>How are you today? Tell me more about your next travel</div>
    </section>
  )
}

export default Profile