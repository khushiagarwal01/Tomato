import mongoose from "mongoose";
 export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://agarwalkhushi010101:successiskhushi@clusterkhushi.vp2nqr0.mongodb.net/foodelivery').then(()=>console.log("db connected"));
}