import React from 'react'
import '../styles/Register.css'
import { UserAuth } from '../tools/AuthContext'


export default function Profile() {
  const {user, handleLogout} = UserAuth()
  console.log(user)
  return (
    <main>
      {user && <section className='profileSection'>
        <h1>Profile</h1>
        <p>User Email: {user.email} </p>

        <button onClick={handleLogout}> Log Out</button>
      </section>}
    </main>
  )
}
