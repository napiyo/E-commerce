import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../config/axiosApi';
import BookForSlider from '../HomeComponents/BookForSlider';
import CatagoriesBooks from '../HomeComponents/CatagoriesBooks';
import Slider from '../HomeComponents/slider';
import TrendingAuthors from '../HomeComponents/TrendingAuthors';
import TrendingBooks from '../HomeComponents/TrendingBooks';
import './home.css'
export default function Home() {
  const [loading, setloading] = useState(true)
  const [allCategories, setallCategories] = useState([])

  useEffect(() => {
    // const data = await axios.get("http://localhost:4500/api/v1/products/topSellingProducts");
    // console.log(data);
  
    
    api.get("/api/v1/products/allCategories").then((res)=>{
      setallCategories(res.data.categories);
    setloading(false)
    }).catch((e)=>{
      console.log(e.message);
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
  return (
    <div>
       
    <div style={{width:'100%'}}  ><TrendingBooks /></div>
    <div className='welcomeBottom'>
    <div className='catagoriesSection'><CatagoriesBooks type={(window.innerWidth < 600)?"HorizontalScroller":""}/></div>
    <div className='topauthorsSection'><TrendingAuthors/></div>
    </div>
    <div >

     {
       allCategories.map((category) => <Slider category={category} key={category}/> )}
      {/* dummy for demo  */}
      {/* <h3 className='heading'>/product /products /admin</h3>
      <div className="slider">
        <Link to={'/product'}><BookForSlider/></Link>
        <Link to={'/products'}><BookForSlider/></Link>
        <Link to={'/admin'}><BookForSlider/></Link>
       
      </div>
       */}
    
      </div>

    </div>
  )
}
