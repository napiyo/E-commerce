import React, { useEffect, useState } from 'react'
import './searchpage.css'
import {  useSearchParams } from 'react-router-dom'
import api from '../config/axiosApi';
import BookForSlider from '../HomeComponents/BookForSlider';
import { useAlert } from 'react-alert'
import { Pagination } from '@mui/material';
export default function SearchPage() {
    let [searchParams] =  useSearchParams();
    let searchQuery= searchParams.get('keyword');
    const [loading, setloading] = useState(true)
    const [products, setproducts] = useState([])
    const [totalPages, settotalPages] = useState(1);
    const [currentPage, setcurrentPage] = useState(1);
    const alert = useAlert()
  
    useEffect(() => {
      api.get(`/api/v1/products?keyword=${searchQuery}&page=${currentPage}`).then((res)=>{
            setproducts(res.data.products);
            settotalPages(Math.ceil(res.data.filteredProductCount/res.data.resultPerPage));
            setloading(false)
      }).catch((e)=>{
        alert.error(e.message)
      })
    }, [searchQuery,currentPage])
    
    if(loading){
        return <>
        <div className="loaderContainer">
          <div className="loader">
      
          </div>
        </div>
        </>
      }

    if(searchQuery.length==0){
          return <h2>PLEASE search in header</h2>
  }
    return (
    <div className='searchPageBox'>
        
        <h4>showing result for "{searchQuery}"</h4>
        <div className="AllproductsList">

        {(products.length==0)?"no products found.. ":
            products.map((item)=> {
                return <>
                <BookForSlider key={item._id} product={item} />
                </>})
            }
            </div>
            <div style={{display:'flex',justifyContent:'center',margin:'2vmax 0'}}>         
        {(totalPages < 2 )?"":
        <Pagination shape='rounded' count={totalPages} color="secondary" page={currentPage} onChange={(e,value)=>setcurrentPage(value)} />
      //   <ReactPaginate
      //   breakLabel="..."
      //   nextLabel="next >"
      //   onPageChange={(data)=>setcurrentPage(data.selected+1)}
      //   pageRangeDisplayed={5}
      //   pageCount={totalPages}
      //   previousLabel="< previous"
      //   className='pagination'
      //   pageClassName='paginationItem'
      //   nextClassName='paginationItem'
      //   previousClassName='paginationItem'
      //   activeClassName='pageActive'
      //   // renderOnZeroPageCount={null}
      // />
      }
         </div>
    </div>
  )
}
