import jwt  from "jsonwebtoken"
import { databseModel } from "../model/user.js"
import ErrorHandler from "../utils/error.js"


export const isCookies = async (req ,res , next) =>{
try{const { token} = req.cookies
if(token){
    const tokenVerify = jwt.verify(token , process.env.TOKEN_SECRET)
    const datafromdatabse =  await databseModel.findById({_id:tokenVerify._id})
    req.user = datafromdatabse
    next()
}
else{
    next()
}
}
catch(e){
    next(new ErrorHandler("Login or Signup" , 404))
}
}