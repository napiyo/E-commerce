import './cart.css';
import React, { useEffect, useState } from 'react'
import CartSingleItem from '../CartComponents/CartSingleItem';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export default function Cart() {
  const [cartPrice, setcartPrice] = useState(0);
  const cartState =useSelector((state) => state.CartReducer);
  useEffect(() => {
    let totalCartPrice =0;
    cartState.map((item)=>{
        totalCartPrice+=(item.price*item.quantity);
    })
    setcartPrice(totalCartPrice);
  }, [cartState])
  
  return (
    <>
        <h3 className='heading'>My Cart</h3>
    <div className='CartContainer'>
        <div className="CartItems">
            {
            cartState.map((item) => <CartSingleItem product={item} key = {item.id} /> )
            }
        </div>
       {(cartState.length==0)?<h3>No item found in your cart</h3>:
        <div className="CartPriceSummary">
         <span style={{fontWeight:700}} >Total Payable amount {cartPrice} ₹</span> 
       <Link to='/checkout' className='addToCartBtn'>
        <button className='addToCartBtn' >CheckOut</button>
       </Link>
        </div>
        }
    </div>
    </>
  )
}
