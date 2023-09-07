import React, { useEffect, useState } from "react";
import { getAdminPassword } from "../firebaseShop";

const ManagerPage = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isManager, setIsManager] = useState(false);
  const handleChangePassword = (event) => {
    setInputPassword(event.target.value);
    if(adminPassword == event.target.value){
      setIsManager(true)
      alert("Welcome Manager")
    }
    
  };
  getAdminPassword().then((password) => {
    setAdminPassword(password);
  });
  const handleButton = () => {};

  return (
    <div>
      {isManager ? 
              (<div className="isTrue">

              </div>)
 : 
 (<div className="isFasle">
 <input type="text" onChange={handleChangePassword} value={inputPassword}/>
 <button onClick={handleButton}>pres me</button>
</div>)
      }
    </div>
  );
};

export default ManagerPage;
