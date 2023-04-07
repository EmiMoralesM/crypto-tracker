import React from 'react'
import "../styles/Home.css"
import { Link } from 'react-router-dom'

export default function ChangePage(props) {

    const sroll0 = () => {
		document.documentElement.scrollTop = 0
	}
    return (
        <section className='changePageDiv'>
            <div className='prevPageDiv'>
                <i className='arrow left'></i>
                <Link to={`/page_${props.pageNumber - 1 < 2 ? 1 : props.pageNumber - 1}`} onClick={() => {
                    props.setPageNumber(props.pageNumber - 1 < 2 ? 1 : props.pageNumber - 1)
                    localStorage.setItem("pageNumber", props.pageNumber - 1 < 2 ? 1 : props.pageNumber - 1)
                    sroll0()
                }}>
                    Prev
                </Link>
            </div>
            <div className='changePageNumbers'>
                {props.pageNumber != 1 && <Link className='changePage' to={`/page_1`} onClick={() => {
                    props.setPageNumber(1)
                    localStorage.setItem("pageNumber", 1)
                    sroll0()
                }} >
                    1
                </Link>}
                {props.pageNumber > 3 && <p className='treeDots'>...</p>}
                {props.pageNumber > 3 && <Link className='changePage' to={`/page_${props.pageNumber - 2}`} onClick={() => {
                    props.setPageNumber(props.pageNumber - 2)
                    localStorage.setItem("pageNumber", props.pageNumber - 2)
                    sroll0()
                }} >
                    {props.pageNumber - 2}
                </Link>}
                {props.pageNumber > 2 && <Link className='changePage' to={`/page_${props.pageNumber - 1}`} onClick={() => {
                    props.setPageNumber(props.pageNumber - 1)
                    localStorage.setItem("pageNumber", props.pageNumber - 1)
                    sroll0()
                }} >
                    {props.pageNumber - 1}
                </Link>}

                <p className='actualPage'>{props.pageNumber}</p>

                {props.pageNumber < 9 && <Link className='changePage' to={`/page_${props.pageNumber + 1}`} onClick={() => {
                    props.setPageNumber(props.pageNumber + 1)
                    localStorage.setItem("pageNumber", props.pageNumber + 1)
                    sroll0()
                }} >
                    {props.pageNumber + 1}
                </Link>}
                {props.pageNumber < 8 && <Link className='changePage' to={`/page_${props.pageNumber + 2}`} onClick={() => {
                    props.setPageNumber(props.pageNumber + 2)
                    localStorage.setItem("pageNumber", props.pageNumber + 2)
                    sroll0()
                }} >
                    {props.pageNumber + 2}
                </Link>}
                {props.pageNumber < 7 && <p className='treeDots'>...</p>}
                {props.pageNumber != 10 && <Link className='changePage' to={`/page_10`} onClick={() => {
                    props.setPageNumber(10)
                    localStorage.setItem("pageNumber", 10)
                    sroll0()
                }} >
                    10
                </Link>}
            </div>
            <div className='nextPageDiv'>
                <Link to={`/page_${props.pageNumber + 1 > 9 ? 10 : props.pageNumber + 1}`} onClick={() => {
                    props.setPageNumber(props.pageNumber + 1 > 9 ? 10 : props.pageNumber + 1)
                    localStorage.setItem("pageNumber", props.pageNumber + 1 > 9 ? 10 : props.pageNumber + 1)

                    sroll0()
                }} >
                    Next
                </Link>
                <i className='arrow right'></i>
            </div>
        </section>
    )
}
