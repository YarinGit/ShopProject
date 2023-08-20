import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import AddNewDocDB from "./test/AddNewDocDB";
import BasicPage from "./test/BasicPage";
import CreateShopingCart from "./test/createShopingCart/CreateShopingCart";
import DB from "./test/DB";
import InputToFB from "./test/InputToFB";
import Context from "./test/hooks/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./components/shoping_cart/pages/shop/Shop";
import Cart from "./components/shoping_cart/pages/cart/Cart";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContextProvider } from "./components/shoping_cart/context/ShopContext";
import { getSnap } from "./firebaseShop";
import ContactUs from "./components/contactUs/ContactUs";

// api 1 - https://dummyjson.com/products/search?q=phone
// api 2 - https://fakestoreapi.com/products
export const productConext = createContext();
function App() {

  getSnap();

  // ------------------------------------------------------------------------------------------------------------------------------------
  const [productsArr, setProductsArr] = useState([]);
useEffect(()=>{
  const getData = async ()=>{
  let {data} = await axios.get("https://fakestoreapi.com/products");
  console.log("data - ", data);
  setProductsArr(data);

  putInFirebase(data);
}
getData();
},[]);
 
const putInFirebase = (data)=>{
  
}
  return (
    <div className="container">

        <productConext.Provider value={productsArr}>
        <ShopContextProvider>
       <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactUs />} />
          </Routes>
      </Router> 
      </ShopContextProvider>
      </productConext.Provider> 
    </div>
  );
}
export default App;



/*

 const arrangeID=(array)=>{
   let newArray = array.map((item, index)=>{
     item = {...item, id:index+1}
   return item;
   } );
   return newArray;
 }
first api

useEffect(()=>{
  const getData = async ()=>{
  let {data} = await axios.get("https://dummyjson.com/products/search?q=phone");
  let {products} = data;
  console.log("products - ", products);
  // products = arrangeID(products);
  setProductsArr(arrangeID(products));
}
getData();
},[]);


*/