import './trendingAuthor.css';
import React, { useEffect, useState } from 'react'
import Author from './Author';
import api from '../config/axiosApi'
export default function () {
  const [topAuthors, settopAuthors] = useState([]);
  const [loading, setloading] = useState(true)
  useEffect(() => {
   api.get("/api/v1/products/topSellingProducts/3").then((res)=>{
    let arr =[];    
    res.data.products.forEach(element => {
          arr.push(element.author);
        });
    settopAuthors(arr);   
  
    setloading(false)
   }).catch((err)=>{
     console.log(err.message);
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
    <div style={{maxHeight:'300px'}}>
        <h3 className="heading">
            Top Authors
        </h3>
            <div className="authorList">
            {
              
              topAuthors.map((a)=> <Author author={a} />)
              
            }
             
               </div>
        
    </div>
  )
}
