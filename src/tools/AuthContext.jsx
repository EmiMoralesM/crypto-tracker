import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'

const UserContext = createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({})
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const setWrongInput = (id) => {
        document.getElementById(id).classList.add('wrongData')
    }

    const resetWrong = (id) => {
        document.getElementById(id).classList.remove('wrongData')
    }

    const handleChangeImage = (e) => {
        const storage = getStorage()
        // Creatign the image ref with the file the user uploaded. 
        const imageRef = ref(storage, 'e.target.files[0]')

        // Uploading the image to the firebase cloud.
        uploadBytes(imageRef, e.target.files[0]).then(() => {
            // Now we download the iage we just updated
            getDownloadURL(imageRef).then((url) => {
                // We set the profile to have that image
                updateProfile(auth.currentUser, {
                    photoURL: url
                }).then(() => {
                    console.log('Profile picture updated')
                    forceUpdate()
                }).catch((error) => {
                    console.log(error.message)
                });
            })
        })
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




    return (
        <UserContext.Provider value={{ user, createUser, login, resetPassword, setWrongInput, resetWrong, handleLogout, handleChangeImage }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}



