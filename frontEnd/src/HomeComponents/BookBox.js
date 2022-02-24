import React, { useState } from 'react'
import './bookbox.css'
import bookCover from '../assests/bookCover.jpg';
import {Link, useNavigate} from 'react-router-dom';
import { Rating } from '@mui/material';
import {useDispatch} from 'react-redux'
import {addToCartReduxAction} from '../Redux/cartActions'
export default function BookBox({product}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [addedToCart, setaddedToCart] = useState(false)
  const toProduct=()=>{
navigate('/product/'+product._id);
  }
  return (
 <div className='bookBox' >
    <div className="bookCover" onClick={toProduct}  style={{backgroundImage:`url(${bookCover})`}}></div>
    <div className="bookInfo">
        <div className="bookTitle">{product.name}</div>
        <div className="author">{product.author}</div>
        <div style={{margin:'3px 0'}}>
        <div className="starRatting">
    
      {/* <img className='star' alt="stars" src="https://img.icons8.com/ios-filled/50/000000/star--v1.png"/> */}
      <Rating name="read-only" value={product.avgRatings}  precision={0.1} readOnly />
        <span style={{fontSize:'12px',marginLeft:'5px'}}>
            ({product.numOfReviews})
        </span>
        </div>
       
        </div>
        <div className="priceShow">
            {product.price} ₹
        </div>
        <div className="actionBtns">
            <button className='buyBtn'><img className='buyNowIcon' src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-buy-ecommerce-kiranshastry-gradient-kiranshastry-1.png"
            alt="loading"/>Buy Now</button>
            <button className='addToCartBtn' onClick={()=>
            dispatch(addToCartReduxAction(product))
          }> <img className='addToCartBtnIcon' src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-cart-essentials-icongeek26-flat-icongeek26.png"
            alt="loading"/>Add to cart</button>
            
        </div>
    </div>
    </div>

  )
}
