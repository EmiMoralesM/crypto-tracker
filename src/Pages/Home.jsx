import React from 'react'
import { useState, useEffect } from 'react'
import Coins from '../components/Coins'
import MarketData from '../components/MarketData'
import "../styles/Home.css"
import { Link, useParams } from 'react-router-dom'
import ChangePage from '../components/ChangePage'

export default function Home(props) {
	const [search, setSearch] = useState("")
	const [searchHidden, setSearchHidden] = useState(false)
	const params = useParams()
	

	// Sets the page number to the one given in the url (/page_1 --> 1)
	useEffect(() => {
		if (params.page) {
			const page = parseInt(params.page.replace("page_", ""))
			props.setPageNumber(Number.isInteger(page) ? page : 1)
		}
	}, [])

	// If the watchlist is active, it calls the toggleActive function with the watchlist format.
	useEffect(() => {
		props.activeWatchlist ? toggleActive("whatchlist"): toggleActive("cryptocurrencies")
	}, [props.activeWatchlist])

	// Function to change from the main coins to the watchlist and bice
	const toggleActive = (format) => {
		let cryptocurrencies = document.getElementById("cryptocurrencies")
		let whatchlist = document.getElementById("whatchlist")
		if (format == "cryptocurrencies") {
			cryptocurrencies.classList.add("active")
			whatchlist.classList.remove("active")
			props.setActiveWatchlist(false)
		} else {
			whatchlist.classList.add("active")
			cryptocurrencies.classList.remove("active")
			props.setActiveWatchlist(true)
		}
	}

	const handleSearch = input => {
		setSearch(input.target.value)
		input.target.value.length > 0 ? setSearchHidden(true) : setSearchHidden(false)
	}

	return (
		<main>
			<section className='mainTitle'>
				<h1>Cryptocurrency Tracker</h1>
			</section>

			<MarketData currency={props.currency} currencyFormatter={props.currencyFormatter} />
			<section className='coinsTabsSection'>
				<div className='coinsTabs'>
					<div className='coinsMenu'>
						<p id='cryptocurrencies' onClick={() => props.setActiveWatchlist(false)} className='coinsMenuItem active'>Cryptocurrencies</p>
						<p id='whatchlist' onClick={() => props.setActiveWatchlist(true)} className='coinsMenuItem'>Whatchlist</p>
					</div>
					<div className='searchDiv'>
						<form>
							<input id="searchCoin" type="text" className={searchHidden ? 'searchHidden' : ''} onChange={handleSearch} />
							<div className='searchDecoration'>
								<label className='searchCoinLabel' htmlFor="searchCoin"></label>
								<i className="searchIcon" ></i>
							</div>
						</form>
					</div>
				</div>
			</section>

			<Coins 
				search={search}
				coins={props.coins} setCoins={props.setCoins} 
				watchlist={props.watchlist} activeWatchlist={props.activeWatchlist} 
				currency={props.currency} currencyFormatter={props.currencyFormatter} 
			/>

			{!props.activeWatchlist && <ChangePage pageNumber={props.pageNumber} setPageNumber={props.setPageNumber} />}
		</main>
	)
}





// Infinite Scroll functionality
	// const [loading, setLoading] = useState(false)
	// const handleScroll = () =>{
	// 	console.log(document.documentElement.scrollTop)
	// 	if(window.innerHeight + document.documentElement.scrollTop+1 >= document.documentElement.scrollHeight){
	// 		setLoading(true)
	// 		setPageNumber(prevPage => prevPage+1)
	// 	}
	// } 
	// useEffect(() => {
	// 	window.addEventListener("scroll", handleScroll)
	// 	return () => window.removeEventListener("scroll", handleScroll)
	// }, [])