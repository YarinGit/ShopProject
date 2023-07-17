import React, { useEffect, useState } from 'react'
import BoxProdact from './shoping_cart/pages/shop/BoxProdact'
import axios from 'axios';
import './css/main.css';

const Main = () => {
    const [display, setDisplay] = useState([]);
    const [showComp, setShowComp] = useState(false);

useEffect(()=>{
    const getData = async ()=>{
    let {data} = await axios.get("https://dummyjson.com/products/search?q=phone");
    let {products} = data;
    setDisplay(products);
  }
  getData();
},[]);
console.log("display - ",display);


  return (
    <main>
        {display.map(item=>{
           return <BoxProdact key={item.id} title={item.title} description={item.description} images={item.images} price={item.price} />
        })}
    </main>
  )
}

export default Main