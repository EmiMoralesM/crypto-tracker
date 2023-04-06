import React from 'react'
import "../styles/Home.css"


export default function CoinItem(props) {

	

	function formatNumber(number) {
		if (number < 1000) {
			return number;
		} else if (number >= 1000 && number < 1_000_000) {
			return (number / 1000).toFixed(1) + "K";
		} else if (number >= 1_000_000 && number < 1_000_000_000) {
			return (number / 1_000_000).toFixed(1) + "M";
		} else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
			return (number / 1_000_000_000).toFixed(1) + "B";
		} else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
			return (number / 1_000_000_000_000).toFixed(1) + "T";
		}
	}

	const currencyFormatter = new Intl.NumberFormat(props.currency.format, {
		style: 'currency',
		currency: props.currency.name == "CAD" ? "USD" : props.currency.name
	});
	
	return (
		<tr className='coinRow animate__animated animate__fadeIn' >
			<td className='coinNumberDiv'>
				<p>{props.coin.market_cap_rank}</p>
			</td>
			<td className='coinNameDiv'>
				<img src={props.coin.image} alt='Coin Image' />
				<p>{props.coin.id.charAt(0).toUpperCase() + props.coin.id.slice(1)} <span className='symbolCoin'> <i className='dot'></i> {props.coin.symbol.toUpperCase()}</span></p>
			</td>
			<td className='change1Div'>
				<p
					className={props.coin.price_change_percentage_1h_in_currency >= 0 ? "green" : 'red'}
				>{props.coin.price_change_percentage_1h_in_currency != null ? props.coin.price_change_percentage_1h_in_currency.toFixed(2): "0"}%</p>
			</td>
			<td className='change24Div'>
				<p
					className={props.coin.price_change_percentage_24h >= 0 ? "green" : 'red'}
				>{props.coin.price_change_percentage_24h != null ? props.coin.price_change_percentage_24h.toFixed(2) : "0"}%</p>
			</td>
			<td className='priceDiv'>
				<p>{props.currencyFormatter.format(props.coin.current_price)}</p>
			</td>
			<td className='marketCapDiv'>
				<p>{props.currency.symbol}{formatNumber(props.coin.market_cap)}</p>
			</td>
			<td className='volume24Div'>
				<p>{props.currency.symbol}{formatNumber(props.coin.total_volume)}</p>
			</td>
		</tr>
	)
}
