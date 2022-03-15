import React from 'react'
import './error404.css'
import errorlogo from '../assests/errorLogo.svg'
export default function Error404() {
  return (
    <div className='body404'>
      
      <img src={errorlogo} alt="404" className='errorlogoImg' />
      404 Page not found</div>
  )
}
