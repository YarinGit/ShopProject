import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import PopupLogIn from "./popupAuth/PopupLogIn";
import { logExistingUserByEmailAndPassword, signAndLogOut, signIn } from "../firebaseShop";
import "./css/header.css";

const Header = () => {
  // Popup Log in
  const [isLogIn, setIsLogIn] = useState(false);
  const [isPopupLogInOpen, setIsPopupLogInOpen] = useState(false);
  const [isPopupSignUpOpen, setIsPopupSignUpOpen] = useState(false);

  //#region Sign Auth
  const handleSignOut = () => {
    signAndLogOut();
    setIsLogIn(false);
  };
  const handlePopupSignUpOpen = () => {
    setIsPopupSignUpOpen(true);
  };
  const handlePopupSignUpClose = (signUpData) => {
    // console.log("signUpData - ", signUpData);
    // console.log('email: in signUpData', signUpData.email);
    // console.log('password: in signUpData', signUpData.password);

    if (
      signUpData !== { email: "", password: "" } &&
      isEmailCorrect(signUpData.email)
    ) {
      signIn(signUpData);
      console.log("signUpData", signUpData);
      setIsLogIn(true);
    }

    // TODO: adjust this function to do it only after firebase apdate
    if (signUpData != null) {
      setIsLogIn(true);
    }

    setIsPopupSignUpOpen(false);
    // setIsLogIn(true);
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
        setIsLogIn(true);
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
  // const isPasswordCorrect = (password)=>{
  //   if(typeof(password) == "string")return password.length<=6;
  //   return false;
  // }

  //#endregion

  let signInFunctions = {
    handlePopupSignUpOpen,
    isPopupSignUpOpen,
    handlePopupSignUpClose,
  };

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
              {/* <li>
                <Link onClick={handlePopupSignUpOpen}>Sign up</Link>
                <PopupSignUp open={isPopupSignUpOpen} onClose={handlePopupSignUpClose} />

              </li> */}
              <li>
                {isLogIn ? (
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
            <button
              onClick={() => {
                console.log("isLogIn", isLogIn);
              }}
            >
              check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
