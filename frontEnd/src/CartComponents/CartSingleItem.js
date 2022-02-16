import React from "react";
import "./cartsingleitem.css";
import bookCover from "../assests/bookCover.jpg";
export default function CartSingleItem() {
  return (
    <div className="CartSingleItemContainer">
        <div className="cartItemDeleteBtn"><img src="https://img.icons8.com/fluency/28/000000/filled-trash.png"/></div>
      <img className="imageCartSingleItem" src={bookCover} alt="loading" />
      <div className="CartSingleItemDetailsContainer">
        <div className="TitleItemCartSingleItem">the world of abstarct art</div>
        <div className="cartSingleCartPriceAndQuantityContainer">
          <div className="CartSingleItemPrice">699 ₹ </div>
          <div className="CartSingleItemQuantityBox">
            <div className="cartSingleItemQuantityIncrease"><img src="https://img.icons8.com/fluency/28/000000/add.png"/></div>
            <div className="CartSingleItemCurrentQuantity">5</div>
            <div className="cartSingleItemQuantityDecrease"><img src="https://img.icons8.com/fluency/28/000000/minus.png"/></div>
          </div>
        </div>
      </div>
    </div>
  );
}
