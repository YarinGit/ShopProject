import "./css/Box.css";
import { myContext } from "./BasicPage";
import { useContext } from "react";

const Box = ({ name, price, imag }) => {
  let message = useContext(myContext);
  return (
    <div className="container">
      <h1>{name}</h1>
      <div className="test">
        <img src={imag} className="img-thumbnail" alt={name} />
      </div>
      <h2>The price is: {price}</h2>

      <h1>{message}</h1>
      
    </div>
  );
};

export default Box;
