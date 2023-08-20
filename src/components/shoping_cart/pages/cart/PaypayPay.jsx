import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'

const PaypayPay = ({clientId}) => {
  return (
    <div>
        <PayPalScriptProvider options={{ "client-id": clientId }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    </div>
  )
}

export default PaypayPay