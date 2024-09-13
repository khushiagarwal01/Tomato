import { createContext, useEffect } from "react";
 export const Storecontext=createContext(null); //storecontext is the obect thatmakes the context
import { useState } from "react";
import axios from 'axios'
const StorecontextProvider=(props)=>{
    const [cartitems,setcartitems]=useState({});
    const url="http://localhost:4000"

    const [token,settoken]=useState("")
    const [food_list,setfoodlist]=useState([]);
    const addtocart=async(id)=>{
        if(!cartitems[id]){
            setcartitems((prev)=>({...prev,[id]:1}))
        }
        else{
            setcartitems((prev)=>({...prev,[id]:prev[id]+1}))
        }
        if (token) {
            try {
            await axios.post(
                    url+"/api/cart/add",
                    { id },
                    { headers: {token} } 
                );
               
            } catch (error) {
                console.error("Error adding to cart:", error.response.data);
            }
        }
    }
   const removefromcart=async(id)=>{
    setcartitems((prev)=>({...prev,[id]:prev[id]-1}));
     
   }
   const gettotalcartamount=()=>{
    let totalamt=0;
    for(const item in cartitems){
    if(cartitems[item]>0){
         let iteminfo=food_list.find((product)=>product._id===item);
         totalamt+=iteminfo.price*cartitems[item];
    }
}
return totalamt };
const fetchfoodlist=async()=>{
    const response=await axios.get(url+'/api/food/list')
    setfoodlist(response.data.data);
}
useEffect(()=>{
  
    async function loaddata(){
        await fetchfoodlist();
    
    if(localStorage.getItem("token")){
        settoken(localStorage.getItem("token"))
    }}
    loaddata();
},[])


let deliveryfee=Math.floor(Math.random() * 10);
let gst = Math.floor(Math.random() * 40);
const subtotal = gettotalcartamount();
const hasItems = Object.values(cartitems).some(quantity => quantity > 0);

const total = (hasItems?deliveryfee + gst + subtotal:0)

    const contextvalue={
          food_list, /* whatever is passed to this contextvalue object is acceseble to each component */
          cartitems,
          setcartitems,
          addtocart,
          removefromcart,
          gettotalcartamount,
          deliveryfee,
          gst,
          hasItems,
          subtotal,
          url,
          token,
          settoken

    }
    return(
        <Storecontext.Provider value={contextvalue}>
            {props.children}
        </Storecontext.Provider>  //we have to create the .provider using createcontext object name whatever is in it is passed tothe components
    )
}
export default StorecontextProvider;