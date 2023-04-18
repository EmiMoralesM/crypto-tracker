import React, { useEffect, useState } from 'react'
import '../styles/Loader.css'
// import 'animate.css';

export default function Loader(props) {

	useEffect(() => {
	  setTimeout(() => {
	    document.getElementById('loader').classList.add('load')
	  }, 1600)
	}, [])

	return (
		<section id='loader' className='hideMobile'>
			<div className="div-loader">
				<div className="loader">
					<p className='loaderLogo'></p>
				</div>
				<div className="section-load"></div>
			</div>
		</section>
	)
}