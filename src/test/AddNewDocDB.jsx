import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { addFormNewDoc, collectionRef, db, deleteFormNewDoc, getCollectionData, signingUp } from './firebase';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { StrictMode } from 'react';

const AddNewDocDB = () => {
    const form = useForm();

  const {register, control, handleSubmit}=form
  const {register: registerDel, control: controlDel, handleSubmit:handleSubmitDel}=form

  const [collection, setCollection] = useState([]);
  const func = async()=>{
let data = await getCollectionData(collectionRef);
setCollection(data);
  }
  useEffect(()=>{
// console.log(getCollectionData(collectionRef));
//     setCollection(getCollectionData(collectionRef));
func();
console.log("data in collectionData - ", collection);
  },[]);
  if (collection[1]!= null) {
    deleteFormNewDoc(collection[1].id, 'books');
  }

  const [userSignIn, setUserSignIn] = useState({email:"", password:""})

  const emailRef = useRef();
  const passwordRef = useRef();


  return (
    <div>
        <h1>Getting started with firebase 9</h1>
        <h2>Firebase firestore</h2>
        <form onSubmit={handleSubmit(addFormNewDoc)}>
            <label htmlFor="title">Title</label>
            <input type='text' id='title' required {...register('title')}/>
            <br/>
            <label htmlFor="author">Author</label>
            <input type='text' id='author' required {...register('author')} />
            <br/>
            
            <button>add a new book</button>
        </form>
        <DevTool control={control}/>        
  
        <hr/>

        <form onSubmit={handleSubmitDel(deleteFormNewDoc)} >
        <label htmlFor="id">Document id:</label>
            <input type='text' id='id' required {...register('id')}/>

            <button>delete a book</button>
        </form>
        <hr/>
        <hr/>
        <hr/>

        <h1>Signing user up</h1>
        
        <h3>Email</h3>
        <input type="text" name='email' ref={emailRef}  />
        <h3>Password</h3>
        <input type="text" name='password' ref={passwordRef} />
        
          <button onClick={()=>signingUp(emailRef.current.value,passwordRef.current.value)} >Sign Up</button>  

        </div>
  )
}

export default AddNewDocDB



/*
          // 1 way
           setUserSignIn({...userSignIn, [e.target.name] :e.target.value})
          //2 way useRef

*/