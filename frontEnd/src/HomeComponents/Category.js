import React from 'react'
import { Link } from 'react-router-dom'
import './category.css'
export default function Category({category,active}) {
   
  return (
    <Link to={`/products/${category}`} >
          <div className={`SingleCategoryMain ${(active==category)?"activeCategory":""}`}>
      <div ><img className="categoryLogo" src="https://img.icons8.com/ios/50/000000/robot-3.png"/></div>
      <div className='categoryName'> {category}</div>
    </div>
    </Link>
  )
}
