import React, { useEffect, useState } from 'react'
import bookCover from '../assests/bookCover.jpg'
import './product.css';
import { useParams } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Rating, Snackbar, TextField} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCartReduxAction } from '../Redux/cartActions';
import api from '../config/axiosApi';
import Review from '../allproductsListComponents/review';
// import {queryString} from 'querystring'
import {stringify} from 'query-string'
import MyBackDrop from '../utils/backDrop';
import { useAlert } from 'react-alert';

export default function Product() {
  // useParams 
  
  const productId = useParams().id;
  const [loading, setloading] = useState(true)
  const [product, setproduct] = useState({});
  const [reviewUpdated, setreviewUpdated] = useState(false)
  const [processing, setprocessing] = useState(false)
  
  //alert
   const alert = useAlert();

  // write user review
  const [dialogOpen, setdialogOpen] = useState(false)
 const [rattingByuser, setrattingByuser] = useState(0);
 const [productReviewByUser, setproductReviewByUser] = useState("")

 const handleDialog = ()=>{
   setdialogOpen((dialogOpen)?false:true);
 }
// upload review
const writeReview = ()=>{
  setprocessing(true);
  if(rattingByuser==0){ setrattingByuser(1)}
   const review = {
     ratting:rattingByuser,
     comment:productReviewByUser
   }
    
    api.post(`/api/v1/products/addReview/${productId}`,review).then((res)=>{
      setprocessing(false);
      console.log(res.data);
      handleDialog();
      setreviewUpdated(true)
      alert.success("review updated");
      
    }).catch((err)=>{
      // handleDialog();
      setprocessing(false);
      alert.error(err.response.data.message || "something went wrong");
      
     
      
    })
    setreviewUpdated(false);
}

  useEffect(() => {
      api.get(`/api/v1/products/${productId}`).then((res)=>{
        setproduct(res.data);
      
        setloading(false);
      }).catch((err)=>{
        console.log(err.message);
       
        
      })
   }, [reviewUpdated])
   

   const dispatch = useDispatch() ;

// add item to cart
const addtoCart =()=>{
   if(Object.keys(product).length === 0) return;

   dispatch(addToCartReduxAction(product));
   alert.success("product added or increased quantity to your cart")
}




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
    <>
    <div className='singleProductContainer'>
        <div className="productImagesAndBtns">
                <img src={product.images[0].public_url} alt="Loading" className='ImageForSingleProduct' />
                <div className="btnsSignleProduct">
                <button className='buyBtn' style={{padding:'10px 20px'}}><img className='buyNowIcon' src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-buy-ecommerce-kiranshastry-gradient-kiranshastry-1.png"/>Buy Now</button>
              <button className='addToCartBtn' onClick={addtoCart} style={{padding:'10px 20px'}}> <img className='addToCartBtnIcon' src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-cart-essentials-icongeek26-flat-icongeek26.png"/>Add to cart</button>
                    
                </div>
        </div>
<div className="ProductInfoSingleProduct">
   <h3 className='TitleSingleProduct' style={{fontWeight:400}}>{product.name}</h3>
   <div className="rattingSingleProduct"> <span className='backgroundRattingForSingleProduct'>{product.avgRatings}<img src="https://img.icons8.com/material-rounded/16/ffffff/star--v1.png"/></span>
   ({product.numOfReviews} rattings) </div>
   <div className="priceForbookSlider">{product.price} ₹</div>
  
   <div className="ProductDiscriptionForSingleProduct">
        <h3 >Product Description</h3>
        <hr />
        <p>{product.description}</p>  </div>
  </div>
    </div>
    <Divider />
  <p style={{marginLeft:'4vmax'}} >your feedback is very valuable for us - write / update your review for this product &nbsp; <Button variant='contained' onClick={handleDialog}>
    write/update review
    </Button></p> 

    <div className="writeReview">

    <Dialog open={dialogOpen} onClose={handleDialog} style={{zIndex:2}}>
        <DialogTitle>write / update review</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please share your feedBack about this product. your review is very important for us.
          </DialogContentText>
          <Divider style={{marginTop:'2vmax',marginBottom:'2vmax'}}/>
          <Rating
  name="simple-controlled"
  value={rattingByuser}
  onChange={(event, newValue) => {
    setrattingByuser(newValue);
    
  }}
  size='large'
/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="write your feedback"
            type="text"
            value={productReviewByUser}
            fullWidth
            multiline
            variant="standard"
            onChange={(e)=>setproductReviewByUser(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button onClick={writeReview}>submit</Button>
        </DialogActions>
      </Dialog>
      <Divider />
      {
        product.reviews.map((r)=>{
          return <Review id={r.userId} review={r} />
        })
      }
    </div>
   <MyBackDrop open={processing} />
    </>
  )
}
}
