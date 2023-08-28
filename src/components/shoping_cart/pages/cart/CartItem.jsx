import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';

const CartItem = (props) => {
    const {id, title, image, price } = props.data;
  const { cartItems, addToCart,removeFromCart, updateCartItemCount } = useContext(ShopContext);
  return (
    <div className='cartItem'>
        <img src={image} alt={title.slice(0,5)} />
        <div className="title">
            <p> <b> {title} </b> </p>            

            <p> {price} &#8362; </p>
            <div className="countHandler">
                <button onClick={()=>removeFromCart(id)}> - </button>
                <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)} />
                <button onClick={()=>addToCart(id)}> + </button>
            </div>
        </div>
    </div>
  )
}

export default CartItem