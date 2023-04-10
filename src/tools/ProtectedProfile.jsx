import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from './AuthContext'

function ProtectedProfile({children}) {
    const { user } = UserAuth()
    console.log(user)
    if (!user) {
        return <Navigate to={'/login'}/>
    } else{
        // return <Navigate to={'/profile'}/>
        return children
    }
}


export default ProtectedProfile 