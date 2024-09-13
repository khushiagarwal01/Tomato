import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function List({url}) {
  const[list,setlist]=useState([]);
  const fetchlist=async()=>{
    const response =await axios.get(`${url}/api/food/list`);
   
    if(response.data.success){
      setlist(response.data.data)
    }
    else{
      toast.error("error");
    }
  }
  const removefood = async (id) => {
    try {
        const response = await axios.post(`${url}/api/food/remove`, { id });
        await fetchlist();
        if(response.data.success){
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }
        if (response.data.success) {
            console.log("Food item removed");
        } else {
            console.error("Failed to remove food item");
        }
    } catch (error) {
        console.error("Error removing food item:", error);
    }
};

  useEffect(()=>{
     fetchlist();
  },[])
  return (
    <div className='list-add flex-col'>
      <p></p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
               return (
                <div key={index} className="list-table-format">
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <p onClick={()=>removefood(item._id)} className='cursor'>x</p>
                 
                  </div>
               )
        })}
      </div>
      
    </div>
  )
}

export default List
