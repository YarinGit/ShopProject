import React, { useContext } from "react";
import { productConext } from "../../../../App";
import { ShopContext } from "../../context/ShopContext";
import CartItem from "./CartItem";
import "./cart.css";

const Cart = () => {
  const productsArr = useContext(productConext);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount().toFixed(2);
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {productsArr.map((product, index) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} key={index} />;
          }
        })}
        {totalAmount>0? 
        <div className="checkout">
          <h4> Subtotal: {totalAmount} &#8362;</h4>
        </div>:
        <h2>Your Cart Is Empty</h2>
}
      </div>
    </div>
  );
};

export default Cart;
