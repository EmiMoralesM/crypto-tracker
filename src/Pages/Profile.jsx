import React, { useState } from 'react'
import '../styles/Register.css'
import { UserAuth } from '../tools/AuthContext'
import { Link, useParams } from 'react-router-dom'


export default function Profile(props) {
  const { user, handleLogout, handleChangeImage, handleChangeUsername, deleteProfilePicture } = UserAuth()

  const params = useParams()

  return (
    <main>
      {user && <section className='profileSection'>
        <div className='profilePageDiv'>
          <div className='leftSide'>
            <h1>Profile Page</h1>
            <Link className={params.page == 'user-info' ? "activePageProfile" : ""} to={'/profile/user-info'}><i className="fa-solid fa-user"></i> User Info</Link>
            <Link to={'/'} onClick={() => {
              props.setActiveWatchlist(true)
            }}><i className="fa-solid fa-star"></i> Watchlist</Link>
            <Link className={params.page == 'settigns' ? "activePageProfile" : ""} to={'/profile/settigns'}><i className="fa-solid fa-wrench"></i> Settigns</Link>
            <Link to={'/'} onClick={() => {
              handleLogout()
            }}><i className="fa-solid fa-right-from-bracket"></i> Log out</Link>
          </div>
          <div className='rightSide'>
            {params.page == 'user-info' && <div>
              <h2>User Info</h2>
              <div className='profileInfoDiv'>
                <div>
                  {user.photoURL && <div className='photoProfile' >
                    <img src={user.photoURL} alt="" />
                  </div>}
                  {!user.photoURL && <div className='photoProfile'><i className="fa-solid fa-user"></i></div>}
                  <label htmlFor="changePic"><i className="changePic fa-solid fa-camera"></i></label>
                  <input id='changePic' onChange={handleChangeImage} type="file" />
                </div>
                <div>
                  <p className='usernameP'>{user.displayName}</p>
                  <p className='emailP'>{user.email}</p>
                </div>
              </div>
              
              <div >
                <form className='changeUsernameForm' onSubmit={handleChangeUsername} action="">
                  <div>
                    <label htmlFor="username">Change Username</label>
                    <input type="text" id='username' name='username' />
                  </div>
                  <button type='submit'>Save</button>
                </form>
              </div>
                <div className='deletePictureDiv'>
                  <button onClick={deleteProfilePicture} ><i class="fa-solid fa-trash"></i> Delete Profile Picture</button>
                </div>
              {/* <div>
                <form className='changeEmailForm' action="">
                  <div>
                    <label htmlFor="email">Change Email</label>
                    <input type="text" id='email' name='email' />
                  </div>
                  <button type='submit'>Save</button>
                </form>
              </div> */}
            </div>}
            {params.page == 'settigns' && <div className='rightSide'>
              <h2>Settings</h2>
            </div>}
          </div>
        </div>

      </section>}
    </main>
  )
}
