import express from "express";
import { addtocart,removefromcart,getcartdata } from "../controllers/cartcontroller.js";
import authmiddleware from "../middleware/auth.js";
const cartrouter=express.Router();
cartrouter.post('/add',authmiddleware,addtocart);
cartrouter.post('/remove',authmiddleware,removefromcart);
cartrouter.post('/get',authmiddleware,getcartdata);


export default cartrouter;
