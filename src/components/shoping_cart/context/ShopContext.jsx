import React, { createContext, useContext, useState } from "react";
import { productConext } from "../../../App";

// {1:0, 2:0,3:0,4:0}
export const ShopContext = createContext(null);

export const ShopContextProvider = (props) =>{
  const getDefaultCart = (productsArray) => {
    let cart = {};
    for (let i = 1; i < 20 + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  const productArr = useContext(productConext);
  const [cartItems, setCartItems] = useState(getDefaultCart(productArr));
  // console.log("cartItems - ", cartItems);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] >0) {
        let itemInfo = productArr.find(product=>product.id=== Number(item))
        totalAmount+= cartItems[item]*itemInfo.price;
      }      
    }
    return totalAmount;
  }

  // const getTotalCartAmount = ()=>{
  //     let totalAmount = 0;
  //     for(const item in cartItems){
  //         if (cartItems[item]>0) {
  //             let itemInfo = PRODUCTS.find(product =>product.id === Number(item));
  //             totalAmount += cartItems[item] * itemInfo.price;
  //         }
  //     }
  //     return totalAmount;
  // }

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
