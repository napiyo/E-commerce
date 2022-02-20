import './catagoriesbooks.css'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import api from '../config/axiosApi'

export default function CatagoriesBooks(props) {
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
return (<>
    <h3 className='heading'>All Categories</h3>
 <div className='categoriesWelcomePage' style={{overflowX:(props.type=='HorizontalScroller')?'auto':'hidden',flexWrap:(props.type=='HorizontalScroller')?'nowrap':'wrap'}}>
   {
     allCategories.map((category) => <Category key={category} category={category} active={props.active}/>)
   }

    </div>
  </>
  )
}
