import React from 'react'
import bookCover from '../assests/bookCover.jpg'
import './product.css'
export default function Product() {
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
   <h3 className='TitleSingleProduct' style={{fontWeight:400}}>The World of abstract art</h3>
   <div className="rattingSingleProduct"> <span className='backgroundRattingForSingleProduct'>4.6<img src="https://img.icons8.com/material-rounded/16/ffffff/star--v1.png"/></span>
   (400+ rattings) </div>
   <div className="priceForbookSlider">699 ₹</div>
   <h3 className="heading">Compare Prices</h3>
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
   </table>
   <div className="ProductDiscriptionForSingleProduct">
        <h3 >Product Description</h3>
        <hr />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi culpa quisquam dolorum suscipit placeat illo et? Impedit nobis sunt doloremque optio! Quisquam voluptatum nisi pariatur nam illo! Ullam, non in fugit commodi cupiditate cum error ratione, blanditiis et, deleniti provident. Nam numquam dignissimos nesciunt. Nesciunt quaerat aliquam et culpa delectus similique quidem suscipit eaque rem quia quis, perspiciatis sequi. Ratione modi, vel voluptatem dignissimos distinctio commodi? Voluptas cumque, beatae necessitatibus aperiam culpa repellendus est expedita neque dicta! Aliquam, natus voluptatum saepe, doloremque sunt ea tenetur hic quis voluptas inventore voluptate ullam est explicabo, commodi distinctio eius animi atque repellat blanditiis.</p>
   </div>
  </div>
    </div>
  )
}
