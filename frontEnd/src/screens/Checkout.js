import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MyBackDrop from '../utils/backDrop'
import api from '../config/axiosApi'
import './checkout.css'
import LoggedIn from "../checkoutComponents/LoggedIn";
import ShippingInfo from "../checkoutComponents/ShippingInfo";
import Payment from "../checkoutComponents/Payment";
import { useAlert } from "react-alert";
import successIcon from '../assests/successIcon.svg'
import { emptyCart } from "../Redux/cartActions";

const steps = [
  "Login",
  "Shipping Info",
  "Payment",
];

 // load razor poy script

 function loadRazorPay(src){
  return new Promise(resolve=>{
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.src = src;
    script.onload= ()=>{
          resolve(true)
    }
    script.onerror= ()=>{
      resolve(false)

    }
  })
}

export default function Checkout() {
  const alert = useAlert();


  const cartState =useSelector((state) => state.CartReducer);
  const [cartPrice, setcartPrice] = useState(0);

  // shipping info
const [shippingInfo, setshippingInfo] = useState({});
const [paid, setpaid] = useState(false);
const validateShippingInfo = ()=>{
 
  const {address,state,pinCode,phoneNumber} = shippingInfo;
  if(address && state && pinCode && phoneNumber ){
    return true
  }
  else{
  return false;
  }
  
}
const componentsForSteps = [
  <LoggedIn />,
  <ShippingInfo setshippingInfo={setshippingInfo} />,
  <Payment paid={paid}/>
]




  //least step -- if already logged in no need to go to this  step
  const [leaststep, setleaststep] = useState(0);
  
//user
const userState = useSelector((state)=>state.UserReducer); 

const [activeStep, setActiveStep] = useState(leaststep);
// const [loading, setloading] = useState(true);


useEffect(() => {
  
    if(userState.isauthenticated){
        setleaststep(1);
        setActiveStep(1);
      }
      else{
        setleaststep(0);
        setActiveStep(0);
    }
    let totalCartPrice =0;
    cartState.map((item)=>{
        totalCartPrice+=(item.price*item.quantity);
    })
    setcartPrice(totalCartPrice);
 
  }, [userState,cartState])


  const placeOrderToRazorPay = ()=>{
    // razorPayInstance.
    // place order on razar pay only
  api.post('/api/v4/payments/newOrder',{'amount':cartPrice}).then((res)=>{
                payRazorpay(res.data.order.id);
  }).catch((e)=>{
    alert.error(e.response.data.message || "something went wrong at payment gateway");
   
  })
}

const dispatch = useDispatch();
  // on paid
function paymentSuccessfull(response){
   setpaid(true);
   setActiveStep(activeStep+1);
   dispatch(emptyCart());
   // empty cart
   let orderedItem=[];
   cartState.map((item)=>{
        let temp ={
          'productId':item.id,
          'quantity':item.quantity,
          'price':item.price,
          'name':item.productName
        }
        orderedItem.push(temp);
   })
   // place order in out database
   const orderSummary ={
     shippingInfo,
     orderedItem,
     'payment':{
       'mode':'razorPay',
       'status':"paid",
       'paymentId':response.razorpay_payment_id,
       'razorpayOrderId':response.razorpay_order_id,
       'razorpaySignature':response.razorpay_signature

     },
     'price':cartPrice
   }
   api.post('http://localhost:4500/api/v3/orders/newOrder',orderSummary).then((res)=>{
     alert.success("order placed")
   }).catch((e)=>{
     alert.error(e);
     alert.info("your payment is successfully done");
     console.log(e);
     console.log(response);
     window.alert("order failed .. but payment is done please copy order id :  "+ response.response.razorpay_order_id+" and your payment id : "+response.razorpay_payment_id)
   })
}
// pay
const payRazorpay = async(orderId)=>{
  const loadScript = await loadRazorPay("https://checkout.razorpay.com/v1/checkout.js");
 if(!loadScript){
   alert.error("payment gateway failed to load")
   return
 }


  const options = {
    "key": process.env.REACT_APP_RAZORPAY_KEY,
    
    "amount": cartPrice*100 , 
    "currency": "INR",
    "name": "Bookias",
    "description": "E-commerce site by Narendra",
    "image": "https://www.kindpng.com/picc/m/163-1631653_book-education-logo-png-transparent-png.png",
    "order_id": orderId, 
    "handler": function (response){

      // payment successfull
        alert.success("payment successful")
        paymentSuccessfull(response);
        
    },
    "prefill": {
        "name": userState.name,
        "email": userState.email,
        "contact": shippingInfo.phoneNumber
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new window.Razorpay(options);
rzp1.open();
rzp1.on('payment.failed', function (response){
      alert.error("payment failed");
      console.log(response);
});




}


  const handleNext = () => {
   
   if(activeStep==0){
     if(userState.isauthenticated){
       setActiveStep(1);
     }
   }
    else if(activeStep==1){

        if(validateShippingInfo()) {
          setActiveStep(activeStep+1);
          placeOrderToRazorPay();
        }
        else{
          alert.error("all fields are required")
        }
    }
  
  };
    
    const handleBack = () => {
        // if(activeStep)
      setActiveStep(activeStep-1)
    
  };

 





  // if(loading){
  //   return <div className="body404">

  //     <MyBackDrop open={true} />
  //   </div> 
  // }
  if (cartState.length == 0) {
    return (
      <div className="body404">
        please add some product to your cart first
        <Link to="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }


  
  return (
    <div className="checkoutbody">
    
     { (!paid)?<Stepper activeStep={activeStep}>
          {
              steps.map((item,index)=>{
                  
                  return(
                      <Step key={index} completed={(activeStep > index || leaststep > index)}>
                          <StepLabel>
                            {item}
                          </StepLabel>
                      </Step>
                  )
              })
          }

      </Stepper>:""}
      <div className="checkoutStep">

      { 
        (activeStep < 3 && !paid)?componentsForSteps[activeStep]:""
        }

        </div>
       {(paid)?<div className="orderplacedSuccessFully">
  <img src={successIcon} alt="order placed"  width='100px' height='100px'/>
  <div>Your order has been placed and payment is done successfully</div>
  <Link to='/'><Button>Go to home</Button></Link>
  </div>:"" }
     {(!paid)?<div className="actionBtnForCheckout">
          <Button disabled={activeStep ===leaststep || paid} onClick={handleBack}>Back</Button>
          <Button disabled={activeStep===steps.length -1 || paid } onClick={handleNext}>Next</Button>
      </div>
:""}
    </div>
      
  );
}
