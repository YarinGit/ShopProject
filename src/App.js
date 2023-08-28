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
  const defineCategoriesList = (data) => {
    let categoriesList = [];
    categoriesList.push(data[0].category);
    for (let i = 1; i < data.length; i++) {
      let currentCategory = data[i].category;
      let isExist = true;
      for (let j = 0; j < categoriesList.length; j++) {
        if (categoriesList[j] == currentCategory) {
          isExist = false;
        }
      }
      if (isExist) {
        categoriesList.push(currentCategory);
      }
    }
    console.log("categoriesList - ", categoriesList);

    let newCategoriesList = [];
    categoriesList.map((item) => {
      newCategoriesList.push({ value: item, label: item });
    });

    console.log("newCategoriesList - ", newCategoriesList);

    return newCategoriesList;
  };
  // getSnap();

  // ------------------------------------------------------------------------------------------------------------------------------------
  const [productsArr, setProductsArr] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let {data} = await axios.get("https://fakestoreapi.com/products");
      for (let i = 0; i < data.length; i++) { data[i].id = i+1;}
      console.log("data - ", data);
      setCategoriesList(defineCategoriesList(data))
      setProductsArr(data);

      // putInFirebase(data);
    };
    getData();
  }, []);
  console.log("categoriesList - final", categoriesList);
  const putInFirebase = (data) => {};
  return (
    <div className="container">
      <productConext.Provider value={productsArr}>
        <ShopContextProvider>
          <Router>
            <Header />
            <Routes>
              <Route
                path="/"
                element={<Shop categoriesList={categoriesList} />}
              />
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
