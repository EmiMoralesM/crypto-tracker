import React, { useState } from 'react'
import "../styles/NavBar.css"
import { Routes, Route, Link } from 'react-router-dom'
import 'animate.css';

export default function NavBar(props) {
	const [menuCurrencies, setMenuCurrencies] = useState(false)
	const [settings, setSettings] = useState(false)

	
	const changeCurrency = (curr) => {
		setMenuCurrencies(prevMenuCurrencies => !prevMenuCurrencies)
		props.setCurrency(curr)
	}
	return (
		<div className='navbar'>
			<div className='navLeftSide'>
				<h1 className=' logo'><Link  to={["/"]}>Logo</Link></h1>
				<ul className='mainMenu'>
					<li><Link to={["/"]} className='navCryptocurrencies'>Cryptocurrencies</Link></li>
					<li><Link to={["/"]} className='normalHoverItems'>Home</Link></li>
					<li><Link to={["/"]} className='normalHoverItems'>Contact</Link></li>
				</ul>
			</div>
			<div className='navRightSide '>
				<div className='currenciesDiv'>
					<div className='selectedCurrency '>
						<div className='currencyDiv' onClick={() => setMenuCurrencies(prevMenuCurrencies => !prevMenuCurrencies)}>
							<img src={`https://static.coinstats.app/flags/${props.currency}_r.png`} alt="Currency Image" />
							<p>{props.currency}</p>
						</div>
					</div>

					{menuCurrencies && <div  className='animate__animated animate__fadeIn animate__faster currencyOptions'>
						<div className='currencyDiv' onClick={() => changeCurrency("USD")}>
							<img src="https://static.coinstats.app/flags/USD_r.png" alt="Currency Image" />
							<p>USD</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency("EUR")}>
							<img src="https://static.coinstats.app/flags/EUR_r.png" alt="Currency Image" />
							<p>EUR</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency("CAD")}>
							<img src="https://static.coinstats.app/flags/CAD_r.png" alt="Currency Image" />
							<p>CAD</p>
						</div>
					</div>}
				</div>
				<div className='divition'></div>
				<div className='loginButtons'>
					<Link className='loginButton'>Login</Link>
					<Link className='signupButton'>Sign Up</Link>
				</div>
				<div className='settings' >
					<p className='settingsButton' onClick={() => setSettings(prevSettings => !prevSettings)}></p>
					{settings && <div className='backgroundMenuSettings' onClick={() => setSettings(prevSettings => !prevSettings)}>
						<aside className='menuSettings animate__animated animate__fadeInRight animate__faster'>
							<div className='profileDiv'>
							<Link to={"/"}>Profile</Link>
								<img src="" alt="" />
							</div>
							<div className='themeDiv'>
								<p>Theme</p>
								<div>
									<input id="theme" type="checkbox" />
									<label htmlFor="theme"></label>
								</div>
							</div>
							<div className='languageDiv'>
								<p>Language</p>
								<div>
									<p>English</p>
								</div>
							</div>
							<div className='whatchlistDiv'>
								<Link to={"/"}>Whatchlist</Link>
								<img src="" alt="" />
							</div>
							<div className='logoutDiv'>
								<p>Log Out</p>
								<img src="" alt="" />
							</div>
						</aside>
					</div>}
					{/* {settings && <aside className='menuSettings animate__animated animate__fadeInRight'>
						<div className='profileDiv'>
						<Link to={"/"}>Profile</Link>
							<img src="" alt="" />
						</div>
						<div className='themeDiv'>
							<p>Theme</p>
							<div>
								<input id="theme" type="checkbox" />
								<label htmlFor="theme"></label>
							</div>
						</div>
						<div className='languageDiv'>
							<p>Language</p>
							<div>
								<p>English</p>
							</div>
						</div>
						<div className='whatchlistDiv'>
							<Link to={"/"}>Whatchlist</Link>
							<img src="" alt="" />
						</div>
						<div className='logoutDiv'>
							<p>Log Out</p>
							<img src="" alt="" />
						</div>
					</aside>} */}
				</div>
			</div>
		</div>
	)
}
