import axios from "axios";
import React, { useEffect, useState, createContext } from "react";
import Box from "./Box";

export const myContext = createContext("Hiii");


const BasicPage = () => {
  const [api, setApi] = useState([]);
  useEffect(() => {
    getApi();
  }, []);
  
  const getApi = async () => {
    let { data } = await axios.get("https://fakestoreapi.com/products");
    setApi(data);
  };
  console.log(api);

  return (
  <div className="test">


    <myContext.Provider value={"Hello"}>
    {api.map((item, index)=><Box key={index} title={item.title} price={item.price} imag={item.image}/>)}

    </myContext.Provider>
  </div>);
};

export default BasicPage;
