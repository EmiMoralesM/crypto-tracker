import React from 'react'
import Signup from '../components/Signup'
import { AuthContextProvider } from '../tools/AuthContext'
import { Route, Routes } from "react-router-dom";

export default function Register() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </AuthContextProvider>
  )
}
