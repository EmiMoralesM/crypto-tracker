import React, { useEffect, useState } from 'react'
import '../styles/Register.css'
import { UserAuth } from '../tools/AuthContext'
import { Link, useParams } from 'react-router-dom'


export default function Profile(props) {
  const { user, handleLogout, handleChangeImage, handleChangeUsername, deleteProfilePicture, loadingImage, bigFile, deleteAccount, setResentLogin, resentLogin } = UserAuth()

  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const params = useParams()
  const [actualPage, setActualPage] = useState()

  useEffect(() => {
    setActualPage(params.page ? params.page : 'user-info')
  }, [params.page])

  const toggleDelete = () => {
    setDeleteConfirmation(prevDeleteConfirmation => !prevDeleteConfirmation)
  }
  return (
    <main>
      {user && <section className='profileSection'>
        <div className='profilePageDiv'>
          <div className='leftSide'>
            <h1>Profile Page</h1>
            <Link className={actualPage == 'user-info' ? "activePageProfile" : ""} to={'/profile/user-info'}><i className="fa-solid fa-user"></i> User Info</Link>
            <Link to={'/'} onClick={() => {
              props.setActiveWatchlist(true)
            }}><i className="fa-solid fa-star"></i> Watchlist</Link>
            <Link className={actualPage == 'settigns' ? "activePageProfile" : ""} to={'/profile/settigns'}><i className="fa-solid fa-wrench"></i> Settigns</Link>
            <Link to={'/'} onClick={() => {
              handleLogout()
            }}><i className="fa-solid fa-right-from-bracket"></i> Log out</Link>
          </div>
          <div className='rightSide'>
            {actualPage == 'user-info' && <div>
              <h2>User Info</h2>
              <div className='profileInfoDiv'>
                <div>
                  {loadingImage && <div className='photoProfileDiv ' >
                    <div src='' className='profileImage imageSkeleton' alt="" />
                  </div>}
                  {!loadingImage && user.photoURL && <div className='photoProfileDiv' >
                    <img src={user.photoURL} className='profileImage' alt="" />
                  </div>}
                  {!loadingImage && !user.photoURL && <div className='photoProfileDiv'><i className="fa-solid fa-user"></i></div>}
                  <label htmlFor="changePic"><i className="changePic fa-solid fa-camera"></i></label>
                  <input id='changePic' onChange={handleChangeImage} type="file" />
                </div>

                <div>
                  <p className='usernameP'>{user.displayName}</p>
                  <p className='emailP'>{user.email}</p>
                </div>
              </div>
              {bigFile && <div>
                <p className='bigFileError'>File too big! (max. 2MB) </p>
              </div>}
              <div >
                <form className='changeUsernameForm' onSubmit={handleChangeUsername} action="">
                  <div>
                    <label htmlFor="username">Change Username</label>
                    <input type="text" id='username' maxLength="35" name='username' />
                  </div>
                  <button type='submit'>Save</button>
                </form>
              </div>
              <div className='deletePictureDiv'>
                <button onClick={deleteProfilePicture} ><i className="fa-solid fa-trash"></i> Delete Profile Picture</button>
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
            {actualPage == 'settigns' && <div>
              <h2>Settings</h2>
              <div className='settingDelete'>
                <p>Delete Account</p>
                <button onClick={toggleDelete}>Delete</button>
                {deleteConfirmation && <div className='deleteConfirmation'>
                  <div>
                    <p><i className="fa-solid fa-triangle-exclamation"></i></p>
                    <p className='titleDeleteConfirm'>Do you really want to delete your account?</p>
                    <p className='desctitleDeleteConfirm'>You won’t be able to recover your account in the future.</p>
                    <div>
                      <button className='deleteButton' onClick={() => {
                        toggleDelete()
                        deleteAccount()
                      }}>Delete</button>
                      <button className='cancelButton' onClick={toggleDelete}>Cancel</button>
                    </div>
                  </div>
                </div>}
                {!resentLogin && <div className='requireResentLogin'>
                  <div>
                    <p><i class="fa-solid fa-bell"></i></p>
                    <p className='titleDeleteConfirm'>You have been logged in for a while</p>
                    <p className='desctitleDeleteConfirm'>For security reasons, to delete your account you must have logged in recently.</p>
                    <p className='desctitleDeleteConfirm'>Please, login again.</p>
                    <div>
                      <button className='resentLoginButton' onClick={() => {
                        setResentLogin(true)
                        handleLogout()
                      }}>Login</button>
                      <button className='cancelButton' onClick={() => setResentLogin(true)}>Cancel</button>
                    </div>
                  </div>
                </div>}
              </div>
            </div>}
          </div>
        </div>

      </section>}
    </main>
  )
}
