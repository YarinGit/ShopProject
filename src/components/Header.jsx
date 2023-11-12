import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import PopupLogIn from "./popupAuth/PopupLogIn";
import { logExistingUserByEmailAndPassword, signAndLogOut, signIn } from "../firebaseShop";
import "./css/header.css";
import { userContext } from "../App";
import { ShopContext } from "./shoping_cart/context/ShopContext";

const Header = () => {
  // Popup Log in
  const [isPopupLogInOpen, setIsPopupLogInOpen] = useState(false);
  const [isPopupSignUpOpen, setIsPopupSignUpOpen] = useState(false);
  const { cartItems } = useContext(ShopContext);
  const {user} = useContext(userContext);

  //#region Sign Auth
  const handleSignOut = () => {
    signAndLogOut();
  };
  const handlePopupSignUpOpen = () => {
    setIsPopupSignUpOpen(true);
  };
  const handlePopupSignUpClose = (signUpData) => {
    if (
      isEmailCorrect(signUpData.email)
    ) {
      signIn(signUpData, cartItems);
      // console.log("signUpData", signUpData);
    }

    // TODO: adjust this function to do it only after firebase apdate
    if (signUpData != null) {
    }

    setIsPopupSignUpOpen(false);
  };
  //#endregion
  //#region Log Auth
  const handlePopupLogInOpen = () => {
    setIsPopupLogInOpen(true);
  };

  const handlePopupLogInClose = (logInData) => {
    if (logInData != { email: "", password: "" } && isEmailCorrect(logInData.email)) {
      if(logExistingUserByEmailAndPassword(logInData.email, logInData.password))
      {
        console.log("log In seccess: ", logInData);
      }
    }
    setIsPopupLogInOpen(false);
  };

  const isEmailCorrect = (email) => {
    if (typeof(email) == "string") {
      if (!email.includes("@") ||!email.includes(".com") ||typeof email != "string") return false;
    }
    return true;
  };

  //#endregion

  let signInFunctions = {
    handlePopupSignUpOpen,
    isPopupSignUpOpen,
    handlePopupSignUpClose,
  };

  return (
    <div className="header">
        <div className="roww">
          <div className="logo">
            <img src="../images/logoShop.png" alt="logoShop" />
            <h1>Shop</h1>
          </div>

          {/*//TODO: לתקןןןן   */}

          <div className="nav">
            <ul>
            <li>
                <Link to="/ManagerPage">
                  <GrUserManager size={35} />
                </Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorite">Favorite</Link>
              </li>
              <li>
                {!(user == null) ? (
                  <Link onClick={handleSignOut}>Sign out</Link>
                ) : (
                  <div>
                    <Link onClick={handlePopupLogInOpen}>Log in</Link>
                    <PopupLogIn
                      open={isPopupLogInOpen}
                      onClose={handlePopupLogInClose}
                      forSignInPopup={signInFunctions}
                    />
                  </div>
                )}
              </li>
              <li>
                <Link to="/cart">
                  <FaOpencart size={35} />
                </Link>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Header;
