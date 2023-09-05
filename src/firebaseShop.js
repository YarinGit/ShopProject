import {initializeApp } from "firebase/app";
import { 
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
 } from "firebase/firestore";

 import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword,
  onAuthStateChanged
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
  const booksColRef = collection(db, "books")
  const adminColRef = collection(db, "admin")

  //#region get collection data

  export const getSnap = ()=>{
    getDocs(adminColRef)
    .then(snapshot =>{
      let admins = [];
      snapshot.docs.forEach(doc=>{
        admins.push({...doc.data(), id:doc.id})
        // add here the users who whii be admin, by id
      })
      console.log("admins - ", admins);
    })
    .catch(error=>console.log(error.message))

  }
  export const getBooks = ()=>{
getDocs(booksColRef)
.then(snapshot=>{
  let books = [];
  snapshot.docs.forEach(doc =>{
    books.push({...doc.data(), id:doc.id})
  })
  console.log("books - ", books);

  })
  .catch(error=>console.log(error.message))
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
  let user;
  // subscribing to auth changes
  onAuthStateChanged(auth, (_user)=>{
    console.log("_user status changed:", _user)
    user = _user;
    // isUserLoggedIn(user);
  })

  export const isUserLoggedIn=()=>{
    return user;
  }
//#endregion

        