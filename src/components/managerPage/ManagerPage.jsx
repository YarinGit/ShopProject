import React, { useContext, useEffect, useState } from "react";
import { addProduct, getAdmins, getAllProdacts, removeProduct, setAdmin } from "../../firebaseShop";
import { productConext, userContext } from "../../App";
import ManagrtRow from "./ManagrtRow";
import { Input } from "@mui/material";

const ManagerPage = () => {
  const [addManagerInput, setAddManagerInput] = useState("");
  const [addProductTitleInput, setAddProductTitleInput] = useState("");
  const [addProductCategoryInput, setAddProductCategoryInput] = useState("");
  const [addProductDescriptionInput, setAddProductDescriptionInput] = useState("");
  const [addProductImageInput, setAddProductImageInput] = useState("");
  const [serchForDeleteInput, setSerchForDeleteInput] = useState("");
  const [addProductPriceInput, setAddProductPriceInput] = useState(0);
  const [isManager, setIsManager] = useState(true);
  const [allManagers, setAllManagers] = useState([]);
  const {productsArr} = useContext(productConext);
  const { user } = useContext(userContext);

  // Determines if current user can be in manager page
  // useEffect(()=>{
  //   setIsManager(isCurrentUserManager());
  // },[user])
  // const isCurrentUserManager=()=>{
  //   for (let i = 0; i < allManagers.length; i++) {
  //     if(user?.email == allManagers[i])return true;
  //   }
  //     return false;
  //   }
  
  useEffect(() => {
    getAllManagersArr();
    console.log("isUserManager ->", isUserManager());
  }, []);

  const onManagerDeleted = () => {
    getAllManagersArr()
  }
  const isUserManager = () => {
    console.log(allManagers);
  };

  const getAllManagersArr = async () => {
    let currentManagers = await getAdmins();
    let newArr = Object.keys(currentManagers);
    newArr = sortManagers(newArr)
    setAllManagers(newArr);
  };

  const handleInputAddManagerChange = (e)=>{
    setAddManagerInput(e.target.value)
  }
  const handleAddProductTitleInput = (e)=>{
    setAddProductTitleInput(e.target.value)
  }
  const handleAddProduCtategoryInput = (e)=>{
    setAddProductCategoryInput(e.target.value)
  }
  const handleAddProduDescriptionInput = (e)=>{
    setAddProductDescriptionInput(e.target.value)
  }
  const handleAddProduImageInput = (e)=>{
    setAddProductImageInput(e.target.value)
  }
  const handleAddProduPriceInput = (e)=>{
    setAddProductPriceInput(e.target.value)
  }
  const handleAddProductButton=async()=>{
    await addProduct(addProductTitleInput,
      addProductCategoryInput,
      addProductDescriptionInput,
      addProductImageInput,
      addProductPriceInput);
  }
  const handleButtonAddManager = ()=>{
    setAdmin(addManagerInput.toLowerCase())
    alert(addManagerInput, " - added");
    setAddManagerInput("");
    getAllManagersArr()
  }
  
  // Sorting the array alphabetically
  const sortManagers = (arr) => {
    const sortedManagers = [...arr].sort((a, b) => a.localeCompare(b));
    return sortedManagers;
  };
  const handelePrintUserBtn = async(arr) => {
    return await getAllProdacts()
  }
  const handleDeleteForDeletefunction = (e)=>{
    setSerchForDeleteInput(e.target.value);
  }
  const handleDeleteForDeleteButton=()=>{
    console.log(serchForDeleteInput);
    // let idOfProductToDelete = 0;
    // for (let i = 0; i < productsArr.length; i++) {
    //   if (productsArr[i].id == serchForDeleteInput) {
    //     idOfProductToDelete = i;
    //     break;
    //   }
    // }
    // console.log("idOfProductToDelete -> ", idOfProductToDelete);
    if (serchForDeleteInput <= 0) {
      alert("Product dosnt exist");
      return
    }
    removeProduct(serchForDeleteInput)
  }

  return (
    <div>
      {isManager ? (
        <div className="isTrue">
          <div className="Manager">
            <h3>Add & Delete Manager</h3>
            <Input type="text" onChange={handleInputAddManagerChange} value={addManagerInput}/>
            <button onClick={handleButtonAddManager} >Add manager</button>
            <hr/>
            {allManagers.map((item, index)=> <ManagrtRow email={item} deleteFunction={onManagerDeleted} key={index}/>)}
            <hr/>
          </div>
            <hr/>
          <div className="Product">
            <h2>Add & Delete Product</h2>

            <h3>Add product</h3>

            <Input placeholder="Title:" value={addProductTitleInput} type="text" onChange={handleAddProductTitleInput} />

            <Input placeholder="Category:" value={addProductCategoryInput} type="text" onChange={handleAddProduCtategoryInput} />

            <Input placeholder="Description:" value={addProductDescriptionInput} type="text" onChange={handleAddProduDescriptionInput} />

            <Input placeholder="Image:" value={addProductImageInput} type="text" onChange={handleAddProduImageInput} />

            <Input placeholder="Price:" value={addProductPriceInput} type="number" onChange={handleAddProduPriceInput} />

            <button onClick={handleAddProductButton} >Add Product</button>

            <button onClick={()=>{
              getAllProdacts().then(data=>{
                console.log("data",data)})}} >print Products</button>

            <h3>Delete product</h3>
            <Input type="text" name="DeleteForDelete" onChange={handleDeleteForDeletefunction} value={serchForDeleteInput} placeholder="Delete by ID" />
            <button onClick={handleDeleteForDeleteButton} >Delete</button>
          </div>
        </div>
      ) : (
        <div className="isFasle">
          <h1>Sory you cant be here</h1>
        </div>
      )}
    </div>
  );
};



export default ManagerPage;
