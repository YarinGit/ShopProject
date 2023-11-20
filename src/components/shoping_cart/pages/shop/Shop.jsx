import React, { useContext, useEffect, useState } from 'react'
import BoxProdact from './BoxProdact';
import { productConext } from '../../../../App';
import Select from 'react-select';
import "./shop.css";


const Shop = (categoriesList) => {
  const [op, setOp] = useState([
    {value: "op1", label: "OPTION 1"},
    {value: "op2", label: "OPTION 2"},
    {value: "op3", label: "OPTION 3"},
    {value: "op4", label: "OPTION 4"},
  ])
  console.log("categoriesList.categoriesList in shop", categoriesList.categoriesList);
  const categoriesListInShop = [...categoriesList.categoriesList];
  const [chosenCategories, setChosenCategories] = useState([]);
  console.log("categoriesListInShop", categoriesListInShop);
  const productArr = useContext(productConext);
  const [serchingText, setSerchingText] = useState('');
  const [serchingCategory, setSerchingCategory] = useState('');
  let filteredProductList = productArr.filter(product=>{
    return product.title.toLowerCase().includes(serchingText.toLowerCase()) ||
    product.description.toLowerCase().includes(serchingText.toLowerCase()) 
  })
  if (chosenCategories.length>0) {
    filteredProductList = productArr.filter(product=>{
      return chosenCategories.includes(product.category)
      
    })
    console.log("filteredProductList - after if", filteredProductList);
  }
  // product.category.includes(chosenCategories)  
  useEffect(()=>{
    console.log("chosenCategories in event", chosenCategories);
  }, [chosenCategories])
  return (
    <div className="container">
    
      {/* serching in product */}
      <input placeholder='serch product..' type="text" onChange={(event)=>{
        setSerchingText(event.target.value)
      }} />

    <Select
    defaultValue={[categoriesListInShop[0]]}
    isMulti={true}
    name="colors"
    options={categoriesListInShop}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={(event)=>{
      const a = event.map(item => item.value)
      setChosenCategories(a);
      // console.log("event", event);
      // console.log("chosenCategories in event", chosenCategories);
    }}
    />
      <div className='productContainer'>

                 {filteredProductList.map((item, index)=>{
           return <BoxProdact key={index} id={item.id} title={item.title} description={item.description} image={item.image} price={item.price} serchingText={serchingText} />
        })} 

    </div>
    </div>
  )
}

export default Shop