import React, { useContext } from 'react'
import { FavouritesContaxt } from './FavouritesContext'

const Favourites = () => {
    //TODO: need to add:
    // box to show the products are in favorit
    // hurt button to add and remove form favories
    // create functions in firebaseShop
    const {favourites} = useContext(FavouritesContaxt);
  return (
    <div className='favourites'>
        <h1>Your Favourites:</h1>



    </div>
  )
}

export default Favourites