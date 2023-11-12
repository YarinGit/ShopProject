import React, { createContext, useContext, useEffect, useState } from "react";
import { productConext } from "../../../App";
import { getDocsFunction, updateCart } from "../../../firebaseShop";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) =>{
  
  const productArr = useContext(productConext);
  const [cartItems, setCartItems] = useState({});
  
    
  const addToCart = (itemId) => {
    if (cartItems[itemId] == null) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
    else setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    updateCart(cartItems);
    //TODO: check cart
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (cartItems.itemId <= 0) {
      let updatedCart = cartItems;
      delete updatedCart.itemId;
      setCartItems(updatedCart);
    }
    // addAndUpdateCart(cartItems);
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    // addAndUpdateCart(cartItems);
  };

  const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for (const item in cartItems) {
        let itemInfo = productArr.find(product=>product.id=== Number(item))
        totalAmount+= cartItems[item]*itemInfo.price;
    }
    return totalAmount;
  }

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

// export default ShopContextProvider
