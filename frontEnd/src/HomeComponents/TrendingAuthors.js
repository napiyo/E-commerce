import './trendingAuthor.css';
import React from 'react'
import Author from './Author';

export default function () {
  return (
    <div style={{maxHeight:'300px'}}>
        <h3 className="heading">
            Top Authors
        </h3>
            <div className="authorList">
            
                <Author />
                <Author />
                <Author />
             
               </div>
        
    </div>
  )
}
