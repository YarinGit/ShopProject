import React from "react";
import "./css/header.css";
import { Link } from "react-router-dom";
import {FaOpencart} from 'react-icons/fa'

const Header = () => {
  return (
    <div className="header">
      <div >
        <div className="roww">
          <div className="logo">
            <img src="../images/logoShop.png" alt="logoShop" />  
            <h1>Shop</h1>
          </div>
          
          {/*//TODO: לתקןןןן   */}

           <div className="nav">
    <ul>
      <li>
        <Link to="/">Contact us</Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">sign up</Link>
      </li>
      <li>
        <Link to="/">Log in</Link>
      </li>
      <li>
      <Link to="/cart"> <FaOpencart size={35}/></Link>
      </li>
    </ul>

  </div> 

        </div>
      </div>
    </div>
  );
};

export default Header;

