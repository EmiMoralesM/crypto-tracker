import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../tools/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/profile')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <main>
      <section className='signUpSection'>
        <div >
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='emailDiv'>
              <label htmlFor="email">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required />
            </div>

            <div className='passwordDiv'>
              <label htmlFor="password">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required />
            </div>

            {/* <div className='passwordConfirmDiv'>
                     <label htmlFor="passwordConfirm">Password Confirmation</label>
                     <input type="password" name="passwordConfirm" id="passwordConfirm" required />
                  </div> */}
            <button type='submit'>Login</button>
          </form>
        </div>
        <div>
          <p>Don't have an account? <Link to={'/signup'}> Sign Up </Link></p>
        </div>

      </section>
    </main>
  )
}
