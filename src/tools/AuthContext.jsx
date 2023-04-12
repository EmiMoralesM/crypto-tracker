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
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'

const UserContext = createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({})
    const [image, setImage] = useState()
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

    const deleteProfilePicture = async () => {
        const storage = getStorage()
        const desertRef = ref(storage, user.photoURL);
        // Delete the file
        await deleteObject(desertRef).then(() => {
            console.log('Picture deleted')
            updateProfile(auth.currentUser, {
                photoURL: ''
            }).then(() => {
                forceUpdate()
            }).catch((error) => {
                console.log(error.message)
            });
        }).catch((error) => {
            console.log(error.message)
        });

        
        console.log('User Pic: ', user.photoURL)
    }

    const handleChangeImage = (e) => {
        const storage = getStorage()
        // Creating the image ref with the file the user uploaded. 
        const imageRef = ref(storage, 'e.target.files[0]')
        setImage(e.target.files[0])
        // Uploading the image to the firebase cloud.
        uploadBytes(imageRef, e.target.files[0]).then(() => {
            // Now we download the image we just updated
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

    const handleChangeUsername = async (e) => {
        e.preventDefault()
        const newUsername = e.target.username.value;
        await updateProfile(auth.currentUser, {
            displayName: newUsername
        }).then(() => {
            console.log('Username updated')
            forceUpdate()
        }).catch((error) => {
            console.log(error.message)
        });
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
        <UserContext.Provider value={{ user, createUser, login, resetPassword, setWrongInput, resetWrong, handleLogout, handleChangeImage, handleChangeUsername, deleteProfilePicture }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}



