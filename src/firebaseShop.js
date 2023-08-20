import {initializeApp } from "firebase/app";
import { 
    getFirestore,
    collection,
    getDocs,
 } from "firebase/firestore";

 import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword,
  onAuthStateChanged
 } from "firebase/auth";

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
  const colRef = collection(db, "books")

  //#region get collection data

  export const getSnap = ()=>{
getDocs(colRef)
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
    .then(cred=>{
    })
    .catch(error=>{console.log(error.message);})
  }
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

  // subscribing to auth changes
  onAuthStateChanged(auth, (user)=>{
    console.log("user status changed:", user)
  })

//#endregion

        