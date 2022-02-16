import './catagoriesbooks.css'
import React from 'react'
import Category from './Category'

export default function CatagoriesBooks(props) {
  return (<>
    <h3 className='heading'>All Categories</h3>
 <div className='categoriesWelcomePage' style={{overflowX:(props.type=='HorizontalScroller')?'auto':'hidden',flexWrap:(props.type=='HorizontalScroller')?'nowrap':'wrap'}}>
   <Category />
   <Category />
   <Category />
   <Category />
   <Category />
   <Category />
   <Category />
   <Category />

    </div>
  </>
  )
}
