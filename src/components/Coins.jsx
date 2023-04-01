import React, { useState } from 'react'
import CoinItem from './CoinItem'

export default function Coins(props) {
    const [search, setSearch] = useState("")

    // Function to set the search value to the text the user is writting in the input.
    const handleSearch = input => {
        setSearch(input.target.value)
    }

    // Filter the coins based on the value placed in search.
    const filteredCoins = props.coins.filter(coin => coin.id.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='coinsContainer'>
            <div>
                <p>Cryptocurrencies</p>
                <div>
                    <form>
                        <label htmlFor="searchCoin">Serach</label>
                        <input id="searchCoin" type="text" onChange={handleSearch} />
                    </form>
                </div>
            </div>
            <div className='columnLabels'>
                <p>#</p>
                <p>Coin</p>
                <p>Change 24h</p>
                <p>Price</p>
                <p>Market Cap</p>
                <p>Volume 24h</p>
            </div>
            <div className='coins'>
                {/* If the seach doesn't match any coin: */}
                {filteredCoins.length == 0 && <p>No Search Matches 😢</p>}

                {/* We map trough the filtered coins and display them: */}
                {filteredCoins.map(coin => {
                    return (
                        <CoinItem key={coin.id} coin={coin} />
                    )
                })}
            </div>
        </div>
    )
}
