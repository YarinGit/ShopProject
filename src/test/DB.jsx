import React, { useState } from 'react'
import { auth } from "./firebase";
import { collection, addDoc } from 'firebase/firestore';
const DB = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   const collectionRef = null; //collection(database, 'users');
    return (
    <div>
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
        onClick={() => {
            handleSubmit(collectionRef, email, password);
        }}>
        Submit
      </button>

    </div>
    </div>
  )
}

const handleSubmit = (collectionRef, email, password)=>{
    addDoc(collectionRef, {
        email: email,
        password: password,
    })
    .then(
        alert("data added")
    )
    .catch((err)=>{
        alert(err.message)
    })
}

export default DB