import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Footer.css"
import 'animate.css'

export default function Signature() {
    return (
        <section>
            <div className="signatureDiv animate__animated animate__fadeInUp">
                <p>© 2023 | Made with <i className="fa-solid fa-heart"></i> by 
                    <Link to="https://emilianomorales.com" target="_blank"> Emiliano Morales</Link>
                </p>
            </div>
        </section>
    )
}
