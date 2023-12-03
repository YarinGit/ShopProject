import React, { useContext, useEffect, useState } from "react";
import { addProduct, getAdmins, getAllProdacts, setAdmin } from "../../firebaseShop";
import { userContext } from "../../App";
import ManagrtRow from "./ManagrtRow";

const ManagerPage = () => {
  const [addManagerInput, setAddManagerInput] = useState("");
  const [addProductTitleInput, setAddProductTitleInput] = useState("");
  const [addProductCategoryInput, setAddProductCategoryInput] = useState("");
  const [addProductDescriptionInput, setAddProductDescriptionInput] = useState("");
  const [addProductImageInput, setAddProductImageInput] = useState("");
  const [addProductPriceInput, setAddProductPriceInput] = useState(0);
  const [isManager, setIsManager] = useState(true);
  const [allManagers, setAllManagers] = useState([]);
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
  const handleAddProductButton=()=>{
    addProduct(addProductTitleInput,
      addProductCategoryInput,
      addProductDescriptionInput,
      addProductImageInput,
      addProductPriceInput)
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

  return (
    <div>
      {isManager ? (
        <div className="isTrue">
          <div className="Manager">
            <h3>Add & Delete Manager</h3>
            <input type="text" onChange={handleInputAddManagerChange} value={addManagerInput}/>
            <button onClick={handleButtonAddManager} >Add manager</button>
            <hr/>
            {allManagers.map((item, index)=> <ManagrtRow email={item} deleteFunction={onManagerDeleted} key={index}/>)}
            <hr/>
              {/* <button onClick={() => {console.log("isUserManager ->", isUserManager());}}>Log managers</button> */}
              {/* <button onClick={() => {console.log("setAdmin ->",setAdmin("aaaa@gmail.com"));}}>Log setAdmin</button> */}
              {/* <button onClick={getAllManagersArr}>Get managers</button> */}
              {/* <button onClick={getAdmins}>adminssssssss</button> */}
          </div>
            <hr/>
          <div className="Product">
            <h2>Add & Delete Product</h2>

            <h3>Add product</h3>

            <h4>Title:</h4>
            <input value={addProductTitleInput} type="text" onChange={handleAddProductTitleInput} />

            <h4>Category:</h4>
            <input value={addProductCategoryInput} type="text" onChange={handleAddProduCtategoryInput} />

            <h4>Description:</h4>
            <input value={addProductDescriptionInput} type="text" onChange={handleAddProduDescriptionInput} />

            <h4>Image:</h4>
            <input value={addProductImageInput} type="text" onChange={handleAddProduImageInput} />

            <h4>Price:</h4>
            <input value={addProductPriceInput} type="number" onChange={handleAddProduPriceInput} />

            <button onClick={handleAddProductButton} >Add Product</button>

            <button onClick={()=>{
              getAllProdacts().then(data=>{
                console.log("data",data)})}} >print Products</button>

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
