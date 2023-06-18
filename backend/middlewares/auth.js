import jwt from "jsonwebtoken"
import { databseModel  } from "../model/user.js"

export const isAuth = async (req , res ,next)=>{
 const {token} = req.cookies 
 if(!token){
   return res.status(404).json({
       success:false,
       message: "login First"
     })
   }
   const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
   console.log(decoded)
   const findProfileByid = await databseModel.findById({ _id:decoded._id})
   req.user = findProfileByid
   next()
}