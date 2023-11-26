import React, { useContext, useEffect, useState } from "react";
import { getAdmins, setAdmin } from "../../firebaseShop";
import { userContext } from "../../App";
import ManagrtRow from "./ManagrtRow";

const ManagerPage = () => {
  const [addManagerInput, setAddManagerInput] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [allManagers, setAllManagers] = useState([]);
  const { user } = useContext(userContext);

  useEffect(()=>{
    setIsManager(isCurrentUserManager());
  },[user])
  const isCurrentUserManager=()=>{
    for (let i = 0; i < allManagers.length; i++) {
      if(user?.email == allManagers[i])return true;

    }
      return false;
    }
  
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
    //TODO: add here sort by a,b,c
    let currentManagers = await getAdmins();
    let newArr = Object.keys(currentManagers);
    newArr = sortManagers(newArr)
    setAllManagers(newArr);
  };

  const handleInputAddManagerChange = (e)=>{
    setAddManagerInput(e.target.value)
  }
  const handleButtonAddManager = ()=>{
    setAdmin(addManagerInput)
    alert(addManagerInput, " - added");
    setAddManagerInput("");
    getAllManagersArr()
  }
  
  // Sorting the array alphabetically
  const sortManagers = (arr) => {
    const sortedManagers = [...arr].sort((a, b) => a.localeCompare(b));
    return sortedManagers;
  };


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
            <h3>Add & Delete Product</h3>
            <button onClick={()=>{console.log("isCurrentUserManager",isCurrentUserManager())}} >print user</button>

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
