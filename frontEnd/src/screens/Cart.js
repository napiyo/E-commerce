import './cart.css';
import React from 'react'
import CartSingleItem from '../CartComponents/CartSingleItem';

export default function Cart() {
  return (
    <>
        <h3 className='heading'>My Cart</h3>
    <div className='CartContainer'>
        <div className="CartItems">
            <CartSingleItem />
            <CartSingleItem />
            <CartSingleItem />
            <CartSingleItem />
        </div>
        <div className="CartPriceSummary">
        Total Payable amount 999
        <button className='addToCartBtn'>CheckOut</button>

        </div>
    </div>
    </>
  )
}
