import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import "../styles/ShowCoin.css"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, layouts, plugins } from 'chart.js/auto'
import { chartDays } from '../tools/chartDays';
import { UserAuth } from '../tools/AuthContext'

// Page for the individual coins.
export default function ShowCoin(props) {
   const [days, setDays] = useState(1)
   const params = useParams()
   const [coin, setCoin] = useState(params.id)
   const [coinData, setCoinData] = useState()
   const [historicData, setHistoricData] = useState()
   const [chartFormat, setChartFormat] = useState("prices")
   const [onWatchlist, setOnWatchlist] = useState()

   const { user, handleUsersWatchlist, getUserWatchlist } = UserAuth()
   
   const urlCoinInfo = `https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
   const urlCoinChart = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${props.currency.name.toLowerCase()}&days=${days}`

   useEffect(() => {
      async function fetchData() {
         const response = await axios.get(urlCoinInfo);
         setCoinData(response.data)

         // Sets the onWatchlist to true if the coin is already on the watchlist.
         // If the coin is already on the watchlist, the star turns to filled 
         if (props.objectsWatchlist.filter((coin) => coin.id == params.id.toLowerCase()).length) {
            setOnWatchlist(true)
         } else {
            setOnWatchlist(false)
         }
      }
      fetchData();
   }, [])

   useEffect(() => {
      async function fetchData() {
         const response = await axios.get(urlCoinChart);
         setHistoricData(response.data)
      }
      fetchData();
   }, [props.currency, days])

   const toggleStar = async() => {
      if (onWatchlist) {
         setOnWatchlist(false)
         // Delete the coin object from the watchlist.
         const newObjectWatchlist = props.objectsWatchlist.filter((coin) => coin.id != params.id.toLowerCase())

         if (user){
            // If there is a user we update the users watchlist
            await handleUsersWatchlist(newObjectWatchlist)
            // And then we get the data and set the watchlist with that data
            const usersWatchlist = await getUserWatchlist()
            console.log(usersWatchlist)
            props.setObjectsWatchlist(usersWatchlist)
            
         } else{
            // If there is no user we set the watchlist normally
            props.setObjectsWatchlist(newObjectWatchlist)
         }
         localStorage.setItem('objectsWatchlist', JSON.stringify(newObjectWatchlist));
      } else {
         setOnWatchlist(true)
         // Here we add the coin object to the watchlist.

         // Set the localstorage
         localStorage.setItem('objectsWatchlist', JSON.stringify([...props.objectsWatchlist, ...props.coinsObjects.filter((coin) => coin.id.toLowerCase() == params.id.toLowerCase())]));

         if (user){
            // If there is a user we update the users watchlist
            await handleUsersWatchlist([...props.objectsWatchlist, ...props.coinsObjects.filter((coin) => coin.id.toLowerCase() == params.id.toLowerCase())])
            // And then we get the data and set the watchlist with that data.
            const usersWatchlist = await getUserWatchlist()
            console.log(usersWatchlist)
            props.setObjectsWatchlist(usersWatchlist)
         } else{
            // If there is no user we set the watchlist normally.
            props.setObjectsWatchlist(prevWatchlist => [...prevWatchlist, ...props.coinsObjects.filter((coin) => coin.id.toLowerCase() == params.id.toLowerCase())])
         }

      }

   }

   // Chage format style of the chart (market_caps -- prices)
   const toggleActiveFormat = (format) => {
      let marketCaps = document.getElementById("market_caps")
      let prices = document.getElementById("prices")
      if (format == "market_cap") {
         marketCaps.classList.add("activeFormat")
         prices.classList.remove("activeFormat")
      } else {
         prices.classList.add("activeFormat")
         marketCaps.classList.remove("activeFormat")
      }
   }

   // Chart Colors 
   const colors = {
      cyan: props.theme == "dark" ? "rgb(7, 185, 170)" : "rgb(255, 147, 50)",
      gradient: props.theme == "dark" ? "rgba(7, 185, 170, 0.703)" : "rgba(255, 146, 50, 0.8)",
      gradientEnd: props.theme == "dark" ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)",
   }

   // Chart Gradiant Fill 
   const getGradient = (ctx) => {
      const gradientSegment = ctx.createLinearGradient(0, 0, 0, 550)
      gradientSegment.addColorStop(0, colors.gradient)
      gradientSegment.addColorStop(0.2, colors.gradient)
      gradientSegment.addColorStop(1, colors.gradientEnd)
      return gradientSegment
   }
   return (
      <main>
         {!coinData ? (
            <div className='loadingPageDiv'>
               {/* <h1 className='loadingPage'>Loading...</h1> */}
            </div>
         ) :
            (<section className='mainInfoSection'>
               <div className='coinInfoDiv'>
                  <div >
                     <p className='rank'>Rank #{coinData.market_cap_rank}</p>
                  </div>
                  <div className='coinNameDiv'>
                     <img src={coinData.image.small} alt="Coin Image" />
                     <h1>{coinData.name} Price <span className='symbol'> <i className='dot'></i>{coinData.symbol.toUpperCase()}</span></h1>
                  </div>
                  <div className='coinPriceDiv'>
                     <p className='price'>{props.currencyFormatter.format(coinData.market_data.current_price[props.currency.name.toLowerCase()])}</p>
                     <p className={coinData.market_data.price_change_percentage_24h.toFixed(1) >= 0 ? 'pricePercentage green' : 'pricePercentage red'}> {coinData.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                  </div>
                  <div className='coinBtcPriceDiv'>
                     <p className='priceBTC'>{coinData.market_data.current_price.btc} BTC</p>
                     <p className={coinData.market_data.price_change_percentage_24h >= 0.0 ? 'pricePercentage green' : 'pricePercentage red'}>{coinData.market_data.price_change_24h_in_currency.btc.toFixed(5)}%</p>
                  </div>
               </div>
               <div className='coinActionsDiv'>
                  <div className='watchlistCheckDiv'>
                     <input id='starInput' type='checkbox'></input>
                     <label htmlFor='starInput' className='hideMobile' onClick={toggleStar}><i id='watchlistStar' className={onWatchlist ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i> WatchList</label>
                     <label htmlFor='starInput' className='hideDesktop' onClick={toggleStar}><i id='watchlistStar' className={onWatchlist ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i></label>
                  </div>

               </div>
            </section>)}

         {coinData && <section className='chartSection'>
            <div className='chartOptionsDiv'>
               <h2>{coinData.name} Price Chart <span className='symbol'> <i className='dot'></i>({coinData.symbol.toUpperCase()})</span> </h2>
               <div className='formatChartDiv'>
                  <p id='prices' className='formatChartItem activeFormat' onClick={() => {
                     setChartFormat("prices")
                     toggleActiveFormat("prices")
                  }}>Price</p>
                  <p id='market_caps' className='formatChartItem' onClick={() => {
                     setChartFormat("market_caps")
                     toggleActiveFormat("market_cap")
                  }}>Market Cap</p>
               </div>
            </div>
            <div className='chartDiv'>
               {!historicData ? (
                  <div className='loadingPageDiv'>
                     <h1></h1>
                  </div>
               ) : (
                  <Line id='canvas' className='chart' data={{
                     labels: historicData[chartFormat].map(data => {
                        let date = new Date(data[0])
                        let time = `${date.getHours()}:00`
                        return days === 1 ? time : days === "max" ? date.toLocaleDateString('en-us', { year: "numeric", month: "short" }) : date.toLocaleDateString('en-us', { month: "short", day: "numeric" })
                     }),

                     datasets: [{
                        label: [chartFormat] == "prices" ? "Price: " : "Market Cap: ",
                        data: historicData[chartFormat].map(data => data[1]),
                        borderColor: [colors.cyan],
                        fill: true,
                        backgroundColor: (context) => {
                           const ctx = context.chart.ctx
                           return getGradient(ctx)
                        }
                     }]
                  }}
                     options={{
                        scales: {
                           x: {
                              ticks: {
                                 padding: 35,
                                 autoSkipPadding: 30,
                                 autoSkip: true,
                                 maxRotation: 0,
                                 minRotation: 0,
                              },
                              grid: {
                                 display: false,
                              }
                           },
                           y: {
                              grid: {
                                 display: false,
                              },
                              ticks: {
                                 padding: 10,

                              }
                           }
                        },
                        elements: {
                           point: {
                              radius: 1
                           }
                        },
                        layout: {
                           padding: {
                              top: 30,
                              left: 8,
                              right: 20,
                              bottom: -20
                           }
                        },
                        plugins: {
                           legend: {
                              display: false
                           }
                        }

                     }} />
               )}
            </div>
            <div className='daysButtonsDiv'>
               {chartDays.map(formatDay => (
                  <button className={formatDay.value == days ? "dayActive" : ""} onClick={() => setDays(formatDay.value)}>{formatDay.label}</button>
               ))}
            </div>

         </section>}

         {coinData && <section className='extraInfoSection'>
            {coinData.market_data.price_change_percentage_1h_in_currency[props.currency.name.toLowerCase()] &&
               <div>
                  <div>
                     <p>1H</p>
                     <p className={coinData.market_data.price_change_percentage_1h_in_currency[props.currency.name.toLowerCase()] >= 0.0 ? 'pricePercentage green' : 'pricePercentage red'}>{coinData.market_data.price_change_percentage_1h_in_currency[props.currency.name.toLowerCase()].toFixed(4)}%</p>
                  </div>
               </div>}
            {coinData.market_data.price_change_percentage_24h_in_currency[props.currency.name.toLowerCase()] &&
               <div>
                  <div>
                     <p>24H</p>
                     <p className={coinData.market_data.price_change_percentage_24h_in_currency[props.currency.name.toLowerCase()] >= 0.0 ? 'pricePercentage green' : 'pricePercentage red'}>{coinData.market_data.price_change_percentage_24h_in_currency[props.currency.name.toLowerCase()].toFixed(4)}%</p>
                  </div>
               </div>}
            {coinData.market_data.price_change_percentage_7d_in_currency[props.currency.name.toLowerCase()] &&
               <div>
                  <div>
                     <p>7D</p>
                     <p className={coinData.market_data.price_change_percentage_7d_in_currency[props.currency.name.toLowerCase()] >= 0.0 ? 'pricePercentage green' : 'pricePercentage red'}>{coinData.market_data.price_change_percentage_7d_in_currency[props.currency.name.toLowerCase()].toFixed(4)}%</p>
                  </div>
               </div>}
            {coinData.market_data.price_change_percentage_14d_in_currency[props.currency.name.toLowerCase()] &&
               <div>
                  <div>
                     <p>14D</p>
                     <p className={coinData.market_data.price_change_percentage_14d_in_currency[props.currency.name.toLowerCase()] >= 0.0 ? 'pricePercentage green' : 'pricePercentage red'}>{coinData.market_data.price_change_percentage_14d_in_currency[props.currency.name.toLowerCase()].toFixed(4)}%</p>
                  </div>
               </div>}
            {coinData.market_data.price_change_percentage_30d_in_currency[props.currency.name.toLowerCase()] &&
               <div>
                  <div>
                     <p>30D</p>
                     <p className={coinData.market_data.price_change_percentage_30d_in_currency[props.currency.name.toLowerCase()] >= 0.0 ? 'pricePercentage green' : 'pricePercentage red'}>{coinData.market_data.price_change_percentage_30d_in_currency[props.currency.name.toLowerCase()].toFixed(4)}%</p>
                  </div>
               </div>}
            {coinData.market_data.price_change_percentage_1y_in_currency[props.currency.name.toLowerCase()] &&
               <div>
                  <div>
                     <p>1Y</p>
                     <p className={coinData.market_data.price_change_percentage_1y_in_currency[props.currency.name.toLowerCase()] >= 0.0 ? 'pricePercentage green' : 'pricePercentage red'}>{coinData.market_data.price_change_percentage_1y_in_currency[props.currency.name.toLowerCase()].toFixed(4)}%</p>
                  </div>
               </div>}
         </section>}
         {coinData && <section className='aboutSection'>
            {coinData.description.en.split(". ")[0] && <div className='aboutDiv'>
               <h3>About {coinData.name}</h3>

               {coinData.description.en.split(". ")[0] && <div dangerouslySetInnerHTML={{ __html: coinData.description.en.split(". ")[0] + ". " + coinData.description.en.split(". ")[1] + "." }}></div>}
               {coinData.description.en.split(". ")[3] && <div dangerouslySetInnerHTML={{ __html: coinData.description.en.split(". ")[2] + ". " + coinData.description.en.split(". ")[3] + "." }}></div>}
            </div>}
         </section>}
      </main>
   )
}
