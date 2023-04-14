import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../tools/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, setWrongInput, resetWrong } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      await login(email, password)
      navigate('/profile')
    } catch (e) {
      if (e.message == 'Firebase: Error (auth/user-not-found).') {
        setError('User not found')
        setWrongInput('email')
      } else if (e.message == 'Firebase: Error (auth/wrong-password).') {
        setError('Incorrect password')
        setWrongInput('password')
      } else if (e.message.includes('temporarily disabled')) {
        setError('Account temporarily disabled. Try again later')
      } else {
        setError('Failed to login')
      }
      console.log(e.message)
    }
    setLoading(false)
  }


  return (
    <main>
      <section className='signUpSection'>
        <div >
          <div className='titleFormDiv'>
            <h2 className='titleForm'>Login</h2>
          </div>
          <form onSubmit={handleSubmit} className='formLogin formRegister'>
            {error && <p className='errorMessage'>{error}</p>}
            <div className='emailDiv'>
              <label htmlFor="email">Email</label>
              <input onClick={() => resetWrong('email')} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required />
            </div>

            <div className='passwordDiv'>
              <label htmlFor="password">Password</label>
              <input onClick={() => resetWrong('password')} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required />
            </div>
            
            {!loading && <button type='submit' className='submitButton'>Login</button>}
            <div className='forgotPasswordDiv'>
              <Link to={'/forgot-password'} >Forgot Password?</Link>
            </div>

          </form>
        </div>
        <div className='changeSignIn'>
          <p>Don't have an account? <Link to={'/signup'}> Sign Up </Link></p>
        </div>

      </section>
    </main>
  )
}
