import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const setWrongInput = (id) => {
        document.getElementById(id).classList.add('wrongData')
    }
    const resetWrong = (id) => {
        document.getElementById(id).classList.remove('wrongData')
    }

    const handleLogout = async () => {
        try {
          await signOut(auth)
          navigate('/')
          console.log('You are logged out!')
        } catch (error) {
          console.log(error.message)
        }
      }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, createUser, login, resetPassword, setWrongInput, resetWrong, handleLogout}}>
            {props.children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}






    // const [currentUser, setCurrentUser] = useState()


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(user => {
    //         setCurrentUser(user)
    //     })

    //     return unsubscribe
    // }, [])

    // const value = {
    //     currentUser,
    //     createUser
    // }