import { useState, useEffect } from 'react'

export default function MarketData() {
    const url = `https://api.coingecko.com/api/v3/global`
    const [marketData, setMarketData] = useState()
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMarketData(data.data)
            })
            .catch((error) => {
                console.log(error)
            })
        console.log("fetch")
    }, [])

    console.log(marketData)
    // const totalMarketCap = 0
    // console.log(marketData.active_cryptocurrencies)

    return (
        <section className='marketData'>
            <div className='totalMarketCap'>
                <p className='labelMaketData'>Market Cap</p>
                <p className='dataMarketData'>$1.153.353.454.453</p>
            </div>
            <div className='totalVolume'>
                <p className='labelMaketData'>Volume 24h</p>
                <p className='dataMarketData'>$54.153.353.454</p>
            </div>
            <div className='totalBtcDom'>
                <p className='labelMaketData'>BTC Dominance</p>
                <p className='dataMarketData'>44.0%</p>
            </div>
        </section>
    )
}
