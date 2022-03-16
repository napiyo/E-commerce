import { Button, Divider } from '@mui/material'
import  { Delete } from '@mui/icons-material'
import React from 'react'
import './review.css'
import { useSelector } from 'react-redux'
import api from '../config/axiosApi'
import { useAlert } from 'react-alert'
export default function Review({review,productId,setreviewUpdated,reviewUpdated}) {
  const userState = useSelector((state) => state.UserReducer);
  const alert = useAlert();
  const deleteReview=()=>{
  
    const body ={reviewUserId:review.userId}
    api.post(`/api/v1/products/deleteReview/${productId}`,body).then((res)=>{
      alert.success("review deleted");
      // to update page
      setreviewUpdated(!reviewUpdated)
    }).catch((e)=>{
      (e.response)?alert.error(e.response.data.message):alert.error("unable to delete review");
    })
  }
  return (
    <div className='singleReviewContainer'>
        <div className='upperSingleReviewContainer'>
        <div className="rattingSingleProduct">{review.name.toUpperCase()}{"  "}<span className='backgroundRattingForSingleProduct'>
            {review.ratting}<img src="https://img.icons8.com/material-rounded/16/ffffff/star--v1.png"/></span>
        </div>
       {(userState.role==="admin")?<Button startIcon={<Delete
         /> } variant='outlined' onClick={deleteReview}>Delete</Button>:""
        }
        </div>
        <Divider style={{margin:5}} />
        <div className="reviewComment">
            {review.comment}
        </div> 
    </div>
  )
}