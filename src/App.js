import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./components/shoping_cart/pages/shop/Shop";
import Cart from "./components/shoping_cart/pages/cart/Cart";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContextProvider } from "./components/shoping_cart/context/ShopContext";
import { getSnap } from "./firebaseShop";
import ContactUs from "./components/contactUs/ContactUs";
import Favorite from "./components/favorite/Favorite";

// api 1 - https://dummyjson.com/products/search?q=phone
// api 2 - https://fakestoreapi.com/products
// api 3 - https://api.storerestapi.com/products
// api 4 - https://api.escuelajs.co/api/v1/products
export const productConext = createContext();
function App() {

  // getSnap();

  // ------------------------------------------------------------------------------------------------------------------------------------
  const [productsArr, setProductsArr] = useState([]);
useEffect(()=>{
  const getData = async ()=>{

  let {data} = await axios.get("https://api.escuelajs.co/api/v1/products");
  for (let i = 0; i < data.length; i++) {
    data[i].id = i+1;
  }
  
  console.log("data - ", data);
  setProductsArr(data);

  // putInFirebase(data);
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
          <Route path="/favorite" element={<Favorite />} />
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