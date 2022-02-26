import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../config/axiosApi'
import BookForSlider from './BookForSlider'
import './slider.css'
import Aos from "aos"
import 'aos/dist/aos.css'; 
import { useAlert } from 'react-alert'
export default function Slider({category}) {
    const [loading, setloading] = useState(true)
    const [products, setproducts] = useState([])
    const alert = useAlert()
    useEffect(() => {
      Aos.init({duration:1000})
      // const data = await axios.get("http://localhost:4500/api/v1/products/topSellingProducts");
      // console.log(data);
      
      api.get(`/api/v1/products?category=${category}&page=1`).then((res)=>{
        
        
        setproducts(res.data.products);
      setloading(false)
    
  
      }).catch((e)=>{
        alert.error(e.message);
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

    // category=category.toUpperCase();
  return (
      <div>
      <Link to={`/products/${category}`}><h3 className='heading'>{category.toUpperCase()} <span style={{fontWeight:400,fontSize:14,marginLeft:'1rem'}}> view all</span></h3></Link>
    <div className="slider"  data-aos="fade-right">
        {
            products.map((p)=><Link to={`/product/${p._id}`}><BookForSlider key={p._id} product={p}/></Link> )
        }
      
      </div>
    </div>
  )
}
