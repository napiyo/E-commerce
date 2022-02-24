import React, { useEffect, useState } from 'react'
import CatagoriesBooks from '../HomeComponents/CatagoriesBooks'
import './allproducts.css'
import BookForSlider from '../HomeComponents/BookForSlider'
import { useParams } from 'react-router-dom'
import api from '../config/axiosApi'
import ReactPaginate from 'react-paginate';
import {Slider} from '@mui/material'
export default function AllProducts() {
  const category = useParams().category;
  const [loading, setloading] = useState(true)
const [products, setproducts] = useState([])
const [totalPages, settotalPages] = useState(1);
const [currentPage, setcurrentPage] = useState(1);

  
  
  const [value, setValue] = useState([0,1500])
 const minDistance = 150;
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };
  useEffect(() => {
  

    api.get(`/api/v1/products?category=${category}&page=${currentPage}&price[gte]=${value[0]}&price[lte]=${value[1]}`).then((res)=>{
      settotalPages(res.data.filteredProductCount/res.data.resultPerPage);
      setproducts(res.data.products);
      
      setloading(false)
      }).catch((e)=>{
        console.log(e.message);
      })
    }, [category,currentPage,value])
    
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
          <div className="sideBarForAllProducts"> 
          price
          <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        min={0}
        max={1500}
        // getAriaValueText="nare"
        disableSwap
      />
          </div>
          <div className="AllproductsList">
        {
          (products.length===0)?`No Products Founds with current query change price/category`:
          products.map((item)=> <BookForSlider key={item._id} product={item}/>)
        }
          </div>
        </div>
{(totalPages < 2 )?"":
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
      />}
    </div>
  )
}
