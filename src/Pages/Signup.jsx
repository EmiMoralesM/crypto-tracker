import React, { useState } from 'react'
import '../styles/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../tools/AuthContext'

export default function Signup() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)
   const {createUser, setWrongInput, resetWrong } = UserAuth()
   const navigate = useNavigate()
   
   const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      
      if (password !== confirmPassword){
         setWrongInput('passwordConfirm')
         return setError('Passwords do not match')
      }
      try {
         setLoading(true)
         await createUser(email, password)
         navigate('/profile/user-info')
         // setLoading(true)
      } catch (e) {
         if (e.message == 'Firebase: Error (auth/email-already-in-use).'){
            setError('Email already in use')
            setWrongInput('email')
         } else if (e.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            setError('Short password')
            setWrongInput('password')
         } else{
            setError('Failed to create an account')
         }
      }
      setLoading(false)

   }

   return (
      <main>
         <section className='signUpSection'>
            <div >
               <div className='titleFormDiv'>
                  <h2 className='titleForm'>Sign Up</h2>

               </div>
               <form onSubmit={handleSubmit} className='formSignUp formRegister'>
                  {error && <p className='errorMessage'>{error}</p>}
                  <div className='emailDiv'>
                     <label htmlFor="email">Email</label>
                     <input onClick={() => resetWrong('email')} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required />
                  </div>

                  <div className='passwordDiv'>
                     <label htmlFor="password">Password</label>
                     <input onClick={() => resetWrong('password')} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required />
                  </div>

                  <div className='passwordConfirmDiv'>
                     <label htmlFor="passwordConfirm">Password Confirmation</label>
                     <input onClick={() => resetWrong('passwordConfirm')} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="passwordConfirm" id="passwordConfirm" required />
                  </div>
                  {!loading && <button type='submit' className='submitButton'>Sign Up</button>}
               </form>
            </div>
            <div className='changeLogin'>
               <p>Already have an account? <Link to={'/login'}> Login </Link></p>
            </div>

         </section>
      </main>
   )
}
