import React from 'react'
import './Placeorder.css'
import { useContext } from 'react'
import { Storecontext } from '../../context/Storecontext'
function Placeorder() {
  const {gettotalcartamount,hasItems,gst,deliveryfee,subtotal,total}=useContext(Storecontext);
  return (
   <form className='place-order' >
    <div className="place-order-left">
      <p className='title'>Delivery Information</p>
      <div className="multi-fields">
        <input type="text"  placeholder='First Name'/>
        <input type="text"placeholder='Last Name' />
      </div>
    <input type="email"  placeholder='Email address'/>
    <input type="text" placeholder='Street'/>
    <div className="multi-fields">
        <input type="text"  placeholder='City'/>
        <input type="text"placeholder='State' />
      </div>
      <div className="multi-fields">
        <input type="text"  placeholder='Zip code'/>
        <input type="text"placeholder='Country' />
      </div>
      <input type="text" placeholder='Phone' />
    </div>
    <div className="place-order-right">
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
          <button>PROCEED TO PAYMENT</button>

        </div>
    </div>


   </form>
  )
}

export default Placeorder
