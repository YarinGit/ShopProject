import React from 'react'
import {Link} from 'react-router-dom'
import {TbShoppingCart} from 'react-icons/tb'
import './nav.css';
const Nav = () => {
  return (
    <div className='navbar'>
        <div className="links">
            <Link to='/'> Shop </Link>
            <Link to='/cart'> <TbShoppingCart size={32}/> </Link>
        </div>
        </div>
  )
}

export default Nav