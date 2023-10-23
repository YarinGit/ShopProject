import React, { useContext } from "react";
import { productConext } from "../../../../App";
import { ShopContext } from "../../context/ShopContext";
import CartItem from "./CartItem";
import "./cart.css";
import PaypayPay from "./PaypayPay";
import { getDocsFunction, realTimeGetAndSetCarts } from "../../../../firebaseShop";

const Cart = () => {
  realTimeGetAndSetCarts();
  const productsArr = useContext(productConext);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount().toFixed(2);
  console.log("cartItems - ", cartItems);
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <button onClick={getDocsFunction} >aaaa</button>
      <div className="cartItems">
        {/* רץ על המערך בודק אם האיבר במקום ה איי די שווה אפס הוא לא מציג אותו */}
        {productsArr.map((product, index) => {
          if (cartItems[product.id] >= 1 && cartItems[product.id] != null) {
            return <CartItem data={product} key={index} />;
          }
        })}
        {totalAmount>0? 
        <div className="checkout">
          <h4> Subtotal: {totalAmount} &#8362;</h4>
          <PaypayPay clientId={"test"} amount={totalAmount} />
        </div>:
          <h2>Your Cart Is Empty</h2>
          }
      </div>
    </div>
  );
};

export default Cart;
