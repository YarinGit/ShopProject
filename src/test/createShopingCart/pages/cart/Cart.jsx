import React, { useContext } from 'react'
import { PRODUCTS } from '../shop/products'
import { ShopContext } from '../../context/ShopContextProvider'
import CartItem from './CartItem'
import './cart.css';
import{useNavigate} from 'react-router-dom';


const Cart = () => {
const{ cartItems, getTotalCartAmount} = useContext(ShopContext);
const totalAmount = getTotalCartAmount();
const navagate = useNavigate();
  return (
    <div className='cart'>
      <div>Youre Cart Items</div>
      <div className="cartItems">
        {PRODUCTS.map((product)=>{
          if (cartItems[product.id]!== 0) {
            return <CartItem id={product.id} price={product.price} productName={product.productName} productImg={product.productImg}/>
          }
        })}
      </div>

{totalAmount>0?(<div className="checkout">
        <h3> Subtotal: ${totalAmount}</h3>
        <button onClick={()=>{navagate("/")}}>Continue Shopping</button>
        <button>Checkout</button>

      </div>)
      : (<h1>Your Cart is Empty</h1>)}
    </div>
  )
}

export default Cart