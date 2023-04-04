import React from 'react'
import "../styles/Cryptocurrencies.css"


export default function CoinItem(props) {
	return (
		<tr className='coinRow animate__animated animate__fadeIn wow' >
			<td className='coinNumberDiv'>
				<p>{props.coin.market_cap_rank}</p>
			</td>
			<td className='coinNameDiv'>
				<img src={props.coin.image} alt='Coin Image' />
				<p>{props.coin.id.charAt(0).toUpperCase() + props.coin.id.slice(1)}</p>
			</td>
			<td className='change24Div'>
				<p 
				className={props.coin.market_cap_change_percentage_24h > 0 ? "green":'red'}
				>{props.coin.market_cap_change_percentage_24h.toFixed(2)}%</p>
			</td>
			<td className='priceDiv'>
				<p>{props.currency.symbol}{props.coin.current_price}</p>

			</td>
			<td className='marketCapDiv'>
				<p>{props.currency.symbol}{props.coin.market_cap}</p>
			</td>
			<td className='volume24Div'>
				<p>{props.currency.symbol}{props.coin.total_volume}</p>
			</td>
		</tr>
	)
}
