import React, { useState } from 'react'
import "../styles/NavBar.css"
import { Routes, Route, Link } from 'react-router-dom'
// import 'animate.css';
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
		if (settings) {
			document.getElementById('menuSettings').classList.add('animate__fadeOutRight');
			document.getElementById('menuSettings').classList.remove('animate__fadeInRight')
			setTimeout(() => setSettings(prevSettings => !prevSettings), 150)
		} else {
			setSettings(prevSettings => !prevSettings)
		}
	}


	return (
		<section className='navbar animate__animated animate__fadeInDown' >
			<div className='navLeftSide'>
				<div className='logoDiv'>
					<h1 className='logo animate__animated animate__fadeIn' style={{ animationDelay: ".4s" }}><Link onClick={() => {
						props.setActiveWatchlist(false)
						if (settings) {
							toggleSettings()
						}
					}} to={"/"}>Logo</Link></h1>
				</div>
				<ul className='mainMenu hideMobile'>
					<li ><Link to={"/"} onClick={() => {
						props.setActiveWatchlist(false)
						if (settings) {
							toggleSettings()
						}
					}} className='navCryptocurrencies animate__animated animate__fadeIn' style={{ animationDelay: ".5s" }}>Cryptocurrencies</Link></li>
					{/* <li><Link to={"/"} className='normalHoverItems'>Home</Link></li>
					<li><Link to={"/contact"} className='normalHoverItems animate__animated animate__fadeIn' style={{ animationDelay: ".7s" }}>Contact</Link></li> */}
				</ul>
			</div>
			<div className='navRightSide '>
				<div className='currenciesDiv hideMobile'>
					<div className='selectedCurrency animate__animated animate__fadeIn' style={{ animationDelay: ".9s" }}>
						<div className='currencyDiv currencyDivActive' onClick={() => {
							setMenuCurrencies(prevMenuCurrencies => !prevMenuCurrencies)
							if (settings) {
								toggleSettings()
							}
						}}>
							<i className={`i${props.currency.name}`}></i>
							<p>{props.currency.name}</p>
						</div>
					</div>

					{menuCurrencies && !props.activeWatchlist && <div className='animate__animated animate__fadeIn animate__faster currencyOptions'>
						<div className='currencyDiv' onClick={() => changeCurrency({ name: "USD", symbol: "$", format: "en-US" })}>
							<i className={'iUSD'}></i>
							<p>USD</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({ name: "EUR", symbol: "€", format: "en-DE" })}>
							<i className='iEUR'></i>
							<p>EUR</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({ name: "CAD", symbol: "$", format: "en-US" })}>
							<i className='iCAD'></i>
							<p>CAD</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({ name: "GBP", symbol: "£", format: "en-GB" })}>
							<i className='iGBP'></i>
							<p>GBP</p>
						</div>
					</div>}
				</div>
				<div className='divition animate__animated animate__fadeIn hideMobile' style={{ animationDelay: "1.1s" }}></div>
				{!user && <div className='loginButtons hideMobile'>
					<Link onClick={() => {
						if (settings) {
							toggleSettings()
						}
					}} to={'/login'} className='loginButton animate__animated animate__fadeIn' style={{ animationDelay: "1.2s" }}>Login</Link>
					<Link onClick={() => {
						if (settings) {
							toggleSettings()
						}
					}} to={'/signup'} className='signupButton animate__animated animate__fadeIn' style={{ animationDelay: "1.4s" }}>Sign Up</Link>
				</div>}
				{user && <div className='loginButtons'>
					<Link onClick={() => {
						if (settings) {
							toggleSettings()
						}
					}} to={'/profile/user-info'} className='imgProfileLink animate__animated animate__fadeIn' style={{ animationDelay: "1.2s" }}>
						{!user.photoURL && <i className="fa-solid fa-user"></i>}
						{user.photoURL && <img src={user.photoURL} alt="" />}
					</Link>
				</div>}
				<div className='settings' >
					<p className='settingsButton animate__animated animate__fadeIn' style={{ animationDelay: "1.6s" }} onClick={toggleSettings} ></p>
					{settings && <div className='backgroundMenuSettings' onClick={toggleSettings}></div>}
					{settings && <aside id='menuSettings' className='menuSettings animate__animated animate__fadeInRight animate__faster'>
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
								}} checked={props.theme == "dark" ? '' : 'checked'} type="checkbox" className="checkboxTheme" id="checkboxTheme" />
								<label htmlFor="checkboxTheme" className="labelTheme">
									<div className='ballTheme'></div>
								</label>
							</div>
						</div>

						<div className='currenciesDiv hideDesktop '>
							<p>Currency</p>
							<div className='selectedCurrency'>
								<div  className={menuCurrencies ? 'currencyDiv currencyDivActive currenciesOpen': 'currencyDiv currencyDivActive'} onClick={() => setMenuCurrencies(prevMenuCurrencies => !prevMenuCurrencies)}>
									<i className={`i${props.currency.name}`}></i>
									<p>{props.currency.name}</p>
								</div>
							</div>

							{menuCurrencies && !props.activeWatchlist && <div className='animate__animated animate__fadeIn animate__faster currencyOptions'>
								<div className='currencyDiv' onClick={() => {
									toggleSettings()
									changeCurrency({ name: "USD", symbol: "$", format: "en-US" })	
								}}>
									<i className={'iUSD'}></i>
									<p>USD</p>
								</div>
								<div className='currencyDiv' onClick={() => {
									toggleSettings()
									changeCurrency({ name: "EUR", symbol: "€", format: "en-DE" })	
								}}>
									<i className='iEUR'></i>
									<p>EUR</p>
								</div>
								<div className='currencyDiv' onClick={() => {
									toggleSettings()
									changeCurrency({ name: "CAD", symbol: "$", format: "en-US" })	
								}}>
									<i className='iCAD'></i>
									<p>CAD</p>
								</div>
								<div className='currencyDiv' onClick={() => {
									toggleSettings()
									changeCurrency({ name: "GBP", symbol: "£", format: "en-GB" })	
								}}>
									<i className='iGBP'></i>
									<p>GBP</p>
								</div>
							</div>}
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
						<Link to={'/'} onClick={() => {
							props.setActiveWatchlist(true)
							toggleSettings()
						}} className='whatchlistDiv'>
							<div>
								{/* <img src="src/resourses/star.svg" alt="" /> */}
								<i className="fa-regular fa-star"></i>
								<p>Whatchlist</p>
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
						{!user && <Link to={'/login'} onClick={toggleSettings} className='loginDiv'>
							{/* <img src="src/resourses/sign-out.svg" alt="" /> */}
							<i className="fa-solid fa-arrow-right-to-bracket"></i>
							<p>Login</p>
						</Link>}
					</aside>}
				</div>
			</div>
		</section>
	)
}
