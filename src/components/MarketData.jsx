import { useState, useEffect } from 'react'
import axios from 'axios'

export default function MarketData(props) {
	const urlGlobalData = `https://api.coingecko.com/api/v3/global`
	
    const [marketCap, setMarketCap] = useState()
    const [marketCapChange, setMarketCapChange] = useState()
    const [totalVolume, setTotalVolume] = useState()
    const [totalBtcDom, setTotalBtcDom] = useState()
    useEffect( () => {
        async function fetchData() {
            
            const response = await axios.get(urlGlobalData);
            setMarketCap(props.currencyFormatter.format(response.data.data.total_market_cap[props.currency.name.toLowerCase()]))
            setTotalVolume(props.currencyFormatter.format(response.data.data.total_volume[props.currency.name.toLowerCase()]))
            setTotalBtcDom(response.data.data.market_cap_percentage.btc.toFixed(1))
            setMarketCapChange(response.data.data.market_cap_change_percentage_24h_usd.toFixed(1))
        }
        fetchData();
    }, [])

    return (
        <section className='marketData'>
            <div className={marketCapChange >= 0 ? 'lightgreen totalMarketCap':'red totalMarketCap' }>
                <p className='labelMaketData'>Market Cap</p>
                <div className='dataMarketDataDiv'>
                    <p className='dataMarketData'>{marketCap}</p>
                    <p className={marketCapChange >= 0 ? 'percentageMarketData green': 'percentageMarketData red'}>{marketCapChange}%</p>
                </div>
            </div>
            <div style={{backgroundColor: "var(--grey-background-color)"}} className='totalVolume'>
                <p className='labelMaketData'>Volume 24h</p>
                <p className='dataMarketData'>{totalVolume}</p>
            </div>
            <div style={{backgroundColor: "var(--grey-background-color)"}} className={0 >= 0 ? 'totalBtcDom':'red totalBtcDom' }>
                <p className='labelMaketData'>BTC Dominance</p>
                <p className='dataMarketData'>{totalBtcDom}%</p>
            </div>
        </section>
    )
}


