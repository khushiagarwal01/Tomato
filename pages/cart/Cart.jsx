import React from 'react'
import './Cart.css'
import { useContext } from 'react';
import { Storecontext } from '../../context/Storecontext'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Cart() {
  const{cartitems,food_list,removefromcart,gettotalcartamount,deliveryfee,hasItems,gst,subtotal,url}=useContext(Storecontext);
  const navigate=useNavigate();
 



const total = (hasItems?deliveryfee + gst + subtotal:0)


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
        if(cartitems[item._id]>0){
          return(
            <div key={item._id}>
            <div className="cart-items-title cart-items-item">
              <img src={url+"/images/"+item.image} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartitems[item._id]}</p>
         
              <p>${item.price*cartitems[item._id]}</p>
              <p onClick={()=>removefromcart(item._id)} className='cross'>X</p>
            </div>
            <hr />
            </div>

          )
        }
        return null;})}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p> ${subtotal}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p> ${hasItems?deliveryfee:0} </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>GST Charges</p>
            <p>${hasItems?gst:0}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${ total}</b>
          </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>

        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code,Enter it here.</p>
            <div className='cart-promocode-input'>
              <input type="text"  placeholder='promo code'/>
              <button>Submit</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
