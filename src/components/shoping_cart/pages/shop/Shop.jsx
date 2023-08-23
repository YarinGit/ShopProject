import React, { useContext, useEffect, useState } from 'react'
import BoxProdact from './BoxProdact';
import "./shop.css"
import { productConext } from '../../../../App';
import {GrSearch} from 'react-icons/gr'
import { set } from 'react-hook-form';

const Shop = () => {

  


  const productArr = useContext(productConext);
  const [serchingText, setSerchingText] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');
  const filteredProductList = productArr.filter(product=>{
    return product.title.toLowerCase().includes(serchingText.toLowerCase()) ||
    product.description.toLowerCase().includes(serchingText.toLowerCase())
  })
  console.log("chosenCategory - ", chosenCategory);
  // console.log("categoriesList - ", categoriesList);
    // console.log("productArr[0].category.name - ", productArr[0].category.name);

  return (
    <div className="container">
      {/* serching in product */}
      <input placeholder='serch product..' type="text" onChange={(event)=>{
        setSerchingText(event.target.value)
      }} />
    <div className='productContainer'>

                 {filteredProductList.map((item, index)=>{
           return <BoxProdact key={index} id={item.id} title={item.title} description={item.description} image={item.images[1]} price={item.price} serchingText={serchingText} />
        })} 

    </div>
    </div>
  )
}

export default Shop