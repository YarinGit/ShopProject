import React, { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const InputToFB = () => {
  // let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        name="textEmail"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="tel"
        placeholder="Password"
        name="textPassword"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          signInWithPopup(auth, googleProvider);
        }}>
        Sing in
      </button>

      <button
        onClick={(e) => {
          createNew(auth, email, password);
        }}>
        Sign up
      </button>
    </div>
  );
};

export default InputToFB;

const signIn = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((respons) => {
      console.log(respons.user);
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};
const createNew = (auth, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((respons) => {
      console.log(respons.user);
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};
