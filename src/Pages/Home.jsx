import React from 'react'
import { useState, useEffect } from 'react'
import Coins from '../components/Coins'
import MarketData from '../components/MarketData'
import "../styles/Home.css"
import { Link, useParams } from 'react-router-dom'

export default function Home(props) {
	const [coins, setCoins] = useState([])
	const [loading, setLoading] = useState(false)
	const params = useParams()
	useEffect(() => {
		console.log(params)
		if (params.page){
			const page = parseInt(params.page.replace("page_", ""))
			console.log(typeof page)
			props.setPageNumber(Number.isInteger(page) ? page : 1)
		}
		
	}, 	[]) 
	const urlCoins = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency.name}&order=market_cap_desc&per_page=100&page=${props.pageNumber}&sparkline=false&price_change_percentage=1h%2C7d&locale=en`
	
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

	
	const sroll0 = () => {
		document.documentElement.scrollTop = 0
	}

	// Infinite Scroll functionality
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
			
	const currencyFormatter = new Intl.NumberFormat(props.currency.format, {
		style: 'currency',
		currency: props.currency.name == "CAD" ? "USD" : props.currency.name
	});

	return (
		<main>
			<section className='mainTitle'>
				<h1>Cryptocurrency Tracker</h1>
			</section>
			<MarketData currency={props.currency} currencyFormatter={currencyFormatter}/>
			<Coins loading={loading} coins={coins} setCoins={setCoins} currency={props.currency} currencyFormatter={currencyFormatter}/>
			<section className='changePageDiv'>
				<div className='prevPageDiv'>
					<i className='arrow left'></i>
					<Link  to={`/page_${props.pageNumber-1 < 2 ? 1: props.pageNumber-1}`} onClick={() => {
						props.setPageNumber(props.pageNumber-1 < 2 ? 1: props.pageNumber-1)
						localStorage.setItem("pageNumber", props.pageNumber-1 < 2 ? 1: props.pageNumber-1)
						sroll0()
					}}>
						Prev
					</Link>
				</div>
				<div className='changePageNumbers'>
					{props.pageNumber != 1 && <Link className='changePage' to={`/page_1`} onClick={() => {
						props.setPageNumber(1)
						localStorage.setItem("pageNumber", 1)
						sroll0()
					}} >
						1
					</Link>}
					{props.pageNumber > 3 && <p className='treeDots'>...</p>}
					{props.pageNumber > 3 && <Link className='changePage' to={`/page_${props.pageNumber-2}`} onClick={() => {
						props.setPageNumber(props.pageNumber-2)
						localStorage.setItem("pageNumber", props.pageNumber-2)
						sroll0()
					}} >
						{props.pageNumber-2}
					</Link>}
					{props.pageNumber > 2 && <Link className='changePage' to={`/page_${props.pageNumber-1}`} onClick={() => {
						props.setPageNumber(props.pageNumber-1)
						localStorage.setItem("pageNumber", props.pageNumber-1)
						sroll0()
					}} >
						{props.pageNumber-1}
					</Link>}

					<p className='actualPage'>{props.pageNumber}</p>

					{props.pageNumber < 9 && <Link className='changePage' to={`/page_${props.pageNumber+1}`} onClick={() => {
						props.setPageNumber(props.pageNumber+1)
						localStorage.setItem("pageNumber", props.pageNumber+1)
						sroll0()
					}} >
						{props.pageNumber+1}
					</Link>}
					{props.pageNumber < 8 && <Link className='changePage' to={`/page_${props.pageNumber+2}`} onClick={() => {
						props.setPageNumber(props.pageNumber+2)
						localStorage.setItem("pageNumber", props.pageNumber+2)
						sroll0()
					}} >
						{props.pageNumber+2}
					</Link>}
					{props.pageNumber < 7 && <p className='treeDots'>...</p>}
					{props.pageNumber != 10 && <Link className='changePage' to={`/page_10`} onClick={() => {
						props.setPageNumber(10)
						localStorage.setItem("pageNumber", 10)
						sroll0()
					}} >
						10
					</Link>}
				</div>
				<div className='nextPageDiv'>
					<Link  to={`/page_${props.pageNumber+1 > 9 ? 10 : props.pageNumber+1}`} onClick={() => {
						props.setPageNumber(props.pageNumber+1 > 9 ? 10 : props.pageNumber+1)
						localStorage.setItem("pageNumber", props.pageNumber+1 > 9 ? 10 : props.pageNumber+1)

						sroll0()
					}} >
						Next 
					</Link>
					<i className='arrow right'></i>
				</div>

			</section>
		</main>
	)
}
