import React from 'react'
import BookBox from './BookBox'
import './trendingBooks.css'
export default function TrendingBooks() {
  return (
    <div className='mainContainer'> 

        <h3 className='heading'>Trending Books</h3>
        <div className="trendingSlider">
         
            <BookBox />
            <BookBox />
            <BookBox />
            <BookBox />
            <BookBox />
            <BookBox />
        
        </div>
    </div>
  )
}
