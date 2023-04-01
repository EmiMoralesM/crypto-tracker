import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NavBar from './components/NavBar'
import ShowCoin from './Pages/ShowCoin'

function App() {

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/:id' element={<ShowCoin />}/>
      </Routes>

    </div>
  )
}

export default App
