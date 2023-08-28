import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

const PaypayPay = ({ clientId, amount }) => {
  console.log("amount", amount);
  return (
    <div>
      <PayPalScriptProvider options={{ clientId: clientId }}>
        <PayPalButtons  style={{ layout: "horizontal" }} amount={amount} />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypayPay;
