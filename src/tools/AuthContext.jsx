import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    deleteUser,
} from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'

const UserContext = createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({})
    const [loadingImage, setLoadingImage] = useState(false)
    const [loadingUsername, setLoadingUsername] = useState(false)
    const [accountError, setAccountError] = useState('')

    const [resentLogin, setResentLogin] = useState(true)
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }

    }, [])

    // If there is no username, set a default one (the email). 
    useEffect(() => {
        if (user) {
            if (user.email) {
                if (!user.displayName) {
                    updateProfile(auth.currentUser, {
                        displayName: user.email.split("@")[0]
                    }).then(() => {
                        forceUpdate()
                    }).catch((error) => {
                        console.log(error.message)
                    });
                }
            }
        }
    }, [user])

    const setWrongInput = (id) => {
        document.getElementById(id).classList.add('wrongData')
    }

    const resetWrong = (id) => {
        document.getElementById(id).classList.remove('wrongData')
    }

    const deleteProfilePicture = async () => {
        if (user.photoURL) {
            setLoadingImage(true)
            const storage = getStorage()
            const desertRef = ref(storage, user.photoURL);
            // Delete the file
            await deleteObject(desertRef).then(() => {
                updateProfile(auth.currentUser, {
                    photoURL: ''
                }).then(() => {
                    console.log('Picture deleted')
                    forceUpdate()
                    setLoadingImage(false)
                }).catch((error) => {
                    console.log(error.message)
                    setAccountError("Couldn't delete the profile picture.");
                    setTimeout(() => setAccountError(''), 5000)
                });
            }).catch((error) => {
                console.log(error.message)
                setAccountError("Couldn't delete the profile picture.");
                setTimeout(() => setAccountError(''), 5000)
            });
            setLoadingImage(false)
        }
    }

    const deleteAccount = () => {
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            console.log('User Deleted!')
            forceUpdate()
        }).catch((error) => {
            if(error.message == 'Firebase: Error (auth/requires-recent-login).'){
                console.log(error.message)
                setResentLogin(false)
            } else{
                setAccountError("Couldn't delete the account Please, try again later")
                setTimeout(() => setAccountError(''), 5000)
            }

        });
    }

    const handleChangeImage = (e) => {
        if (e.target.files[0].size > 2097152) {
            console.log('File too big')
            setAccountError('File too big! (max. 2MB)');
            setTimeout(() => setAccountError(''), 5000)
        } else {
            setLoadingImage(true)
            const storage = getStorage()
            // Creating the image ref with the file the user uploaded. 
            const imageRef = ref(storage, 'e.target.files[0]')
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
                        setLoadingImage(false)
                    }).catch((error) => {
                        console.log(error.message)
                        setLoadingImage(false)
                        setAccountError("Couldn't change the profile picture.");
                        setTimeout(() => setAccountError(''), 5000)

                    });
                })
            })
        }
    }

    const handleChangeUsername = async (e) => {
        e.preventDefault()
        setLoadingUsername(true)
        const newUsername = e.target.username.value;
        await updateProfile(auth.currentUser, {
            displayName: newUsername
        }).then(() => {
            console.log('Username updated')
            forceUpdate()
        }).catch((error) => {
            console.log(error.message)
            setAccountError("Couldn't change the username.");
            setTimeout(() => setAccountError(''), 5000)
        });
        setLoadingUsername(false)
        e.target.username.value = ''
    }

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate('/login')
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
        <UserContext.Provider value={{ user, createUser, login, resetPassword, setWrongInput, resetWrong, handleLogout, handleChangeImage, handleChangeUsername, deleteProfilePicture, loadingImage, deleteAccount, setResentLogin, resentLogin, loadingUsername, accountError }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}


