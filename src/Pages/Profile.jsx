import React from 'react'
import '../styles/Register.css'
import { UserAuth } from '../tools/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const {user, logout} = UserAuth()

  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      console.log('You are logged out!')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <main>
      <section className='profileSection'>
        <h1>Profile</h1>
        <p>User Email: {user && user.email} </p>

        <button onClick={handleLogout}> Log Out</button>
      </section>
    </main>
  )
}
