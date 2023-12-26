import React, { useContext } from "react";
import "./boxProduct.css";
import { TbShoppingCartPlus } from "react-icons/tb";
import { ShopContext } from "../../context/ShopContext";

const BoxProdact = ({ title, description, image, price, id }) => {
  let maxLengthDescription = 350;
  // if (typeof(price) !="number") {
  //   console.log("typeof(price)", typeof(price));
  //   price = 0;
  // }
  if ( typeof(description) == typeof("") && description != "") {
  description = description.slice(0,maxLengthDescription);
  }

  const { addToCart } = useContext(ShopContext);
  return (
    <div className="productBox">
      <div className="top">
        <h1 className="title">{title}</h1>
        <img src={image} alt={title} />
      </div>
      <div className="descriptionDiv">
        <p className="description">{description}</p>
      </div>

      <div className="buttom">
        <span className="price">{price} &#8362;</span>
        <div
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            addToCart(id);
          }}>
          <a href="#">
            <TbShoppingCartPlus color="text-black-50" size={35} />
          </a>
        </div>
        <p> id {id}</p>
      </div>
    </div>
  );
};

export default BoxProdact;

/*
        בשביל לראות איך היה הclassname
    <div className="casing">
      <h1>{title}</h1>
      <img src={image[0]} alt={title} />
      <p>{description}</p>
      <h3>{price}</h3>
      <div className="addToBasket">
        <a href="#"> <TbShoppingCartPlus color="text-black-50" size={35}/></a>
      </div>
    </div>

*/
