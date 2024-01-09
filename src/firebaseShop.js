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

  // doc ref
  const productsRef = doc(db, "products", "products");

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
    const snapshot = await getDoc(productsRef);
    let data = [];
    let a = snapshot.data()
    console.log("snapshot", a.products);
    for (let i = 0; i < a.products.length; i++) {
      data.push(a.products[i]);
    }
    return data;
      
    } catch (error) {console.log(error.message)}
    return {}
  }

export const addProduct=async(title,category,description,image,price)=>{
  try {
    price = Number(price);
    let prevProductsArray = await getAllProdacts();
    let newId = (prevProductsArray[prevProductsArray.length-1]?.id >= 1 && prevProductsArray.length >= 1)?Number(prevProductsArray[prevProductsArray.length-1]?.id) + 1 : 1 ;
    console.log("newId", newId);
    console.log("prevProductsArray -> ", prevProductsArray, "type -> ",typeof(prevProductsArray));
    prevProductsArray.push({title:title, category:category, description:description, image:image, price:price, id:newId})
    const productDocRef = productsRef;
    console.log("productDocRef -> ",productDocRef);
    console.log("prevProductsArray -> ",prevProductsArray, "type -> ", typeof(prevProductsArray));
    setDoc(productDocRef, { products: prevProductsArray }); 
    // alert(title + " -> is added")
  } catch (error) {
    alert(error.message)
    console.log(error.message)}
    }

export const removeProduct=async(placeInArr)=>{
  // להשלים פה הורדת מוצר ולעשות רשימה של כל המוצרים כמו שיש של כל המנהלים
  // לעשות גם מחיקה של יוזרים בדף המנהל
  try {
    //! לבדוק
    let prevProductsArray = await getAllProdacts();
    let deletedProduct = prevProductsArray[placeInArr];
    console.log("prevProductsArray[placeInArr] -> ", prevProductsArray[placeInArr]);
    prevProductsArray.splice(placeInArr, 1);
    const productDocRef = productsRef;
    setDoc(productDocRef, { products: prevProductsArray }); 
    alert("Product: "+(deletedProduct.title)+" is removed")
  } catch (error) {console.log(error.message)}
    }

export const updateCart=(cartItems)=>{
      const cartsDocRef = doc(db, "carts", user.uid);
      setDoc(cartsDocRef, { items: {...cartItems} }); 
    }

export const getCartOfCurrentUser = async(UID)=>{
  // this function gets the cart from the database when the user change
  //TODO: לבדוק כאן אם המוצר קיים עדיין בחנות ואם לא אז להוציא אותו מהעגלה
  
  let cart = {};
  const carts = await getDocs(cartsColRef);
  //#region משיג את העגלה הנוכחית

  try {
    // 
    for (const doc of carts.docs) {
      console.log("doc -> ", doc);
      let currentDoc = doc.data();
      if (doc.id === UID) { cart = currentDoc.items; }

    }
  } catch (error) {
    console.log(error.message);
    return {};
  }
  //#endregion

  console.log("cart -> ", cart);

  //#region מביא את העגלה ואת המוצרים
  let keysOfCart = Object.keys(cart);
  console.log("keysOfCart.length", keysOfCart.length);
  let products = await getAllProdacts();
  console.log("products -> ", products);
  // keysOfCart = איזה מוצרים יש בעגלה
  //#endregion

  for (let i = 0; i < keysOfCart.length; i++) {
    //TODO: להראות את זה לבוחנים
    // לא למחוק - אני יודע שזה לא יעיל כרגע פשוט ככה התחלתי ולא היה לי מספיק זמן
    // לשנות את איך שמוגדר רשימת המוצרים ממערך לאובייקט אבל עשיתי זאת במקומות אחרים כגון העגלה
    //TODO: לעשות פה שירוץ ובדוק אם המוצר קיים בעגלה ואם לא אז למחוק אותו
    let isExist = false;
    console.log(" keysOfCart[i], cart[keysOfCart[i]] -> ", keysOfCart[i], cart[keysOfCart[i]]);
    console.log("products[keysOfCart[i]] <= 0 ->", products[keysOfCart[i]] <= 0, cart[keysOfCart[i]]);
    console.log("products[keysOfCart[i]] == null ->", products[keysOfCart[i]] == null, cart[keysOfCart[i]]);
    
    if (products[keysOfCart[i]] <= 0 || products[keysOfCart[i]] == null) {
      console.log("true true true ");
    }

    // if (i<cart.length) {
    //   if (products.id == cart.id) {
    //     isExist = true;
    //     continue;
    //   }
    // }
  }

  return cart;
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

  export const PUT_ALL_DATA_FROM_API_TO_FIREBASE=async(array)=>{
        //TODO: להשים את בפונקציה הזאת בהערה ולא למחוק כשאני מסיים
        try {
          console.log("in add array -> ", array);
          for (let i = 0; i < array.length; i++) {
            await addProduct(array[i].title, array[i].category, array[i].description, array[i].image, array[i].price)
          }

        } catch (error) { console.log(error.message) }
  }