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
import Base from "./test/solveCartProblem/Base";

// api 1 - https://dummyjson.com/products/search?q=phone
// api 2 - https://fakestoreapi.com/products
export const productConext = createContext();
function App() {
  const [productsArr, setProductsArr] = useState([]);
useEffect(()=>{
  const getData = async ()=>{
  let {data} = await axios.get("https://fakestoreapi.com/products");
  // let {products} = data;
  console.log("data - ", data);
  // products = arrangeID(products);
  setProductsArr(data);
}
getData();
},[]);
  
  return (
    <div className="container">
      {/* <InputToFB/> */}
      {/* <DB/>
      <AddNewDocDB/> */}

      {/* ShopingCart in test folder */}
      {/* <CreateShopingCart/> */}
        
        <productConext.Provider value={productsArr}>
        <ShopContextProvider>
       <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          </Routes>
      </Router> 
      </ShopContextProvider>
      </productConext.Provider> 
 
      {/* <Header /> */}
      {/* <Main /> */}
    </div>
  );
}
const arrangeID=(array)=>{
  let newArray = array.map((item, index)=>{
    item = {...item, id:index+1}
  return item;
  } );
  return newArray;
}
export default App;




/*
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