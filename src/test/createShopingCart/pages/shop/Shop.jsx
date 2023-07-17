import React from 'react'
import { PRODUCTS } from './products'
import Product from './Product'
import "./shop.css"

const Shop = () => {
  return (
    <div className='shop'>
        <div className="shopTitle">
        <h1>Tech Shop</h1>
        </div>
            <div className="products">
            </div>
            <div className="products">
            {PRODUCTS.map(product => 
            <Product id={product.id} price={product.price} productName={product.productName} productImg={product.productImg} />
            )}
            </div>
    </div>
  )
}

export default Shop