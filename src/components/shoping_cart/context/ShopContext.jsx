import React, { createContext, useContext, useEffect, useState } from "react";
import { productConext } from "../../../App";
import { updateCart, getCartOfCurrentUser, auth } from "../../../firebaseShop";
import { onAuthStateChanged } from "firebase/auth";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) =>{
  
  const {productArr} = useContext(productConext);
  const [cartItems, setCartItems] = useState({});
  
  useEffect(()=>{
     onAuthStateChanged(auth,async(_user) => {
      setCartItems(await getCartOfCurrentUser(_user?.uid));
    });
  },[onAuthStateChanged])

  const addToCart = (itemId) => {
    let newCart = {};
    if (cartItems[itemId] == null) {
      newCart = { ...cartItems, [itemId]: 1 }
    }
    else newCart = { ...cartItems, [itemId]: cartItems[itemId] + 1 };
    setCartItems(newCart);
    updateCart(newCart);
  };

  const removeFromCart = (itemId) => {
    let newCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 }
    if (newCart[itemId] < 1) {
      let updatedCart = newCart;
      delete updatedCart[itemId];
      newCart = updatedCart;
    }
    setCartItems(newCart);
    updateCart(newCart);
  };

  const updateCartItemCount = (newAmount, itemId) => {
    let newCart = { ...cartItems, [itemId]: newAmount }
    if (newCart[itemId] <= 1) {
      let updatedCart = newCart;
      delete updatedCart[itemId];
      newCart = updatedCart;
    }
    setCartItems(newCart);
    updateCart(newCart);
  };

  const clearCart = () => {
    setCartItems({});
    updateCart({});
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
    clearCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};