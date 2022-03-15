import React from "react";
import "./cartsingleitem.css";
import bookCover from "../assests/bookCover.jpg";
import { useDispatch } from "react-redux";
import { addToCartReduxAction,delFromCartReduxAction ,decFromCartReduxAction} from "../Redux/cartActions";

export default function CartSingleItem({product}) {
  const dispatch = useDispatch();
 // in addTiCartRedux - require image:images[0]; so providing that
 // to use in dispatch
               // copy of product
               let productCopy = {...product};
               productCopy.images=[product.image];
               // changing product name to productName 
               productCopy.name = product.productName;
               productCopy._id = product.id;

               // tro understand these check addtoCartReduxAction and our actual product object (mongodb)
     
  return (
    <div className="CartSingleItemContainer">
        <div className="cartItemDeleteBtn" onClick={()=>
          dispatch(delFromCartReduxAction(productCopy))
        }><img src="https://img.icons8.com/fluency/28/000000/filled-trash.png"/></div>
      <img className="imageCartSingleItem" src={product.productImage[0].public_url} alt="loading" />
      <div className="CartSingleItemDetailsContainer">
        <div className="TitleItemCartSingleItem">{product.productName}</div>
        <div className="cartSingleCartPriceAndQuantityContainer">
          <div className="CartSingleItemPrice">{product.price} ₹ </div>
          <div className="CartSingleItemQuantityBox">
            <div className="cartSingleItemQuantityIncrease" onClick={
              ()=> dispatch(addToCartReduxAction(productCopy))
              }
              ><img src="https://img.icons8.com/fluency/28/000000/add.png"/></div>
            <div className="CartSingleItemCurrentQuantity">{product.quantity}</div>
            <div className="cartSingleItemQuantityDecrease" onClick={()=>
                dispatch(decFromCartReduxAction(productCopy))  
          }
            ><img src="https://img.icons8.com/fluency/28/000000/minus.png"/></div>
          </div>
        </div>
      </div>
    </div>
  );
}
