import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listReceipts, addToFavourites, removeFromFavourites } from '../actions/receiptActions'
import { getFiltered } from './utils'
import Loader from '../components/Loader'
import './styles.css'


import back from '../assets/back.svg'
import fadedStar from '../assets/faded-star.svg'
import star from '../assets/star.svg'

const Recepies = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const recepies = useSelector((state) => state.receiptList)
    const favouritesData = useSelector((state) => state.favourites)

    const { loading, receipts, error } = recepies
    const favourites = favouritesData.favouritesItems

    let history = useHistory()

    let filteredRecepies = getFiltered(receipts, location)

    const addToFavouritesHandler = (item) => {
        dispatch(addToFavourites(item._id))
      }

      const removeFromFavouritesHandler = (item) => {
        dispatch(removeFromFavourites(item._id))
      }

    useEffect(() => {
        dispatch(listReceipts())
    }, [dispatch])

    return  (
        <div className="Recepies">
            <div className="Recepies-header">
                <img className="Recepies-header-back" src={back} alt="search" onClick={() => history.goBack()}/>
                <h3 className="Recepies-header-heading">Recepies</h3>
            </div>
            <div className="Recepies-body">
                {loading && <Loader />}
                {filteredRecepies.length ? filteredRecepies.map((rec) => (
                    <div className="Recepies-block" >
                        <img className="Recepies-photo" src={`../images/${rec.photo}`} onClick={() => {
                        history.push(`/receipt/${rec._id}`)
                    }}/>
                        <div className="Recepies-block-data" onClick={() => {
                        history.push(`/receipt/${rec._id}`)
                    }}>
                            <h5> {rec.name} </h5>
                            <p> { rec.composition_inter.slice(0, 9).join(', ') } </p>
                        </div>
                        <img className="img-favourite" src={favourites.find((item) => item._id === rec._id) ? star : fadedStar} alt="favorite" style={{height: '100%', cursor: 'pointer', zIndex: '100'}} onClick={() => {
                            if (favourites.find((item) => item._id === rec._id)) {
                                removeFromFavouritesHandler(rec)
                            }
                            else {
                                addToFavouritesHandler(rec)
                            }
                            
                            }}/>
                    </div>
                )) : !loading && <div className="Recepies-body_not-found"><p>Sorry, but we didn't find any recepies</p></div>}
            </div>
        </div>
    )

    

}

export default Recepies
