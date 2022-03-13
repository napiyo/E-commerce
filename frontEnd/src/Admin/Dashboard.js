import React, { useEffect, useState } from 'react'
import './dashboard.css'
import {Divider, List, ListItem, ListItemText} from '@mui/material'
import MyBackDrop from '../utils/backDrop'
import api from '../config/axiosApi'
import {Group,MonetizationOn ,Inventory} from '@mui/icons-material';
import {useAlert} from 'react-alert'
import { Doughnut } from 'react-chartjs-2';
import {Chart} from 'chart.js/auto'
export default function Dashboard() {


  const [loading, setloading] = useState(true);
  const [totalSale, settotalSale] = useState(0);
  const [totalUsers, settotalUsers] = useState(0);
  const [outofStock, setoutofStock] = useState([]);
  const [totalProducts, settotalProducts] = useState(5);
  const alert = useAlert();
 

  // outof stock chart
 const outofstockChartState = {
  
  labels:["out of stock", "in Stock"],
   datasets:[
     {
     
       backgroundColor:["red","green"],
       data:[outofStock.length,totalProducts-outofStock.length]
     }
   ]
 }
  
useEffect(async() => {
 await api.get('/api/v3/orders/allOrders').then((res) =>{
    settotalSale(res.data.totalAmount);
 })
 await api.get('/api/v2/users/admin/allUsers').then((res)=> {
      settotalUsers(res.data.Users.length);
     
 })
 await api.get('api/v1/products/outofstock').then((res)=>{

   setoutofStock(res.data.products);
 })
 await api.get('/api/v1/products').then((res)=>{
   settotalProducts(res.data.productCount)
   })

  setloading(false)
}, [])

return (
<div className="adminDashboardBox">
  <MyBackDrop open={loading} />
 <div className="topadminBoxes">
    <div className="adminInfoBox">
      <div className="adminInfoHeading">{totalSale} ₹</div>
      <div className="adminInfodescription sameLine"> <MonetizationOn/> total Sale</div>
    </div>

    <div className="adminInfoBox">
      <div className="adminInfoHeading">{totalProducts}</div>
      <div className="adminInfodescription sameLine"> <Inventory /> Total Products</div>
    </div>

    <div className="adminInfoBox">
      <div className="adminInfoHeading">{totalUsers}</div>
      <div className="adminInfodescription sameLine"> <Group fontSize='large'/> users</div>
    </div>
  </div>
  <Divider />
<div className='dashboardBottom'>

  <div className="outofstockchart">
    <Doughnut 
    data={outofstockChartState}
    />
    </div>
    <div className='dashboardOutOfstockList'>
    <div className='dashboardOutOfStockItem dashboardOutOfStockItemHeader'>
 
      <div>out of stock item</div>
      <div>pending orders</div>
    </div>
    <Divider />
      {(outofStock.length==0)?"no items here":
        
        outofStock.slice(0,10).map((item)=>{
          return<>
           <div className='dashboardOutOfStockItem'>
            <div>{item.name}</div>
              <div>{item.Stock}</div>
          </div>
              <Divider />
       </>
            })
      }
    </div>
    </div>
</div>
 
  )
}
