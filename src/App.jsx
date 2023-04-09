import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Signature from './components/Signature'
import ShowCoin from './Pages/ShowCoin'
// import Register from './Pages/Register'
import Signup from './Pages/Signup'
import { AuthContextProvider } from './tools/AuthContext'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import ProtectedRoute from './tools/ProtectedRoute'

function App() {
	const localCurrency = localStorage.getItem('currency') != null ? JSON.parse(localStorage.getItem('currency')) : { name: "USD", symbol: "$" }
	const localTheme = localStorage.getItem('theme') != null ? localStorage.getItem('theme') : "dark"
	const localWatchlist = localStorage.getItem('watchlist') != null ? JSON.parse(localStorage.getItem('watchlist')) : []
	const [theme, setTheme] = useState(localTheme)
	const [currency, setCurrency] = useState(localCurrency)
	const [language, setLanguage] = useState("English")
	const [watchlist, setWatchlist] = useState(localWatchlist)
	const [activeWatchlist, setActiveWatchlist] = useState(false)
	const [coins, setCoins] = useState([])

	// const localPageNumber = localStorage.getItem('theme') != null ? parseInt(localStorage.getItem('pageNumber')) : 1
	const [pageNumber, setPageNumber] = useState(1)

	const urlCoins = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=false&price_change_percentage=1h%2C7d&locale=en`

	// Fetch the API and set the data to the coins state.
	useEffect(() => {
		fetch(urlCoins)
			.then(res => res.json())
			.then(data => {
				setCoins(data)
				console.log(data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [currency, pageNumber])

	useEffect(() => {
		showTheme(theme)
	}, [])
	// useEffect(() => {
	// 	console.log(pageNumber)
	// }, [pageNumber])

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

	console.log("rendering...")

	return (
		<div className='App'>
			<NavBar activeWatchlist={activeWatchlist} setActiveWatchlist={setActiveWatchlist}
				currency={currency} setCurrency={setCurrency}
				language={language} setLanguage={setLanguage}
				theme={theme}
				showTheme={showTheme} toggleTheme={toggleTheme}
			/>
			<AuthContextProvider>
				<Routes>
					<Route index element={<Home pageNumber={pageNumber} setPageNumber={setPageNumber}
						activeWatchlist={activeWatchlist} setActiveWatchlist={setActiveWatchlist}
						watchlist={watchlist}
						currencyFormatter={currencyFormatter} currency={currency}
						coins={coins} setCoins={setCoins}
					/>} />

					<Route path=':page' element={<Home pageNumber={pageNumber} setPageNumber={setPageNumber}
						activeWatchlist={activeWatchlist} setActiveWatchlist={setActiveWatchlist}
						watchlist={watchlist}
						currencyFormatter={currencyFormatter} currency={currency}
						coins={coins} setCoins={setCoins}
					/>} />

					<Route path='/coin/:id' element={<ShowCoin watchlist={watchlist} setWatchlist={setWatchlist}
						currency={currency} currencyFormatter={currencyFormatter}
						theme={theme}
						coins={coins}
					/>} />

					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />

					<Route path='/profile' element={
						<ProtectedRoute >
							<Profile />
						</ProtectedRoute>
					} />

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
