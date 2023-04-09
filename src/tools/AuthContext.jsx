import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase'

const UserContext = createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({})

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    const logout = () => {
        return signOut(auth)
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
        <UserContext.Provider value={{createUser, user, logout, login}}>
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