import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'animate.css';
import { Link } from 'react-router-dom';

// Page for the individual coins.

export default function ShowCoin() {
    const params = useParams()
    console.log(params)
    console.log(params.id)
    return (
        <div>
            {/* <h1>{params.id}</h1> */}
        </div>
    )
}
