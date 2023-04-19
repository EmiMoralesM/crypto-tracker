import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../tools/AuthContext'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { resetPassword } = UserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        try {
            setLoading(true)
            await resetPassword(email)
            setMessage('Check your inbox for further instructions! 😄')
        } catch (e) {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <main>
            <section className='signUpSection'>
                <div >
                    <div className='titleFormDiv'>
                        <h2 >Password Reset</h2>

                    </div>
                    <form onSubmit={handleSubmit} className='formResetPassword formRegister'>
                        {message && <p className='successMessage'>{message}</p>}
                        {error && <p className='errorMessage'>{error}</p>}
                        <div className='emailDiv'>
                            <label htmlFor="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required />
                        </div>

                        {!loading && <button className='resetPasswordButton' type='submit'>Reset Password</button>}
                        <div className='resetPasswordLogIn'>
                            <Link to={'/login'}> Login </Link>
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
