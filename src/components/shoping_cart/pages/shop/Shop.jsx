import React, { useContext, useEffect, useState } from 'react'
import BoxProdact from './BoxProdact';
import { productConext } from '../../../../App';
import Select from 'react-select';
import "./shop.css";
import { getAllProdacts } from '../../../../firebaseShop';


const Shop = (categoriesList) => {

  const tempArr = [
    {title:"title",image:"image",description:"description"},
    {title:"a",image:"aa",description:"aaa"},
    {title:"b",image:"bb",description:"bbb"},
    {title:"c",image:"cc",description:"ccc"},
    {title:"s",image:"ss",description:"sss"},
  ]
useEffect(()=>{
  // setProductsArr(tempArr)
  },[])
  console.log("categoriesList.categoriesList in shop", categoriesList.categoriesList);
  const categoriesListInShop = [...categoriesList.categoriesList];
  const [chosenCategories, setChosenCategories] = useState([]);
  const [serchingText, setSerchingText] = useState('');
  const {productsArr, setProductsArr} = useContext(productConext);
  const [serchingCategory, setSerchingCategory] = useState('');
  let filteredProductList = productsArr.filter(product=>{
    return product.title.toLowerCase().includes(serchingText.toLowerCase()) ||
    product.description.toLowerCase().includes(serchingText.toLowerCase()) 
  })
  console.log("categoriesListInShop", categoriesListInShop);
  if (chosenCategories.length>0) {
    filteredProductList = productsArr.filter(product=>{
      return chosenCategories.includes(product.category)
      
    })
    console.log("filteredProductList - after if", filteredProductList);
  }
  useEffect(()=>{
    console.log("chosenCategories in event", chosenCategories);
  }, [chosenCategories])

  // const getProductsFromFirebase = ()=>{
  //   getAllProdacts().then(data=>{
  //     console.log("data",data)
  //     let tempArr = setProductsArr;
  //     for (let i = 0; i < data.length; i++) {
  //       tempArr.push(data[i])
  //     }
  //     setProductsArr(tempArr);
  //     console.log("tempArr", tempArr);
  //   })
  // }
  


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
<button onClick={()=>{
  // getProductsFromFirebase()
  console.log("some", productsArr);
}} >getProductsFromFirebase</button>
                 {filteredProductList.map((item, index)=>{
           return <BoxProdact key={index} id={item.id} title={item.title} description={item.description} image={item.image} price={item.price} serchingText={serchingText} />
        })} 

    </div>
    </div>
  )
}

export default Shop