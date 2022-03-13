import React, { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import './orders.css'
import api from '../config/axiosApi';
import { useNavigate } from 'react-router-dom' 
import { Launch } from '@mui/icons-material';
export default function Orders() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(true)
    const [rows, setrows] = useState([])
    const column =[
        { field: 'orderId', headerName: 'order ID', width: 250 },
        { field: 'amount', headerName: 'Amount', width: 100 },
        { field: 'userId', headerName: 'user ID', width: 250},
        { field: 'date', headerName: 'date', width: 150,type:'date'},
        { field: 'Status', headerName: 'Status', width: 150},
        {
            field: 'actions',
            type: 'actions',
            getActions: (params) => [
              <GridActionsCellItem icon={<Launch/>}  label="open" onClick={()=> navigate(`./${params.id}`)}/>,
              
            ]
          },
        
    ]

    useEffect(() => {
            api.get('/api/v3/orders/allOrders').then((res)=>{
                const orders = [];
                res.data.order.map((item)=>{
                    orders.push({id:item._id,orderId:item._id,amount:item.price,userId:item.orderedBy,date:new Date(item.orderedAt),Status:item.orderStatus})

                })
                setrows(orders)
            })

            setloading(false)
    }, [])
    

     

  return (
    <div className='userList'>
    {/* <MyBackDrop open={loading} /> */}
   <DataGrid 
rows={rows}
columns={column}
loading={loading}
autoHeight
disableSelectionOnClick
/>
</div>
)
}
