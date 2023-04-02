import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NavBar from './components/NavBar'
import ShowCoin from './Pages/ShowCoin'

function App() {
	const [currency, setCurrency] = useState("USD")
	console.log(currency)

	return (
		<div className='App'>
			<NavBar currency={currency} setCurrency={setCurrency}/>
			<Routes>
				<Route index element={<Home currency={currency} />} />
				<Route path='/:id' element={<ShowCoin />} />
			</Routes>

		</div>
	)
}

export default App
