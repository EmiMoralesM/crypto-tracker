import React, { useState } from 'react'
import "../styles/NavBar.css"
import { Routes, Route, Link } from 'react-router-dom'
import 'animate.css';
import { UserAuth } from '../tools/AuthContext'

export default function NavBar(props) {
	const [menuCurrencies, setMenuCurrencies] = useState(false)
	const [languagesMenu, setLanguagesMenu] = useState(false)
	const [settings, setSettings] = useState(false)
	const { user, handleLogout } = UserAuth()

	const changeCurrency = (curr) => {
		setMenuCurrencies(prevMenuCurrencies => !prevMenuCurrencies)
		props.setCurrency(curr)
		localStorage.setItem('currency', JSON.stringify(curr))
	}
	const toggleLanguageMenu = () => {
		setLanguagesMenu(prevLanguagesMenu => !prevLanguagesMenu)
	}
	const toggleLanguage = (lang) => {
		props.setLanguage(lang)
		toggleLanguageMenu()
	}
	const toggleSettings = () => {
		setSettings(prevSettings => !prevSettings)
	}

	
	return (
		<section className='navbar animate__animated animate__fadeInDown' >
			<div className='navLeftSide'>
				<h1 className='logo animate__animated animate__fadeIn' style={{animationDelay: ".4s"}}><Link to={"/"}>Logo</Link></h1>
				<ul className='mainMenu'>
					<li><Link to={"/"} className='navCryptocurrencies animate__animated animate__fadeIn' style={{animationDelay: ".5s"}}>Cryptocurrencies</Link></li>
					<li><Link to={"/"} className='normalHoverItems'>Home</Link></li>
					<li><Link to={"/contact"} className='normalHoverItems animate__animated animate__fadeIn' style={{animationDelay: ".7s"}}>Contact</Link></li>
				</ul>
			</div>
			<div className='navRightSide '>
				<div className='currenciesDiv'>
					<div className='selectedCurrency animate__animated animate__fadeIn' style={{animationDelay: ".9s"}}>
						<div className='currencyDiv currencyDivActive' onClick={() => setMenuCurrencies(prevMenuCurrencies => !prevMenuCurrencies)}>
							<i className={`i${props.currency.name}`}></i>
							<p>{props.currency.name}</p>
						</div>
					</div>

					{menuCurrencies && <div className='animate__animated animate__fadeIn animate__faster currencyOptions'>
						<div className='currencyDiv' onClick={() => changeCurrency({name: "USD", symbol: "$", format: "en-US"})}>
							<i className={'iUSD'}></i>
							<p>USD</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({name: "EUR", symbol: "€", format: "en-DE"})}>
							<i className='iEUR'></i>
							<p>EUR</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({name: "CAD", symbol: "$", format: "en-US"})}>
							<i className='iCAD'></i>
							<p>CAD</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({name: "GBP", symbol: "£", format: "en-GB"})}>
							<i className='iGBP'></i>
							<p>GBP</p>
						</div>
					</div>}
				</div>
				<div className='divition animate__animated animate__fadeIn' style={{animationDelay: "1.1                                                            s"}}></div>
				{!user && <div className='loginButtons'>
					<Link to={'/login'} className='loginButton animate__animated animate__fadeIn' style={{animationDelay: "1.2s"}}>Login</Link>
					<Link to={'/signup'} className='signupButton animate__animated animate__fadeIn' style={{animationDelay: "1.4s"}}>Sign Up</Link>
				</div>}
				{user && <div className='loginButtons'>
					<Link to={'/profile/user-info'} className='imgProfile animate__animated animate__fadeIn' style={{animationDelay: "1.2s"}}>
						{!user.photoURL && <i class="fa-solid fa-user"></i> }
						{user.photoURL && <img src={user.photoURL} alt="" /> }
					</Link>
				</div>}
				<div className='settings' >
					<p className='settingsButton animate__animated animate__fadeIn' style={{animationDelay: "1.6s"}} onClick={toggleSettings} ></p>
					{settings && <div className='backgroundMenuSettings' onClick={toggleSettings}></div>}
					{settings && <aside className='menuSettings animate__animated animate__fadeInRight animate__faster'>
						<div className='settingsTitleDiv'>
							<p><strong>Settigns</strong></p>
						</div>
						<hr />
						<div className='profileDiv'>
							<Link to={"/profile/user-info"} onClick={toggleSettings} className='profile'>Profile
								<i className={'arrow right'}></i>
							</Link>

						</div>
						<hr />
						<div className='themeDiv'>
							<p>Theme</p>
							<div>
								<input onChange={() => {
									props.toggleTheme()
								}} checked={props.theme == "dark" ? '': 'checked'} type="checkbox" className="checkboxTheme" id="checkboxTheme" />
								<label htmlFor="checkboxTheme" className="labelTheme">
									<div className='ballTheme'></div>
								</label>
							</div>
						</div>
						{/* <div className='languageDiv'>
							<p>{props.language == "English" ? "Language": "Lenguaje"}</p>
							<div>
								<div className={`actualLanguageDiv ${languagesMenu ? "actualLanguageDivOpen": undefined}`} onClick={toggleLanguageMenu}>
									<p className='actualLanguage'>{props.language}</p>
									<i className={'arrow right'} style={languagesMenu ? {transform: "rotate(45deg)"}: undefined}></i>
								</div>
								{ languagesMenu && <div className='changeLanguageDiv'>
									<div onClick={() => toggleLanguage("English")}>
										<img src="" alt="" />
										<p>English</p>
									</div>
									<div onClick={() => toggleLanguage("Español")}>
										<img src="" alt="" />
										<p>Español</p>
									</div>
								</div>}
							</div>
						</div> */}
						<Link to={'/'} className='whatchlistDiv'>
							<div>
								{/* <img src="src/resourses/star.svg" alt="" /> */}
								<i className="fa-regular fa-star"></i>
								<p onClick={() => {
									props.setActiveWatchlist(true)
									toggleSettings()
								}}>Whatchlist</p>
							</div>
							<i className={'arrow right'}></i>

						</Link>
						<hr />
						{user && <div onClick={() => {
								handleLogout()
								toggleSettings()
							}} className='signoutDiv'>
							{/* <img src="src/resourses/sign-out.svg" alt="" /> */}
							<i className="fa-solid fa-arrow-right-from-bracket"></i>
							<p>Log Out</p>
						</div>}
					</aside>}
				</div>
			</div>
		</section>
	)
}
