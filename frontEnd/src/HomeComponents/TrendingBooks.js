import React, { useEffect, useRef, useState } from 'react'
import BookBox from './BookBox'
import Aos from "aos"
import 'aos/dist/aos.css'; 
import './trendingBooks.css'
import api from '../config/axiosApi';
import {Skeleton} from '@mui/material'
import { useAlert } from 'react-alert';
export default function TrendingBooks() {

  // set loader animation
  
  const [trendingProducts, settrendingProducts] = useState([])

// make trending books scrollable with mouse drag
// const slider = document.querySelector(".trendingSlider");
const alert = useAlert()
const sliderRef= useRef(null);
  useEffect(() => {
    Aos.init({duration:2000})
    
    api.get("/api/v1/products/topSellingProducts/7").then((res)=>{
      settrendingProducts(res.data.products);

    const slider = sliderRef.current
    enableMouseDragSlider(slider)
  

    }).catch((e)=>{
      alert.error(e.message)
    })
  }, [])



  const enableMouseDragSlider = (slider)=>{
    let mouseDown = false;
let startX, scrollLeft;

let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};
let stopDragging = function (event) {
  mouseDown = false;
};

slider.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
});

// Add the event listeners
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);

}


  return (
    <div className='mainContainer'> 

        <h3 className='heading'>Trending Books</h3>
        <div className="trendingSlider" ref={sliderRef} data-aos="fade-left">
         { (trendingProducts.length==0)?
         <>
         <Skeleton  height={'25em'} className='bookBox' style={{marginTop:'-60px',marginBottom:'-50px'}}/>
         <Skeleton  height={'25em'} className='bookBox' style={{marginTop:'-60px',marginBottom:'-50px'}}/>
         <Skeleton  height={'25em'} className='bookBox' style={{marginTop:'-60px',marginBottom:'-50px'}}/>
        
         
         </>
         
         :
           trendingProducts.map((p)=>{
             return  <BookBox product={p} key={p._id}/>
           })
         }
            
           
        
        </div>
    </div>
  )

}