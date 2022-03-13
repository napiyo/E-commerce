import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MybackDrop  from '../utils/backDrop'
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import api from "../config/axiosApi";
import "./singleorder.css";
export default function SingleOrder() {
  const orderId = useParams().orderID;
  const alert = useAlert();
  // dummy order
  const [order, setorder] = useState({
    shippingInfo: {
      address: "loading",
      state: "loading",
      pinCode: 0,
      phoneNumber: 0,
    },
    payment: {
      mode: "loading",
      status: "loading",
      paymentId: "loading",
      razorpayOrderId: "loading",
      razorpaySignature: "loading",
    },
    _id: "loading",
    orderedItem: [],
    orderedBy: {
      _id: "loading",
      name: "loading",
      email: "loading",
    },
    orderedAt: "loading",
    price: 0,
    orderStatus: "processing",
  });
const [loading, setloading] = useState(true)
  useEffect(() => {
    api
      .get(`/api/v3/orders/details/${orderId}`)
      .then((res) => {
        setorder({ ...res.data.order });
      })
      .catch((e) => {
        (e.resonse)?alert.error(e.response.data.message):alert.error("something went wrong")
      });
      setloading(false)
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };




//   change Order Status
const changeOrderStatus = (status)=>{
   api.put(`api/v3/orders/updateOrderStatus/${orderId}`,{status}).then((res)=>{
       alert.success(`order Status updated to ${res.data.order.orderStatus}`)
        setorder({...order,orderStatus:status})
   
    }).catch((e)=>{
        console.log(e);
       alert.error(e.response.data.message || "something went wrong")
   })
}


// order items
const column = [
    { field: 'name', headerName: 'item Name', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'price', headerName: 'price/item', width: 100 },
    { field: 'productId', headerName: 'product id', width: 200 },
]

  return (
    <div className="userList">
        <MybackDrop open={loading}/>
      <h4>order Details for {orderId}</h4>
      <Divider />
      <div className="adminSingleOrderDetails">
        
      
        <Accordion
          expanded={expanded === "payment_details"}
          onChange={handleAccordion("payment_details")}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Payment Details
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {order.payment.status}
              {" - "}
              {order.price}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="singleOrderSingleDeatils">
            <div className="singleOrderSingleDeatilsItem">
                <div>payment mode:</div>
                <div>{order.payment.mode}</div>
              </div>
            <Divider />
              <div className="singleOrderSingleDeatilsItem">
                <div>payment Id:</div>
                <div>{order.payment.paymentId}</div>
              </div>
              <Divider />
              <div className="singleOrderSingleDeatilsItem">
                <div>Amount </div>
                <div>{order.price}</div>
              </div>
              <Divider />
              <div className="singleOrderSingleDeatilsItem">
                <div>payment Status:</div>
                <div>{order.payment.status}</div>
              </div>
              <Divider />
             
            </div>
          </AccordionDetails>
        </Accordion>


        <Accordion
          expanded={expanded === "shipping_info"}
          onChange={handleAccordion("shipping_info")}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
        
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Shipping Info
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {order.shippingInfo.state}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="singleOrderSingleDeatils">
            <div className="singleOrderSingleDeatilsItem">
                <div>address</div>
                <div>{order.shippingInfo.address}</div>
              </div>
            <Divider />
              <div className="singleOrderSingleDeatilsItem">
                <div>state</div>
                <div>{order.shippingInfo.state}</div>
              </div>
              <Divider />
              <div className="singleOrderSingleDeatilsItem">
                <div>pin Code</div>
                <div>{order.shippingInfo.pinCode}</div>
              </div>
              <Divider />
              <div className="singleOrderSingleDeatilsItem">
                <div>phone Number</div>
                <div>{order.shippingInfo.phoneNumber}</div>
              </div>
              <Divider />
             
            </div>
          </AccordionDetails>
        </Accordion>


     { (!order.orderedBy)?"user Not found":
        <Accordion
          expanded={expanded === "details"}
          onChange={handleAccordion("details")}
        >
          
          <AccordionSummary
            expandIcon={<ExpandMore />}
        
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              User Details
            </Typography>
           
            <Typography sx={{ color: "text.secondary" }}>
              {order.orderedBy.email}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="singleOrderSingleDeatils">
            <div className="singleOrderSingleDeatilsItem">
                <div>ordered By</div>
                <div>{order.orderedBy.email}</div>
              </div>
            <Divider />
              <div className="singleOrderSingleDeatilsItem">
                <div>Name</div>
                <div>{order.orderedBy.name}</div>
              </div>
              <Divider />
              <div className="singleOrderSingleDeatilsItem">
                <div>Placed On</div>
                <div>{order.orderedAt}</div>
              </div>
              <Divider />
             
             
            </div>
          </AccordionDetails>
        
        </Accordion>
}
        <div className="singleOrderSingleDeatilsItem">
            <div>order Status</div>
            
      <Select
    
    value={order.orderStatus}
  sx={{width:200}}
    onChange={(event)=>changeOrderStatus(event.target.value)}
  >
    <MenuItem value={'delivered'}>Delivered</MenuItem>
    <MenuItem value={'canceled'}>canceled</MenuItem>
    <MenuItem value={'dispactched'}>Dispactched</MenuItem>
    <MenuItem value={'processing'}>processing</MenuItem>
   
  </Select>
      </div>
    
      </div>

<div className="orderItem_singleOrder_admin">
<DataGrid 
rows={order.orderedItem}
getRowId={(r)=>r._id}
columns={column}
autoHeight
disableSelectionOnClick
/>

</div>


    </div>
  );
}
