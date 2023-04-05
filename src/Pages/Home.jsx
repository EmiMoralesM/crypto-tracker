import React from 'react'
import { useState, useEffect } from 'react'
import Coins from '../components/Coins'
import MarketData from '../components/MarketData'
import "../styles/Home.css"


export default function Home(props) {
	const [coins, setCoins] = useState([])
	// const [orderCoins, setOrderCoins] = useState("market_cap_desc")
	const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C7d&locale=en`
	// Fetch the API and set the data to the coins state.
	// console.log(coins)
	useEffect(() => {
		fetch(url)
		.then(res => res.json())
		.then(data => {
			setCoins(data)
			// console.log(data)
		})
		.catch((error) => {
			console.log(error)
		})
		console.log("fetch")
	}, [props.currency])
	console.log(coins)
	return (
		<main>
			<div className='mainTitle'>
				<h1>Cryptocurrency Tracker</h1>
			</div>
			<MarketData />
			<Coins coins={coins} setCoins={setCoins} currency={props.currency}/>
		</main>
	)
}
