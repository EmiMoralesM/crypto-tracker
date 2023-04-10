import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from './AuthContext'

function ProtectedRegister({children}) {
    const { user } = UserAuth()
    console.log(user)
    if (user) {
        return <Navigate to={'/profile'}/>
    } else{
        return children
    }
}


export default ProtectedRegister 