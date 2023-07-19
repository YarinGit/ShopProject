import React, { useState } from "react";
import "./css/header.css";
import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import PopupSignUp from "./popupAuth/PopupSignUp";
import PopupLogIn from "./popupAuth/PopupLogIn";
import { signIn } from "../firebaseShop";

const Header = () => {
  // Popup Log in 
  const [isPopupLogInOpen, setIsPopupLogInOpen] = useState(false);
  const handlePopupLogInOpen = (logInData) => {
    console.log('logInData', logInData);
    
    // TODO: enter here connection to firebase

    setIsPopupLogInOpen(true);
  }
  const handlePopupLogInClose = (logInData) => {
    signIn(logInData);
    
    // TODO: enter here connection to firebase
    
    setIsPopupLogInOpen(false);
  };

  // Popup Sign up 
  const [isPopupSignUpOpen, setIsPopupSignUpOpen] = useState(false);
  const handlePopupSignUpOpen = () => {
    
    setIsPopupSignUpOpen(true);
  }
  const handlePopupSignUpClose = (signUpData) => {
    console.log("signUpData - ", signUpData);
    console.log('email: in signUpData', signUpData.email);
    console.log('password: in signUpData', signUpData.password);


    setIsPopupSignUpOpen(false);
  }
  
  return (
    <div className="header">
      <div>
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
                <Link onClick={handlePopupSignUpOpen}>Sign up</Link>
                <PopupSignUp open={isPopupSignUpOpen} onClose={handlePopupSignUpClose} />

              </li>
              <li>
                <Link onClick={handlePopupLogInOpen}>Log in</Link>
                <PopupLogIn open={isPopupLogInOpen} onClose={handlePopupLogInClose} />
              </li>
              <li>
                <Link to="/cart"><FaOpencart size={35} /></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
