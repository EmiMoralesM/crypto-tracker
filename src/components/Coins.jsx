import React, { useEffect, useState } from 'react'
import "../styles/Home.css"
import CoinItem from './CoinItem'
// import 'animate.css';
import { Link, json } from 'react-router-dom';
import ShowCoin from '../Pages/ShowCoin';

export default function Coins(props) {
    const [filteredCoins, setFilteredCoins] = useState([])

    // States to order each column (true = ascendant, false=descendant)
    const [stateNumber, setStateNumber] = useState(false)
    const [stateName, setStateName] = useState(false)
    const [stateChange1, setStateChange1] = useState(false)
    const [stateChange24, setStateChange24] = useState(false)
    const [statePrice, setStatePrice] = useState(false)
    const [stateMarkCap, setStateMarkCap] = useState(false)
    const [stateVolume, setStateVolume] = useState(false)

    // Function to set the search value to the text the user is writting in the input.
    

    // Filter the coins based on the value placed in search.
    useEffect(() => {
        if (props.activeWatchlist){
            setFilteredCoins(props.objectsWatchlist.filter(coin => coin.id.toLowerCase().includes(props.search.toLowerCase()) && coin.market_cap))
        } else{
            setFilteredCoins(props.coins.filter(coin => coin.id.includes(props.search.toLowerCase()) && coin.market_cap))
        }
    }, [props.coins, props.search, props.activeWatchlist])

    // Function to sort the coins.
    const sortCoins = (order, state, setState) => {
        if (state) {
            setFilteredCoins(prevFilteredCoins => prevFilteredCoins.sort(
                (p1, p2) => (p1[order] > p2[order]) ? 1 : (p1[order] < p2[order]) ? -1 : 0
            ))
        } else {
            setFilteredCoins(prevFilteredCoins => prevFilteredCoins.sort(
                (p1, p2) => (p1[order] < p2[order]) ? 1 : (p1[order] > p2[order]) ? -1 : 0
            ))
        }
        setState(prevState => !prevState)
        // props.setCoins(filteredCoins)
    }
    return (
        <section className='coinsContainer'>
            
            <table className='coinsDiv'>
                <thead>
                    <tr className='coinsLabels'>
                        <th className='coinNumberDiv'>
                            <p onClick={() => sortCoins("market_cap_rank", stateNumber, setStateNumber)}><span></span> #</p>
                        </th>
                        <th className='coinsNameDiv'>
                            <p onClick={() => sortCoins("id", stateName, setStateName)}><span></span> Coin</p>
                        </th>
                        <th className='change1Div hideMobile'>
                            <p onClick={() => sortCoins("price_change_percentage_1h_in_currency", stateChange1, setStateChange1)}><span></span> Change (1h)</p>
                        </th>
                        <th className='change24Div'>
                            <p onClick={() => sortCoins("price_change_percentage_24h", stateChange24, setStateChange24)}><span></span> Change (24h)</p>
                        </th>
                        <th className='priceDiv'>
                            <p onClick={() => sortCoins("current_price", statePrice, setStatePrice)}><span></span> Price</p>
                        </th>
                        <th className='marketCapDiv hideMobile' >
                            <p onClick={() => sortCoins("market_cap", stateMarkCap, setStateMarkCap)}><span></span> Market Cap</p>
                        </th>
                        <th className='volume24Div hideMobile'>
                            <p onClick={() => sortCoins("total_volume", stateVolume, setStateVolume)}><span></span> Volume (24h)</p>
                        </th>
                    </tr>
                </thead>
                <tbody className='coins'>
                    {/* If the seach doesn't match any coin: */}
                    {filteredCoins.length == 0 &&
                        <tr className='noMatchesDiv'>
                            <td> <p> No Search Matches 😢</p></td>
                        </tr>}

                    {/* We map trough the filtered coins and display them: */}
                    {filteredCoins.map(coin => {
                        return (
                            // <Link key={coin.id}
                            //       onClick={() => {
                            //         if (!props.coinsObjects.filter(coinOb => coinOb.id == coin.id ).length){
                            //             props.setCoinsObjects(prevCoinsObjects => [...prevCoinsObjects, coin])
                            //         }
                            //       }}
                            //       to={`/coin/${coin.id}`} 
                            //       style={{textDecoration: "none"}}>
                                <CoinItem key={coin.id}
                                          coin={coin} 
                                          currency={props.currency} 
                                          currencyFormatter={props.currencyFormatter}
                                          coinsObjects={props.coinsObjects} setCoinsObjects={props.setCoinsObjects}
                                />
                            // </Link>
                        )
                    })}
                    {/* {props.loading && <div className='loadingIconDiv'>
                        <p>Loading...</p>
                    </div>} */}
                </tbody>
            </table>
        </section>
    )
}
