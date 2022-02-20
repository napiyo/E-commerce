import React, { useEffect, useState } from 'react'
import CatagoriesBooks from '../HomeComponents/CatagoriesBooks'
import './allproducts.css'
import BookForSlider from '../HomeComponents/BookForSlider'
import { useParams } from 'react-router-dom'
import api from '../config/axiosApi'
import ReactPaginate from 'react-paginate';
export default function AllProducts() {
  const category = useParams().category;
  const [loading, setloading] = useState(true)
const [products, setproducts] = useState([])
const [totalPages, settotalPages] = useState(1);
const [currentPage, setcurrentPage] = useState(1);
  useEffect(() => {
 

    api.get(`/api/v1/products?category=${category}&page=${currentPage}`).then((res)=>{
      settotalPages(res.data.productCount);
      setproducts(res.data.products);
   
    setloading(false)
    }).catch((e)=>{
      console.log(e.message);
    })
  }, [category,currentPage])
 
 
 
 
 
 
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
        <CatagoriesBooks type="HorizontalScroller" active={category}/>
            <h3 className="heading">{category.toUpperCase()}</h3>
        <div className='AllProductsContainer'>
          <div className="sideBarForAllProducts"> Side Bar</div>
          <div className="AllproductsList">
        {
          (products.length===0)?`No Products Founds with ${category}`:
          products.map((item)=> <BookForSlider key={item._id} product={item}/>)
        }
          </div>
        </div>

        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(data)=>setcurrentPage(data.selected+1)}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        className='pagination'
        pageClassName='paginationItem'
        nextClassName='paginationItem'
        previousClassName='paginationItem'
        activeClassName='pageActive'
        // renderOnZeroPageCount={null}
      />
    </div>
  )
}
