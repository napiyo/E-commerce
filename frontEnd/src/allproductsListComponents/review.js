import { Divider } from '@mui/material'
import React from 'react'
import './review.css'
export default function Review({review}) {
  return (
    <div className='singleReviewContainer'>
        
        <div className="rattingSingleProduct"> {review.name.toUpperCase()}{"  "}<span className='backgroundRattingForSingleProduct'>
            {review.ratting}<img src="https://img.icons8.com/material-rounded/16/ffffff/star--v1.png"/></span>
        </div>
        <Divider style={{margin:5}} />
        <div className="reviewComment">
            {review.comment}
        </div>
    </div>
  )
}
