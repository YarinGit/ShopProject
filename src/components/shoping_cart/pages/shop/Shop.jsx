import React, { useContext } from 'react'
import BoxProdact from './BoxProdact';
import "./shop.css"
import { productConext } from '../../../../App';
import {GrSearch} from 'react-icons/gr'

const Shop = () => {
  const productArr = useContext(productConext);
  return (
    <div className="container">
      <button><GrSearch size={35}/></button>

    <div className='productContainer'>

                 {productArr.map(item=>{
           return <BoxProdact key={item.id} id={item.id} title={item.title} description={item.description} image={item.image} price={item.price} />
        })} 

    </div>
    </div>
  )
}

export default Shop