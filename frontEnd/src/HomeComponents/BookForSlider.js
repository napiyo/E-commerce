import './bookforslider.css'
import React, { useEffect } from 'react'
import bookCover from '../assests/bookCover.jpg'
import { Link } from 'react-router-dom'
import Aos from "aos"
import 'aos/dist/aos.css'; 
export default function BookForSlider({product}) {
  useEffect(() => {
    Aos.init({duration:1000})
  }, [])
  
  return (
    <Link to={`/product/${product._id}`}>
    <div className='bookforsliderBox'  data-aos="flip-up">
        <img src={product.images[0].public_url} alt="loading" className='bookCoverforSlider' />
        <div className="bookTitleForSlider">{product.name}</div>
        <div className="priceForbookSlider">{product.price} ₹</div>
    </div>
    </Link>
  )
}
