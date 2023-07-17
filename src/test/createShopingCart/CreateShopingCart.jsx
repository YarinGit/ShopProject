import React from 'react'
import {BrowserRouter as Router, routes, Route, Routes} from 'react-router-dom'
import Nav from './comp/Nav'
import Cart from './pages/cart/Cart'
import Shop from './pages/shop/Shop'
import ShopContextProvider from './context/ShopContextProvider'

const CreateShopingCart = () => {
  return (
    <div >
      <ShopContextProvider>
        <Router>
        <Nav/>

            <Routes>
                <Route path='/' element={<Shop/>} />
                <Route path='/cart' element={<Cart/>} />
            </Routes>
        </Router>
        </ShopContextProvider>
    </div>
  )
}

export default CreateShopingCart