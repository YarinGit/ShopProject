import {initializeApp } from "firebase/app";
import { 
    getFirestore, collection, getDocs, onSnapshot,
    doc, setDoc,
    addDoc, getDoc,
 } from "firebase/firestore";

 import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword,
  onAuthStateChanged, 
 } from "firebase/auth";
import { useState, useEffect } from "react";

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
  export const auth = getAuth();

  // collection ref
  const cartsColRef = collection(db, "carts")

  //#region get collection data
  
  // subscribing to auth changes
  let user;
  onAuthStateChanged(auth, (_user)=>{
    console.log("_user status changed:", _user)
    user = _user;
  })

  const updateAdmins=(admins)=>{
    const document = doc(db, "admins", "admins")
    setDoc(document, { ...admins }); 
  }

  export const deleteAdmin = async(admin)=>{
    try {
      let managers = await getAdmins();
      delete managers[admin]
      alert("Mission complete! -> Please refresh")
      updateAdmins(managers)
    } catch (error) {console.log(error.message)}
  }
  export const setAdmin = async(newAdmin)=>{
    try {
      const currentManagers = await getAdmins()
      const document = doc(db, "admins", "admins")
      setDoc(document, {...currentManagers, [newAdmin]:true});

    } catch (error) {
      console.log(error.message);
    }
  }

  export const getAdmins = async()=>{
    try {
    const snapshot = await getDocs(collection(db, "admins"));
    const data = snapshot.docs[0].data();
    return data;
      
    } catch (error) {console.log(error.message)}
    return {}
  }

  export const getAllProdacts = async()=>{
    try {
    const snapshot = await getDocs(collection(db, "products"));
    const data = [];
    for (let i = 0; i < snapshot.docs.length; i++) {
      data.push(snapshot.docs[i].data());
    }
    return data;
      
    } catch (error) {console.log(error.message)}
    return {}
  }

export const updateCart=(cartItems)=>{
      const cartsDocRef = doc(db, "carts", user.uid);
      setDoc(cartsDocRef, { items: {...cartItems} }); 
    }

export const getCartOfCurrentUser = async(UID)=>{
  // this function gets the cart from the database when the user change
  try {
    const snapshot = await getDocs(cartsColRef);

    for (const doc of snapshot.docs) {
      let currentDoc = doc.data();
      if (doc.id === UID) { return currentDoc.items; }
    }
    return {};
  } catch (error) {
    console.log(error.message);
    return {};
  }
};

  //#endregion
  
  //#region Signing users up
  
  export const signIn = (logInData, cartItems)=>{
    let {email, password} = logInData;
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // After successful sign-up, create a corresponding favorites document
      const cartsDocRef = doc(db, "carts", cred.user.uid);
      setDoc(cartsDocRef, { items: {...cartItems} }); // Initialize favorites as an empty array
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

        