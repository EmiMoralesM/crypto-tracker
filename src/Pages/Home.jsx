import React from 'react'
import { useState, useEffect } from 'react'
import Coins from '../components/Coins'

export default function Home() {
	const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
	const [coins, setCoins] = useState([])

	// Fetch the API and set the data to the coins state.
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
	}, [])

	return (
		<Coins coins={coins}/>
	)
}
