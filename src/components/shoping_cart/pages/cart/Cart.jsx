import React, { useContext } from "react";
import { productConext } from "../../../../App";
import { ShopContext } from "../../context/ShopContext";
import CartItem from "./CartItem";
import "./cart.css";
import PaypayPay from "./PaypayPay";

const Cart = () => {
  const productsArr = useContext(productConext);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount().toFixed(2);
  console.log("cartItems - ", cartItems);
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {/* רץ על המערך בודק אם האיבר במקום ה איי די שווה אפס הוא לא מציג אותו */}
        {productsArr.map((product, index) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} key={index} />;
          }
        })}
        {totalAmount>0? 
        <div className="checkout">
          <h4> Subtotal: {totalAmount} &#8362;</h4>
          {/* <PaypayPay clientId={"test"} /> */}
        </div>:
          <h2>Your Cart Is Empty</h2>
          }
      </div>
    </div>
  );
};

export default Cart;
