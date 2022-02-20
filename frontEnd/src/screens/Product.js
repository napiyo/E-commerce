import React, { useEffect, useState } from 'react'
import bookCover from '../assests/bookCover.jpg'
import './product.css';
import { useParams } from "react-router-dom";


import api from '../config/axiosApi';

export default function Product() {
  // useParams 
  const productId = useParams().id;
  const [loading, setloading] = useState(true)
  const [product, setproduct] = useState({});
  useEffect(() => {
      api.get(`/api/v1/products/${productId}`).then((res)=>{
        setproduct(res.data);
      
        setloading(false);
      }).catch((err)=>{
        console.log(err.message);
      })
   }, [])
   
   if(loading){
    return <>
    <div className="loaderContainer">
      <div className="loader">
  
      </div>
    </div>
    </>
  }
  else{
  return (
    <div className='singleProductContainer'>
        <div className="productImagesAndBtns">
                <img src={bookCover} alt="Loading" className='ImageForSingleProduct' />
                <div className="btnsSignleProduct">
                <button className='buyBtn' style={{padding:'10px 20px'}}><img className='buyNowIcon' src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-buy-ecommerce-kiranshastry-gradient-kiranshastry-1.png"/>Buy Now</button>
              <button className='addToCartBtn' style={{padding:'10px 20px'}}> <img className='addToCartBtnIcon' src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-cart-essentials-icongeek26-flat-icongeek26.png"/>Add to cart</button>
                    
                </div>
        </div>
<div className="ProductInfoSingleProduct">
   <h3 className='TitleSingleProduct' style={{fontWeight:400}}>{product.name}</h3>
   <div className="rattingSingleProduct"> <span className='backgroundRattingForSingleProduct'>{product.avgRatings}<img src="https://img.icons8.com/material-rounded/16/ffffff/star--v1.png"/></span>
   ({product.numOfReviews} rattings) </div>
   <div className="priceForbookSlider">{product.price} ₹</div>
   {/* <h3 className="heading">Compare Prices</h3>
   <table>
       <tr>
           <td  className='headerTablePriceCompareSingleProduct'>site</td>
           <td  className='headerTablePriceCompareSingleProduct'>Price</td>
       </tr>
       <tr>
           <td>flipkart</td>
           <td>999 ₹</td>
       </tr>
       <tr>
           <td>flipkart</td>
           <td>999 ₹</td>
       </tr>
   </table> */}
   <div className="ProductDiscriptionForSingleProduct">
        <h3 >Product Description</h3>
        <hr />
        <p>{product.description}</p>  </div>
  </div>
    </div>
  )
}
}
