import React from 'react'
import "../styles/Home.css"
import { Link } from 'react-router-dom'

export default function ChangePage(props) {

    const sroll0 = () => {
		document.documentElement.scrollTop = 0
	}
    return (
        <section className='changePageDiv'>
            <div className='prevPageDiv hideMobile'>
                <i className='arrow left'></i>
                <Link to={`/page_${props.pageNumber - 1 < 2 ? 1 : props.pageNumber - 1}`} onClick={() => {
                    props.setPageNumber(props.pageNumber - 1 < 2 ? 1 : props.pageNumber - 1)
                    sroll0()
                }}>
                    Prev
                </Link>
            </div>
            <div className='changePageNumbers'>
                {props.pageNumber != 1 && <Link className='changePage' to={`/page_1`} onClick={() => {
                    props.setPageNumber(1)
                    sroll0()
                }} >
                    1
                </Link>}
                {props.pageNumber > 3 && <p className='treeDots'>...</p>}
                {props.pageNumber > 3 && <Link className='changePage' to={`/page_${props.pageNumber - 2}`} onClick={() => {
                    props.setPageNumber(props.pageNumber - 2)
                    sroll0()
                }} >
                    {props.pageNumber - 2}
                </Link>}
                {props.pageNumber > 2 && <Link className='changePage' to={`/page_${props.pageNumber - 1}`} onClick={() => {
                    props.setPageNumber(props.pageNumber - 1)
                    sroll0()
                }} >
                    {props.pageNumber - 1}
                </Link>}

                <p className='actualPage'>{props.pageNumber}</p>

                {props.pageNumber < 19 && <Link className='changePage' to={`/page_${props.pageNumber + 1}`} onClick={() => {
                    props.setPageNumber(props.pageNumber + 1)
                    sroll0()
                }} >
                    {props.pageNumber + 1}
                </Link>}
                {props.pageNumber < 18 && <Link className='changePage' to={`/page_${props.pageNumber + 2}`} onClick={() => {
                    props.setPageNumber(props.pageNumber + 2)
                    sroll0()
                }} >
                    {props.pageNumber + 2}
                </Link>}
                {props.pageNumber < 17 && <p className='treeDots'>...</p>}
                {props.pageNumber != 20 && <Link className='changePage' to={`/page_20`} onClick={() => {
                    props.setPageNumber(20)
                    sroll0()
                }} >
                    20
                </Link>}
            </div>
            <div className='nextPageDiv hideMobile'>
                <Link to={`/page_${props.pageNumber + 1 > 19 ? 20 : props.pageNumber + 1}`} onClick={() => {
                    props.setPageNumber(props.pageNumber + 1 > 19 ? 20 : props.pageNumber + 1)
                    sroll0()
                }} >
                    Next
                </Link>
                <i className='arrow right'></i>
            </div>
        </section>
    )
}
