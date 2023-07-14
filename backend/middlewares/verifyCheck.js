import { databseModel } from "../model/user.js"
import ErrorHandler from "../utils/error.js"
import jwt from "jsonwebtoken"
const isVerify = async (req ,res , next) =>{

    try{
        const {token} = req.cookies
        if(token){
        const decodedOtp = jwt.verify(token, process.env.TOKEN_SECRET || "kdjfdfhjdhfkjdhjkdbh")
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
    }
    catch(err){
        next(new ErrorHandler(err,500))
    }


}
export default isVerify;