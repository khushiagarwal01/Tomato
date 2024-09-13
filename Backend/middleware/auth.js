import jwt from "jsonwebtoken";

const authmiddleware=async(req,res,next)=>{
      const {token}=req.headers;
      if(!token){
        return res.json({success:false,message:"Login to add to cart"})
      }
      try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userid=token_decode.id;
        next();

      } catch (error) {
          console.log(error);
          res.json({success:false,message:"error"})
      }
}


export default authmiddleware;