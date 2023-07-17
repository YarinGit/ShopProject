import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContextProvider'; 

const Product = ({id, price, productName, productImg}) => {
  const {addToCart, cartItems}=useContext(ShopContext);
  const cartItemsAmount = cartItems[id];
  return (
    <div className='product'>
        <img src={productImg} alt={productName+" - img"} />
        <div className="desctiption">
          <p> <b>{productName}</b> </p>
          <p>${price}</p>
        </div>
        <button onClick={()=>addToCart(id)} className='addToCartBttn'>
          Add To Cart {cartItemsAmount>0&&<> ({cartItemsAmount}) </>}
          </button>
    </div>
  )
}

export default Product