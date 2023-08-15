import { databseModel } from "../model/user.js"
import AsyncCatch from "../utils/asynccatch.js";
import jwt from "jsonwebtoken"
const isVerify = AsyncCatch(async (req ,res , next) =>{

    
    const {token} = req.cookies
    if(token){
    const decodedOtp = jwt.verify(token, process.env.TOKEN_SECRET)
    const userDetails = await databseModel.findById(decodedOtp._id)
      if(userDetails.EmailVerify === true){
       res.redirect("/")
      }
      else{
       next()
      }
    }
    else{
        res.redirect("/login")
    }
})
export default isVerify;