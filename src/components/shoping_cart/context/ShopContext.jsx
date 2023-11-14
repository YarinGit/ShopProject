import React, { createContext, useContext, useEffect, useState } from "react";
import { productConext } from "../../../App";
import { updateCart, getCartOfCurrentUser, auth } from "../../../firebaseShop";
import { onAuthStateChanged } from "firebase/auth";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) =>{
  
  const productArr = useContext(productConext);
  const [cartItems, setCartItems] = useState({});
  
  useEffect(()=>{
    onAuthStateChanged(auth,(_user) => {
      setCartItems(getCartOfCurrentUser(_user.uid));
    
    console.log("onAuthStateChanged jhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjh");
    console.log("cartItems", cartItems);
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
    //TODO: check cart
  };

  const removeFromCart = (itemId) => {
    let newCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 }
    if (newCart.itemId <= 0) {
      let updatedCart = cartItems;
      delete updatedCart.itemId;
    }
    setCartItems(newCart);
    updateCart(newCart);
  };

  const updateCartItemCount = (newAmount, itemId) => {
    let newCart = { ...cartItems, [itemId]: newAmount }
    setCartItems(newCart);
    updateCart(newCart);
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
