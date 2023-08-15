import jwt  from "jsonwebtoken"
import { databseModel } from "../model/user.js"
import AsyncCatch from "../utils/asynccatch.js"


export const isCookies = AsyncCatch(async (req ,res , next) =>{
    const {token} = req.cookies
    if(token){
        const tokenVerify = jwt.verify(token , process.env.TOKEN_SECRET)
        const datafromdatabse =  await databseModel.findById({_id:tokenVerify._id})
        req.user = datafromdatabse
        next()
    }
    else{
        next()
    }
    })
