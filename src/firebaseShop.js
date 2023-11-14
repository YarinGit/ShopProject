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
  const adminPasswordColRef = collection(db, "adminPassword")

  //#region get collection data
  
  // subscribing to auth changes
  let user;
  onAuthStateChanged(auth, (_user)=>{
    console.log("_user status changed:", _user)
    user = _user;
  })

//TODO: this function spows to get all users

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
  
  // getDocs is used to take whats in the collection
  // export const getCartsFunction = async()=>{
  //   let carts = [];
  //   await getDocs(cartsColRef)
  //   .then(snapshot=>{
  //     console.log("snapshot.docs", snapshot.docs);
  //     snapshot.docs.forEach(doc =>{
  //       carts.push({...doc.data(), id:doc.id})
  //     })
  //     console.log("carts - ", carts);
  //   })
  //   .catch(error=>{
  //     console.log(error.message, "error printed")
  //   })
  //   return carts;
  // }

export const updateCart=(cartItems)=>{
      const cartsDocRef = doc(db, "carts", user.uid);
      setDoc(cartsDocRef, { items: {...cartItems} }); // Initialize favorites as an empty array
      //TODO: צריך לעשות שכשמעדכן את הדאטאבייס ימחק את הערכים שלא נמצאים במעודכן

    }

export const getCartOfCurrentUser = async(UID)=>{
  //! check!!!!
      getDocs(cartsColRef)
      .then(snapshot=>{
        console.log("snapshot", snapshot.docs.forEach(doc=>{
          let currentDoc = doc.data()
          console.log("doc in forEach", currentDoc, doc.id);
          if(doc.id === user.uid) {
            console.log("Equllllllllllllllllllllllllllllllllll");
            return currentDoc;
          }
        }));
      })
      .catch(error=>{console.log(error.message)})
      console.log("not Equllllllllllllllllllllllllllllllllll");

  return {};
}

  //#endregion
  
  //#region Signing users up
  
  export const signIn = (logInData, cartItems)=>{
    // createCart();
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

        