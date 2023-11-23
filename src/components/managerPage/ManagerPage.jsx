import React, { useContext, useEffect, useState } from "react";
import { getAdmins, setAdmin } from "../../firebaseShop";
import { userContext } from "../../App";
import ManagrtRow from "./ManagrtRow";

const ManagerPage = () => {
  const [addManagerInput, setAddManagerInput] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isManager, setIsManager] = useState(true);
  const [allManagers, setAllManagers] = useState({});
  const { user } = useContext(userContext);

  useEffect(() => {
    handleGetPressed();
    console.log("isUserManager ->", isUserManager());
  }, []);

  const isUserManager = () => {
    console.log(allManagers);
  };

  const handleGetPressed = async () => {
    let currentManagers = await getAdmins();
    console.log("currentManagers handleGetPressed ->", currentManagers);
    setAllManagers(currentManagers);
  };

  const handleInputAddManagerChange = (e)=>{
    setAddManagerInput(e.target.value)
  }
  const handleButtonAddManager = ()=>{
    console.log(addManagerInput);
  }
  
  const showAllmanagers=()=>{
    for (let i = 0; i < allManagers.length; i++) {
      console.log(i);      
    }
  }

  return (
    <div>
      {isManager ? (
        <div className="isTrue">
          <div className="Manager">
            <h3>Add ManagerChange</h3>
            <input type="text" onChange={handleInputAddManagerChange} value={addManagerInput}/>
            <button onClick={handleButtonAddManager} >Add manager</button>
            <hr/>
            {
              //! לעשות פה שיציג את כל המנהלים -> אי אפשר עם מאפ בגלל שהמשתנה לא מערך
              // showAllmanagers()
            }
            <ManagrtRow/>
            <hr/>
              <button onClick={() => {console.log("isUserManager ->", isUserManager());}}>Log managers</button>
              <button onClick={() => {console.log("setAdmin ->",setAdmin(allManagers, "aaaa@gmail.com"));}}>Log setAdmin</button>
              <button onClick={handleGetPressed}>Get managers</button>
              <button onClick={getAdmins}>adminssssssss</button>
          </div>
          <div className="Product">


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
