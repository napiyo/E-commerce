import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import api from '../config/axiosApi';
import bookCover from '../assests/bookCover.jpg'
import { DataGrid } from '@mui/x-data-grid';
import { useAlert } from 'react-alert'
export default function Myorders() {
    const [loading, setloading] = useState(true);
    const [myorders, setmyorders] = useState([]);
    const [rows, setrows] = useState([{'id':1,'orderID':'demo','amount':0,'Status':'loading'}]);
    const alert = useAlert();
    useEffect(() => {
     api.get('/api/v3/orders/myOrders').then((res)=>{
        setmyorders(res.data.order)

        const  row = [];
          res.data.order.map((order,index)=>{
         row.push({'id':index,'orderID':order._id,'amount':order.price,'Status':order.orderStatus})
        
          })
     
          setrows([...row]);
      
          setloading(false);
        }).catch((e)=>{
          alert.error("couldn't load orders")
          console.log(e);
        })
    }, [])
    
   

  // const row = [{'id':1,
  // 'orderID':'asdf','amount':'3','Status':'done'}];

    const column =[
      { field: 'orderID', headerName: 'order id', width: 150 },
      { field: 'amount', headerName: 'amount', width: 150 },
      { field: 'Status', headerName: 'status', width: 150 },
 
    ]

if(loading){

        return <>
        
         <Skeleton variant="rectangular" width={'100%'} height={118} sx={{bgcolor:'aquamarine',margin:'1vmax'}}/>
         <Skeleton variant="rectangular" width={'100%'} height={118} sx={{bgcolor:'aquamarine',margin:'1vmax'}}/>
         <Skeleton variant="rectangular" width={'100%'} height={118} sx={{bgcolor:'aquamarine',margin:'1vmax'}}/>
        
        </>
    }
  return (
    <>
  <div style={{ display: 'flex',height:'40vh' }}>
  <div style={{ flexGrow: 1 }}>
{(myorders.length===0)?"No orders has placed yet":<DataGrid 
    rows={rows}
    columns={column}
   
 
    />}
  
  </div>
</div>
 
  </>
  )
}
