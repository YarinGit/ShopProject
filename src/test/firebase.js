// import { initializeApp } from "firebase/app";
// import { 
//   getAuth,
//   createUserWithEmailAndPassword,
//  } from "firebase/auth";
// import { collection, getDocs, getFirestore, addDoc, deleteDoc, doc, query, where } from "firebase/firestore";
// //#region init firebase app
// //TODO: init firebase app
// export const firebaseApp = initializeApp({
//   apiKey: "AIzaSyAZ1kpZDYYLCLTK3N6ZWO1Bq7WYuTdMWZo",
//   authDomain: "electric-shop-a672b.firebaseapp.com",
//   projectId: "electric-shop-a672b",
//   storageBucket: "electric-shop-a672b.appspot.com",
//   messagingSenderId: "592888491455",
//   appId: "1:592888491455:web:943f98235ef66647e2850a",
//   measurementId: "G-V0QBEJZ5GW",
// });
// //#endregion

// //#region init service
// //TODO: init service
// export const db = getFirestore();
// export const auth = getAuth();

// //#endregion

// //#region collection ref
// //TODO: collection ref
// export let collectionRef;
// const getCollection =(_collectionName)=>{
//   collectionRef = collection(db, _collectionName);
// }
// getCollection("books");

// //#endregion

// //#region get collection data
// //TODO: get collection data
// export const getCollectionData=async(_colRef)=>{
//   try {
//   let data = [];
//   let {docs} =await getDocs(_colRef)
//   console.log(docs);
//   docs?.forEach((snapshot) => {
//       data.push({ ...snapshot.data(), id: snapshot.id });
//     // console.log(data);
//   });
//   // console.log("data",data);
//   return data;
// } catch(err){
//   console.log(err.message);
// } 
// }
// getCollectionData(collectionRef);
// //#endregion

// //#region adding document
// //TODO: add document

// export const addFormNewDoc = (data)=>{
//     console.log("form submitted -> ", data);
//     console.log(data.title);
//   addDoc(collectionRef,{
//     title: data.title,
//     author: data.author,
//   })
// getCollectionData(collectionRef);
    
// }

// //#endregion

// //#region delete document
// //TODO: delete document

// export const deleteFormNewDoc= (_id,_collection)=>{
//   console.log(_id);
//   console.log(doc(db, _collection, _id));
//   if (doc(db, _collection, _id)) {
//     deleteDoc(doc(db, _collection, _id))
//     .then(()=>{
//       console.log("success");
      
//     });
//   }
    
//   getCollectionData(collectionRef);
// }








// //#endregion

// //#region Signing user up

// export const signingUp = async(email, password)=>{
//   console.log("email - ", email, "  -  ", "password - ", password);

// // Password should be at least 6 characters


// try {

//   await createUserWithEmailAndPassword(auth, email, password)
//   .then((cred)=>{
//     console.log("cred - ", cred);
//     console.log("user created: ", cred.user);
//   })

// }catch(error){
//     console.log(error);
//   }
// }

// //#endregion

// //#region exports

// //#endregion

// //#region unused code


// //  export const database = getFirestore(auth);

// // onAuthStateChanged(database, (user) => {
// //   if (user != null) {
// //     console.log("Logged in!!!:");
// //   } else {
// //     console.log("No user");
// //   }
// // });

// //#endregion
