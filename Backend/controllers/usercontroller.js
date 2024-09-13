import express from'express';
import usermodel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';   //used to encrypt the password 
import validator from 'validator';


const loginuser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await usermodel.findOne({email});
        if(!user){
           return res.json({success:false,message:"user doesn't exist"})
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createtoken(user._id);
        res.json({success:true,token})
    }
    catch(error){
      console.log(error);
      res.json({success:false,message:"Error"})
    }

}
const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registeruser=async(req,res)=>{
   const {name,email,password}=req.body;
   try{ //checking is user already exists
        const exist=await usermodel.findOne({email})
        if(exist){
            return res.json({success:false,message:"user already exist"})
        }
        //validate email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"invalid email format"})
        }
        if(password.length<8){
            return res.json({success:false,message:"password must be at least 8 characters long"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser=new usermodel({name:name,
            email:email,
            password:hashedpassword
        })
       const user= await newuser.save();
       const token=createtoken(user._id);
       res.json({success:true,token})


   }  
   catch{
     console.log("error")
     res.json({success:false,message:"error"})

   }
}

export {loginuser,registeruser};