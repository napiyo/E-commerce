import React from 'react'
import CatagoriesBooks from '../HomeComponents/CatagoriesBooks'
import './allproducts.css'
import BookForSlider from '../HomeComponents/BookForSlider'
export default function AllProducts() {
  return (
    <div>
        <CatagoriesBooks type="HorizontalScroller"/>
            <h3 className="heading">Science Fiction</h3>
        <div className='AllProductsContainer'>
          <div className="sideBarForAllProducts"> sideBar</div>
          <div className="AllproductsList">
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
            <BookForSlider />
          </div>
        </div>
    </div>
  )
}
