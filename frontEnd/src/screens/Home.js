import React, { useEffect, useState } from 'react'
import api from '../config/axiosApi';
import CatagoriesBooks from '../HomeComponents/CatagoriesBooks';
import Slider from '../HomeComponents/slider';
import TrendingAuthors from '../HomeComponents/TrendingAuthors';
import TrendingBooks from '../HomeComponents/TrendingBooks';
import { useAlert } from 'react-alert'
import './home.css'
export default function Home() {
 
  const [allCategories, setallCategories] = useState([])
  const alert = useAlert()
  useEffect(() => {
   
    api.get("/api/v1/products/allCategories").then((res)=>{
      setallCategories(res.data.categories);
   
    }).catch((e)=>{
      
      alert.error(e.message);
    })
  }, [])
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
     
      </div>


    </div>
  )
}
