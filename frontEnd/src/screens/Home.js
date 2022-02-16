import React from 'react'
import { Link } from 'react-router-dom';
import BookForSlider from '../HomeComponents/BookForSlider';
import CatagoriesBooks from '../HomeComponents/CatagoriesBooks';

import TrendingAuthors from '../HomeComponents/TrendingAuthors';
import TrendingBooks from '../HomeComponents/TrendingBooks';
import './home.css'
export default function Home() {
  return (
    <div>
       
    <div style={{width:'100%'}}><TrendingBooks /></div>
    <div className='welcomeBottom'>
    <div className='catagoriesSection'><CatagoriesBooks type=""/></div>
    <div className='topauthorsSection'><TrendingAuthors/></div>
    </div>
    <div>
      <h3 className='heading'>Science fiction</h3>
      <div className="slider">
        <Link to={'/product'}><BookForSlider/></Link>
        <Link to={'/products'}><BookForSlider/></Link>
        <Link to={'/admin'}><BookForSlider/></Link>
       
      
      </div>
      
      </div>
      <div>
      <h3 className='heading'>Science fiction</h3>
      <div className="slider">
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
      
      </div>
      
      </div>
      <div>
      <h3 className='heading'>Science fiction</h3>
      <div className="slider">
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
      
      </div>
      
      </div>
      <div>
      <h3 className='heading'>Science fiction</h3>
      <div className="slider">
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
        <BookForSlider/>
      
      </div>
      
      </div>

    </div>
  )
}
