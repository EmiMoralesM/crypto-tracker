import React from 'react'
import { useState, useEffect } from 'react'
import Coins from '../components/Coins'
import MarketData from '../components/MarketData'
import "../styles/Home.css"
import { Link, useParams } from 'react-router-dom'
import ChangePage from '../components/ChangePage'

export default function Home(props) {
	const [coins, setCoins] = useState([])
	const urlCoins = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency.name}&order=market_cap_desc&per_page=150&page=${props.pageNumber}&sparkline=false&price_change_percentage=1h%2C7d&locale=en`
	
	// Fetch the API and set the data to the coins state.
	useEffect(() => {
		fetch(urlCoins)
		.then(res => res.json())
		.then(data => {
			setCoins(data)
			// setTimeout(() => {
			// 	setCoins(prevCoins => [...prevCoins, ...data])
			// 	setLoading(false)
			// }, 1000)
		})
		.catch((error) => {
			console.log(error)
		})
	}, [props.currency, props.pageNumber])
	
	const params = useParams()
	// Sets the page number to the one given in the url (/page_1 --> 1)
	useEffect(() => {
		if (params.page){
			const page = parseInt(params.page.replace("page_", ""))
			props.setPageNumber(Number.isInteger(page) ? page : 1)
		}
	}, 	[]) 

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
			

	return (
		<main>
			<section className='mainTitle'>
				<h1>Cryptocurrency Tracker</h1>
			</section>
			<MarketData currency={props.currency} currencyFormatter={props.currencyFormatter}/>
			<Coins coins={coins} setCoins={setCoins} currency={props.currency} currencyFormatter={props.currencyFormatter}/>
			<ChangePage pageNumber={props.pageNumber} setPageNumber={props.setPageNumber}/>
		</main>
	)
}
