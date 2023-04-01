import React from 'react'

export default function CoinItem(props) {
  return (
    <div className='coinRow'>
        <p>{props.coin.market_cap_rank}</p>
        <div className='coinName'>
            <img src={props.coin.image} alt='Coin Image' />
            <p>{props.coin.id}</p>
        </div>
        <p>{props.coin.market_cap_change_percentage_24h}</p>
        <p>{props.coin.current_price}</p>
        <p>{props.coin.market_cap}</p>
        <p>{props.coin.total_volume}</p>
    </div>
  )
}
