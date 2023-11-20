import React, { useContext, useEffect, useState } from "react";
import { getCollectionByName, setAdmin } from "../firebaseShop";
import { userContext } from "../App";

const ManagerPage = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isManager, setIsManager] = useState(true);
  const [allManagers, setAllManagers] = useState({});
  const {user} = useContext(userContext)

  useEffect(()=>{
    handleGetPressed();
    console.log("isUserManager ->" ,isUserManager());
  },[])

  const isUserManager = ()=>{
      console.log(allManagers);
    // allManagers.array.forEach(manager => {
    //   if(user.email == manager)return true});
    //   return false;
  }

  const handleGetPressed = async()=>{
    setAllManagers(await getCollectionByName("admins"));
    console.log("allManagers", allManagers)
  }
  return (
    <div>
      {isManager ? 
              (<div className="isTrue">
                <div className="addManager">
                  <button onClick={()=>{console.log("isUserManager ->" ,isUserManager())}}>Log managers</button>
                  <button onClick={()=>{console.log("setAdmin ->" ,setAdmin(allManagers,"david@gmail.com"))}}>Log setAdmin</button>
                  <button onClick={handleGetPressed}>Get managers</button>
                  
                </div>
                <div className="removeManager">

                </div>
                <div className="addNewProduct">

                </div>
                <div className="removeProduct">

                </div>
              </div>)
 : 
 (<div className="isFasle">
<h1>Sory you cant be here</h1>
</div>)
      }
    </div>
  );
};

export default ManagerPage;
