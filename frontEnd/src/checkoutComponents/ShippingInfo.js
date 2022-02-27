import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './shippinginfo.css'



export default function ShippingInfo({setshippingInfo}) {
  const [address, setaddress] = useState("");
  const [state, setstate] = useState("");
  const [pinCode, setpinCode] = useState(0);
  const [phoneNumber, setphoneNumber] = useState(0);
  useEffect(() => {
       setshippingInfo({address,state,pinCode,phoneNumber})
  }, [address,state,pinCode,phoneNumber])
  
    return (
    <div className='shippingInfo_checkout'>

    
    <div className='shippingInfo_checkoutBox'>

        <TextField 
            multiline
            type='text'
            sx={{width:'60%'}}
            value={address}
            onChange={(e)=>setaddress(e.target.value)}
            label="Address"
            placeholder='420, 6th cross, mathekeri'
            fullWidth
        />
        <div className='shippingInfo_checkOut_sameLine'>

         <TextField 
            sx={{width:'60%'}}
            value={state}
            onChange={(e)=>setstate(e.target.value)}
            label="state"
            />
         <TextField 
            type='number'
            sx={{width:'60%'}}
            value={pinCode}
            onChange={(e)=>setpinCode(e.target.value)}
            label="pin Code"
            />
            </div>
         <TextField 
            type='tel'
            sx={{width:'60%'}}
            value={phoneNumber}
            onChange={(e)=>setphoneNumber(e.target.value)}
            label="phone Number"
        />
    </div>
    </div>
  )
}
