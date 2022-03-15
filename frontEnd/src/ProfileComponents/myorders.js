import { Button, IconButton, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import api from '../config/axiosApi';
import bookCover from '../assests/bookCover.jpg'
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { useAlert } from 'react-alert'
import { Cancel } from '@mui/icons-material';
import { width } from '@mui/system';
import MyBackDrop from '../utils/backDrop';
export default function Myorders() {
    const [loading, setloading] = useState(true);
    const [myorders, setmyorders] = useState([]);
    const [rows, setrows] = useState([{'id':1,'orderID':'demo','amount':0,'Status':'loading'}]);
    const alert = useAlert();
    const [pagerefreshvariable, setpagerefreshvariable] = useState(0)
    useEffect(() => {
     api.get('/api/v3/orders/myOrders').then((res)=>{
        setmyorders(res.data.order)

        const  row = [];
          res.data.order.map((order,index)=>{
         row.push({'id':index,'orderID':order._id,'amount':order.price,'Status':order.orderStatus,'orderedOn':new Date(order.orderedAt)})
        
          })
     
          setrows([...row]);
      
          setloading(false);
        }).catch((e)=>{
          alert.error("couldn't load orders")
          console.log(e);
        })
    }, [pagerefreshvariable])
    const [processing, setprocessing] = useState(false);
   

    // cancel my order
    const cancelmyOrder = async(id)=>{
      setprocessing(true);
      await api.put(`/api/v3/orders/cancelMyOrder/${id}`).then((res)=>{
           setpagerefreshvariable(pagerefreshvariable+1)
            alert.success("order canceled");
         }).catch((e)=>{
           (e.response)?alert.error(e.response.data.message):alert.error("something went wrong")
         })
         setprocessing(false)
    }

    const column =[
      { field: 'orderID', headerName: 'order id', minWidth: 150 ,flex:1},
      { field: 'amount', headerName: 'amount', width: 150 },
      { field: 'orderedOn', headerName: 'ordered On', width: 150 ,type:'date'}, 
      { field: 'Status', headerName: 'status', width: 150 },
      {
        field: 'actions',
        type: 'actions',
        getActions: (params) => [
          <Button startIcon={<Cancel />} variant="outlined"  onClick={()=> {cancelmyOrder(params.row.orderID)}} 
          disabled={params.row.Status ==="canceled" || params.row.Status === "delivered"}
          >cancel</Button>,  
        ],
        width:150
      },
 
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
  <div style={{ display: 'flex'}}>
<MyBackDrop open={processing} />
  <div style={{ flexGrow: 1 }}>
{(myorders.length===0)?"No orders has placed yet":<DataGrid 
    rows={rows}
    columns={column}
    components={{ Toolbar: GridToolbar }}
    autoHeight
    disableSelectionOnClick
    />}
  
  </div>
</div>
 
  </>
  )
}
