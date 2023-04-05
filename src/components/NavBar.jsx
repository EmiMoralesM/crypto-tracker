import React, { useState } from 'react'
import "../styles/NavBar.css"
import { Routes, Route, Link } from 'react-router-dom'
import 'animate.css';

export default function NavBar(props) {
	const [menuCurrencies, setMenuCurrencies] = useState(false)
	const [languagesMenu, setLanguagesMenu] = useState(false)
	const [settings, setSettings] = useState(false)


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
	console.log("rerender...")

	
	return (
		<section className='navbar animate__animated animate__fadeInDown' >
			<div className='navLeftSide'>
				<h1 className='logo animate__animated animate__fadeIn' style={{animationDelay: ".4s"}}><Link to={"/"}>Logo</Link></h1>
				<ul className='mainMenu'>
					<li><Link to={"/"} className='navCryptocurrencies animate__animated animate__fadeIn' style={{animationDelay: ".5s"}}>Cryptocurrencies</Link></li>
					{/* <li><Link to={"/"} className='normalHoverItems'>Home</Link></li> */}
					<li><Link to={"/contact"} className='normalHoverItems animate__animated animate__fadeIn' style={{animationDelay: ".7s"}}>Contact</Link></li>
				</ul>
			</div>
			<div className='navRightSide '>
				<div className='currenciesDiv'>
					<div className='selectedCurrency animate__animated animate__fadeIn' style={{animationDelay: ".9s"}}>
						<div className='currencyDiv currencyDivActive' onClick={() => setMenuCurrencies(prevMenuCurrencies => !prevMenuCurrencies)}>
							<img src={`src/resourses/${props.currency.name}.png`} alt="Currency Image" />
							<p>{props.currency.name}</p>
						</div>
					</div>

					{menuCurrencies && <div className='animate__animated animate__fadeIn animate__faster currencyOptions'>
						<div className='currencyDiv' onClick={() => changeCurrency({name: "USD", symbol: "$", format: "en-US"})}>
							<img src="src/resourses/USD.png" alt="Currency Image" />
							<p>USD</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({name: "EUR", symbol: "€", format: "en-DE"})}>
							<img src="src/resourses/EUR.png" alt="Currency Image" />
							<p>EUR</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({name: "CAD", symbol: "$", format: "en-US"})}>
							<img src="src/resourses/CAD.png" alt="Currency Image" />
							<p>CAD</p>
						</div>
						<div className='currencyDiv' onClick={() => changeCurrency({name: "GBP", symbol: "£", format: "en-GB"})}>
							<img src="src/resourses/GBP.png" alt="Currency Image" />
							<p>GBP</p>
						</div>
					</div>}
				</div>
				<div className='divition animate__animated animate__fadeIn' style={{animationDelay: "1.1                                                            s"}}></div>
				<div className='loginButtons'>
					<Link className='loginButton animate__animated animate__fadeIn' style={{animationDelay: "1.2s"}}>Login</Link>
					<Link className='signupButton animate__animated animate__fadeIn' style={{animationDelay: "1.4s"}}>Sign Up</Link>
				</div>
				<div className='settings' >
					<p className='settingsButton animate__animated animate__fadeIn' style={{animationDelay: "1.6s"}} onClick={toggleSettings} ></p>
					{settings && <div className='backgroundMenuSettings' onClick={toggleSettings}></div>}
					{settings && <aside className='menuSettings animate__animated animate__fadeInRight animate__faster'>
						<div className='settingsTitleDiv'>
							<p><strong>Settigns</strong></p>
						</div>
						<hr />
						<div className='profileDiv'>
							<Link to={"/"}>Profile</Link>
							<i className={'arrow right'}></i>
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
						<div className='languageDiv'>
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
						</div>
						<div className='whatchlistDiv'>
							<div>
								{/* <img src="src/resourses/star.svg" alt="" /> */}
								<i className="fa-solid fa-star"></i>
								<Link to={"/"}>Whatchlist</Link>
							</div>
							<i className={'arrow right'}></i>

						</div>
						<hr />
						<div className='signoutDiv'>
							{/* <img src="src/resourses/sign-out.svg" alt="" /> */}
							<i className="fa-solid fa-arrow-right-from-bracket"></i>
							<p>Sign Out</p>
						</div>
					</aside>}
				</div>
			</div>
		</section>
	)
}
