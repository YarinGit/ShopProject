import {initializeApp } from "firebase/app";
import { 
    getFirestore, collection, getDocs, onSnapshot,
    doc, setDoc,
    addDoc, 
 } from "firebase/firestore";

 import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword,
  onAuthStateChanged, 
 } from "firebase/auth";
import { useState } from "react";
// import { isUserLoggedIn } from "./App";

const firebaseConfig = {
    apiKey: "AIzaSyCnIeACiMNfCOLuIG0mQ581wkfmrEUmmRM",
    authDomain: "shop-project-yarin.firebaseapp.com",
    projectId: "shop-project-yarin",
    storageBucket: "shop-project-yarin.appspot.com",
    messagingSenderId: "1048380867502",
    appId: "1:1048380867502:web:aabd41a164feb11509be3f"
  };
  // init firebase app
  initializeApp(firebaseConfig);

  // init services
  const db = getFirestore();
  const auth = getAuth();

  // collection ref
  const cartsColRef = collection(db, "carts")
  const adminPasswordColRef = collection(db, "adminPassword")


  //#region get collection data
  
  // subscribing to auth changes
  let user;
  onAuthStateChanged(auth, (_user)=>{
    console.log("_user status changed:", _user)
    user = _user;
    // isUserLoggedIn(user);
  })

  export const getAdminPassword = async () => {
    try {
      const snapshot = await getDocs(adminPasswordColRef); 
      if (snapshot.docs.length > 0) {
        const { password } = snapshot.docs[0].data();
        return password;
      } else {
        throw new Error("No admin password found"); // Handle the case where no password is found
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      throw error; // Rethrow the error to handle it at a higher level if needed
    }
  };
  
  // getDocs is used to take whats in the collection in one time
  // later is how to do it real time...
  export const getDocsFunction = ()=>{
    getDocs(cartsColRef)
    .then(snapshot=>{
      let carts = [];
      console.log("snapshot.docs", snapshot.docs);
      snapshot.docs.forEach(doc =>{
        carts.push({...doc.data(), id:doc.id})
      })
      console.log("carts - ", carts);
      
    })
    .catch(error=>console.log(error.message, "error printed"))
  }
  
  // real time
  export const realTimeGetAndSetCarts = () =>{
    onSnapshot(cartsColRef, (snapshot)=>{
  let carts = [];
  console.log("snapshot.docs", snapshot.docs);
  snapshot.docs.forEach(doc =>{
    carts.push({...doc.data(), id:doc.id})
  })
  console.log("carts - ", carts);
  return carts;
})  
}

export const addAndUpdateCart=(cartItems)=>{
  try{
    let clientUid = user.uid;
    console.log("clientUid", clientUid);
    addDoc(cartsColRef, {
        clientUid: clientUid,
        cartItems: cartItems
      })
      .then(()=>console.log("adding is complete"))
    }
    catch(error){console.log(error.message)}
}

  const getListOfUsers = ()=>{

  }

  //#endregion
  
  //#region Signing users up

  export const signIn = (logInData)=>{
    let {email, password} = logInData;
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // After successful sign-up, create a corresponding favorites document
      const favoritesDocRef = doc(db, "favorites", cred.user.uid);
      setDoc(favoritesDocRef, { books: [] }); // Initialize favorites as an empty array
    })
    .catch((error) => {
      console.log(error.message);
    });
};
//#endregion

  //#region Logging in and out
  export const signAndLogOut=()=>{
    signOut(auth)
    .then(()=>{
    })
    .catch(error=>{
      console.log(error.message);
    })
  }

  export const logExistingUserByEmailAndPassword=(email, password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then(cred=>{
      console.log("User logged in: ", cred.user);
      return true;
    })
    .catch(error=>{
      console.log(error.message);
      return false;
    })
  }

  export const isUserLoggedIn=()=>{
    return user;
  }
//#endregion

        