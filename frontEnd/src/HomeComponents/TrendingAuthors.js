import './trendingAuthor.css';
import React, { useEffect, useState } from 'react'
import Author from './Author';
import api from '../config/axiosApi'
import { useAlert } from 'react-alert'
export default function () {
  const alert = useAlert()
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
   }).catch((e)=>{
    alert.error(e.message)
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
