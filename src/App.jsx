import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NavBar from './components/NavBar'
import ShowCoin from './Pages/ShowCoin'

function App() {
	const localCurrency = localStorage.getItem('currency') != null ? JSON.parse(localStorage.getItem('currency')) : {name: "USD", symbol: "$"}
	const localTheme = localStorage.getItem('theme') != null ? localStorage.getItem('theme') : "dark"
	const [theme, setTheme] = useState(localTheme)
	const [currency, setCurrency] = useState(localCurrency)
	const [language, setLanguage] = useState("English")

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
		newtheme == "light" ? setLightMode(): setDarkMode() 
	}
	const toggleTheme = () => {
		const newtheme = theme == "light" ? "dark": "light"
		localStorage.setItem('theme', newtheme);
		setTheme(newtheme)
		showTheme(newtheme)
	}
	console.log("rendering...")
	return (
		<div className='App'>
			<NavBar currency={currency} setCurrency={setCurrency}
					language={language} setLanguage={setLanguage}
					theme={theme} 
					showTheme={showTheme}
					toggleTheme={toggleTheme}
			/>
			<Routes>
				<Route index element={<Home currency={currency} />} />
				<Route path='/:id' element={<ShowCoin />} />
			</Routes>

		</div>
	)
}

export default App
