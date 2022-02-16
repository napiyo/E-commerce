import React from 'react'
import './bookbox.css'
import bookCover from '../assests/bookCover.jpg';
export default function BookBox() {
  return (
    <div className='bookBox'>
    <div className="bookCover" style={{backgroundImage:`url(${bookCover})`}}></div>
    <div className="bookInfo">
        <div className="bookTitle">The World of Abstract Art</div>
        <div className="author">By Emily Robbins</div>
        <div style={{margin:'3px 0'}}>

        <div className="starRatting">
        
        <img className='star' src="https://img.icons8.com/fluency/48/000000/hand-drawn-star.png"/>
        <img className='star' src="https://img.icons8.com/fluency/48/000000/hand-drawn-star.png"/>
        <img className='star' src="https://img.icons8.com/fluency/48/000000/hand-drawn-star.png"/>
        <img className='star' src="https://img.icons8.com/fluency-systems-regular/48/000000/hand-drawn-star--v1.png"/>
        <img className='star' src="https://img.icons8.com/fluency-systems-regular/48/000000/hand-drawn-star--v1.png"/>
        <span style={{fontSize:'12px',marginLeft:'5px'}}>
            (100+)
        </span>
        </div>
       
        </div>
        <div className="priceShow">
            699$
        </div>
        <div className="actionBtns">
            <button className='buyBtn'><img className='buyNowIcon' src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-buy-ecommerce-kiranshastry-gradient-kiranshastry-1.png"/>Buy Now</button>
            <button className='addToCartBtn'> <img className='addToCartBtnIcon' src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-cart-essentials-icongeek26-flat-icongeek26.png"/>Add to cart</button>
            
        </div>
    </div>
    </div>
  )
}
