//mongodb+srv://agarwalkhushi010101:#Success@clusterkhushi.vp2nqr0.mongodb.net/?
import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import foodrouter from "./routes/foodroute.js"
import userrouter from "./routes/userroute.js"
import 'dotenv/config';
import cartrouter from "./routes/cartroute.js"

//app config
const app=express()
const port=4000

//middleware
app.use(express.json()) //whenever we get the rqst from frontend to backend the rqst is parsed to json 
app.use(cors()) //to allow cross origin request backend and frontend integrate
 connectDb(); //db connection
   app.use('/api/food',foodrouter) 
   app.use("/images",express.static('uploads'))           //api endpoints
   app.use('/api/user',userrouter)
   app.use('/api/cart',cartrouter)
app.get("/",(req,res)=>{
    res.send("Api working")
})

app.listen(port,()=>{
    console.log(`server is running successfully at ${port}`)
})