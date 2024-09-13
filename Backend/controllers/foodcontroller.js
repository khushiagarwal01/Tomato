import foodmodel from '../models/foodmodel.js'
import fs from 'fs';
import path from 'path';
//add food item

const addfood=async(req,res)=>{
      let image_filename=`${req.file.filename}`;
      const food=new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
       
      })
      try{
        await food.save();
        res.json({success:true,message:"food added"})
      } catch(error){
        console.log("error")
        res.json({success:false,message:"error"})
      }
      
}

//all food list
const listfood=async(req,res)=>{
      try{
        const food=await foodmodel.find({});
        res.json({success:true,data:food})

      }
      catch(error){
     console.log("error");
     res.json({success:false,message:"error"})
}
}
//remove food items





const removefood = async (req, res) => {
    console.log("Received request:", req.body); // Log incoming request

    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "No ID provided" });
        }

        const food = await foodmodel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Construct the file path
        const filePath = path.join('uploads', food.image);

        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                // Return a response if file deletion fails
                return res.status(500).json({ success: false, message: "Failed to delete file" });
            }
        });

        // Delete the food item from the database
        await foodmodel.findByIdAndDelete(id);

        res.json({ success: true, message: "Food item removed" });
    } catch (error) {
        console.error("Error in removefood:", error); // Log detailed error
        res.status(500).json({ success: false, message: error.message });
    }
};




export  {addfood, listfood,removefood};