import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from './AuthContext'

function ProtectedRoute({children}) {
    const { user } = UserAuth()
    console.log(user)
    if (!user) {
        return <Navigate to={'/login'}/>
    } else{
        return children
    }
}


export default ProtectedRoute 