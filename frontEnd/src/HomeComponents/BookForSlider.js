import './bookforslider.css'
import React from 'react'
import bookCover from '../assests/bookCover.jpg'
export default function BookForSlider() {
  return (
    <div className='bookforsliderBox'>
        <img src={bookCover} alt="loading" className='bookCoverforSlider' />
        <div className="bookTitleForSlider">The World of Abstract Art</div>
        <div className="priceForbookSlider">500 ₹</div>
        
    </div>
  )
}
