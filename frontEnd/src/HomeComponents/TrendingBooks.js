import React, { useEffect, useRef, useState } from 'react'
import BookBox from './BookBox'
import Aos from "aos"
import 'aos/dist/aos.css'; 
import './trendingBooks.css'
import api from '../config/axiosApi';
export default function TrendingBooks() {

  // set loader animation
  const [loading, setloading] = useState(true)
  const [trendingProducts, settrendingProducts] = useState([])

// make trending books scrollable with mouse drag
// const slider = document.querySelector(".trendingSlider");
const sliderRef= useRef(null);
  useEffect(() => {
    Aos.init({duration:2000})
    // const data = await axios.get("http://localhost:4500/api/v1/products/topSellingProducts");
    // console.log(data);
    
    api.get("/api/v1/products/topSellingProducts/7").then((res)=>{
      settrendingProducts(res.data.products);
    setloading(false)
    const slider = sliderRef.current
    enableMouseDragSlider(slider)
  

    }).catch((e)=>{
      console.log(e.message);
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
    <div className='mainContainer'> 

        <h3 className='heading'>Trending Books</h3>
        <div className="trendingSlider" ref={sliderRef} data-aos="fade-left">
         {
           trendingProducts.map((p)=>{
             return  <BookBox product={p} key={p._id}/>
           })
         }
            
           
        
        </div>
    </div>
  )
}
}