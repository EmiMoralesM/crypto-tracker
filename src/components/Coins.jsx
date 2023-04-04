import React, { useState } from 'react'
import "../styles/Cryptocurrencies.css"
import CoinItem from './CoinItem'
import 'animate.css';
import { Link } from 'react-router-dom';

export default function Coins(props) {
    const [search, setSearch] = useState("")

    // Function to set the search value to the text the user is writting in the input.
    const handleSearch = input => {
        setSearch(input.target.value)
    }

    // Filter the coins based on the value placed in search.
    const filteredCoins = props.coins.filter(coin => coin.id.toLowerCase().includes(search.toLowerCase()))
    console.log(filteredCoins)
    return (
        <div className='coinsContainer'>
            <div className='coinsTabs'>
                <div className='coinsMenu'>
                    <Link className='coinsMenuItem active'>Cryptocurrencies</Link>
                    <Link className='coinsMenuItem'>Whatchlist</Link>
                </div>
                <div className='searchDiv'>
                    <form>
                        <input id="searchCoin" type="text" onChange={handleSearch} />
                        <div className='searchDecoration'>
                            <label className='searchCoinLabel' htmlFor="searchCoin"></label>
                            <img src="src/resourses/search-icon.svg" className="searchIcon" alt="Search icon" />
                        </div>
                    </form>
                </div>
            </div>
            <table className='coinsDiv'>
                <thead>
                    <tr className='coinsLabels'>
                        <th className='coinNumberDiv'><p>#</p></th>
                        <th className='coinNameDiv'><p>Coin</p></th>
                        <th className='change24Div'><p>Change (24h)</p></th>
                        <th className='priceDiv'><p>Price</p></th>
                        <th className='marketCapDiv'><p>Market Cap</p></th>
                        <th className='volume24Div'><p>Volume (24h)</p></th>
                    </tr>
                </thead>
                <tbody className='coins'>
                    {/* If the seach doesn't match any coin: */}
                    {filteredCoins.length == 0 && 
                        <tr>
                            <td> No Search Matches 😢</td>
                        </tr>}

                    {/* We map trough the filtered coins and display them: */}
                    {filteredCoins.map(coin => {
                        return (
                            <CoinItem key={coin.id} coin={coin} currency={props.currency}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
