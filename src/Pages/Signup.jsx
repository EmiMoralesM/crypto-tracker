import React, { useState } from 'react'
import '../styles/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../tools/AuthContext'

export default function Signup() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const {createUser} = UserAuth()
   const navigate = useNavigate()
   
   // console.log(createUser)
   const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')

      try {
         await createUser(email, password)
         navigate('/profile')
         // setLoading(true)
      } catch (e) {
         setError(e.message)
         console.log(e.message)
      }

   }

   return (
      <main>
         <section className='signUpSection'>
            <div >
               <h2>Sign Up</h2>
               <form onSubmit={handleSubmit}>
                  <div className='emailDiv'>
                     <label htmlFor="email">Email</label>
                     <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required />
                  </div>

                  <div className='passwordDiv'>
                     <label htmlFor="password">Password</label>
                     <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password"required />
                  </div>

                  {/* <div className='passwordConfirmDiv'>
                     <label htmlFor="passwordConfirm">Password Confirmation</label>
                     <input type="password" name="passwordConfirm" id="passwordConfirm" required />
                  </div> */}
                  <button type='submit'>Sign Up</button>
               </form>
            </div>
            <div>
               <p>Already have an account? <Link to={'/login'}> Login </Link></p>
            </div>

         </section>
      </main>
   )
}


// const emailRef = useRef()
   // const passwordRef = useRef()
   // const passwordConfirmRef = useRef()
   // const [loading, setLoading] = useState(false)
   
      // if (passwordRef.current.value !== passwordConfirmRef.current.value){
      //   return setError('Passwords do not match!')
      // }