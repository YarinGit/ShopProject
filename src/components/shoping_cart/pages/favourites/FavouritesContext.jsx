import { createContext, useState } from "react";



export const FavouritesContaxt = createContext(null);

export const FavouritesContaxtProvider = (props)=>{

    const [favourites, setFavourites] = useState(null);

    const addToFavourites = (itemID) =>{
        console.log("in addToFavourites, data resivde -> ", itemID);
        setFavourites(itemID);
    }

    const removeFromFavourites = (itemID) =>{
        console.log("in removeFromFavourites, data resivde -> ", itemID);
        setFavourites(itemID);
    }

    const contextValue = {
        favourites,
        addToFavourites,
        removeFromFavourites,
    }

    return(
        <FavouritesContaxt.Provider value={contextValue}>
            {props.children}
        </FavouritesContaxt.Provider>
    );
}