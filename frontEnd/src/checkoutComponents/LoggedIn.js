import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './loggedin.css'
export default function LoggedIn() {
    
    
  return (
    <div className='checkOut_loggedIn_componenetBox'>
      Please Login or register to order 
        <Link to='/auth'>
        <Button variant='contained' >login / signup</Button>
        </Link>
    </div>
  )
}
