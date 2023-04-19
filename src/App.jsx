import NavBar from './components/NavBar'
import Home from './Pages/Home'
import ShowCoin from './Pages/ShowCoin'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import Profile from './Pages/Profile'

import Signature from './components/Signature'
import Loader from './components/Loader'

import ProtectedProfile from './tools/ProtectedProfile'
import ProtectedRegister from './tools/ProtectedRegister'

import './App.css'

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './tools/AuthContext'

function App() {
	const localCurrency = localStorage.getItem('currency') != null ? JSON.parse(localStorage.getItem('currency')) : { name: "USD", symbol: "$" }
	const localTheme = localStorage.getItem('theme') != null ? localStorage.getItem('theme') : "dark"
	const localObjectsWatchlist = localStorage.getItem('objectsWatchlist') != null ? JSON.parse(localStorage.getItem('objectsWatchlist')) : []

	const [theme, setTheme] = useState(localTheme)
	const [currency, setCurrency] = useState(localCurrency)
	const [language, setLanguage] = useState("English")
	const [activeWatchlist, setActiveWatchlist] = useState(false)
	const [coins, setCoins] = useState([])
	
	const [coinsObjects, setCoinsObjects] = useState([])
	const [objectsWatchlist, setObjectsWatchlist] = useState(localObjectsWatchlist)
	
	const [pageNumber, setPageNumber] = useState(1)


	const urlCoins = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=false&price_change_percentage=1h%2C7d&locale=en`

	// Fetch the API and set the data to the coins state.
	useEffect(() => {
		fetch(urlCoins)
			.then(res => res.json())
			.then(data => {
				setCoins(data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [currency, pageNumber])

	useEffect(() => {
		showTheme(theme)
	}, [])

	const setDarkMode = () => {
		document.querySelector("body").setAttribute('data-theme', "dark")
	}
	const setLightMode = () => {
		document.querySelector("body").setAttribute('data-theme', "light")
	}

	const showTheme = (newtheme) => {
		newtheme == "light" ? setLightMode() : setDarkMode()
	}

	const toggleTheme = () => {
		const newtheme = theme == "light" ? "dark" : "light"
		localStorage.setItem('theme', newtheme);
		setTheme(newtheme)
		showTheme(newtheme)
	}

	const currencyFormatter = new Intl.NumberFormat(currency.format, {
		style: 'currency',
		currency: currency.name == "CAD" ? "USD" : currency.name
	});


	return (
		<div className='App'>
			<AuthContextProvider>
				<NavBar  activeWatchlist={activeWatchlist} setActiveWatchlist={setActiveWatchlist}
					currency={currency} setCurrency={setCurrency}
					language={language} setLanguage={setLanguage}
					theme={theme}
					showTheme={showTheme} toggleTheme={toggleTheme}
				/>
				<Loader theme={theme}/>
				<Routes>
					{/* <Route index element={<Home pageNumber={pageNumber} setPageNumber={setPageNumber}
						activeWatchlist={activeWatchlist} setActiveWatchlist={setActiveWatchlist}
						currencyFormatter={currencyFormatter} currency={currency}
						coins={coins} setCoins={setCoins}
						coinsObjects={coinsObjects} setCoinsObjects={setCoinsObjects}
						objectsWatchlist={objectsWatchlist}
					/>} /> */}

					<Route path='*' element={<Home pageNumber={pageNumber} setPageNumber={setPageNumber}
						activeWatchlist={activeWatchlist} setActiveWatchlist={setActiveWatchlist}
						currencyFormatter={currencyFormatter} currency={currency}
						coins={coins} setCoins={setCoins}
						coinsObjects={coinsObjects} setCoinsObjects={setCoinsObjects}
						objectsWatchlist={objectsWatchlist}
					/>} />


					<Route path='/coin/:id' element={<ShowCoin 
						currency={currency} currencyFormatter={currencyFormatter}
						theme={theme}
						coins={coins}
						coinsObjects={coinsObjects}
						objectsWatchlist={objectsWatchlist}
						setObjectsWatchlist={setObjectsWatchlist}
					/>} />
					
					
					<Route path='/signup' element={<ProtectedRegister><Signup /></ProtectedRegister>} />
					<Route path='/login' element={<ProtectedRegister><Login /></ProtectedRegister>} />
					<Route path='/forgot-password' element={<ProtectedRegister><ForgotPassword /></ProtectedRegister>} />

					<Route path='/profile' element={<ProtectedProfile ><Profile objectsWatchlist={objectsWatchlist} setObjectsWatchlist={setObjectsWatchlist} setActiveWatchlist={setActiveWatchlist} /></ProtectedProfile>} />
					<Route path='/profile/:page/*' element={<ProtectedProfile ><Profile objectsWatchlist={objectsWatchlist} setObjectsWatchlist={setObjectsWatchlist} setActiveWatchlist={setActiveWatchlist} /></ProtectedProfile>} />

					{/* <Route path='/profile' element={<Profile />} /> */}

					{/* <Route path='/register' element={<Register />} /> */}

				</Routes>
			</AuthContextProvider>

			{/* <Footer /> */}
			<Signature />
		</div>
	)
}

export default App
