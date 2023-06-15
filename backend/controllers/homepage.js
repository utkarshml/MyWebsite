 import { databseModel } from "../model/user.js"
 import jwt from "jsonwebtoken"
 import bcryt from "bcrypt"
export const home  = (req ,res) =>{
    res.render("index")
} 

export const userlogin = (req , res)=>{
    res.render("login")
}
export const  userSignup  = (req , res) =>{
    res.render("signup")
}


export const userAddDatabase = async (req , res ) =>{
    console.log(req.body)
  const { name , email , password} = req.body
  const passwordhashing = await bcryt.hash(password , 10)
  const isUser = await databseModel.findOne({ email})
  if(!isUser){
     const user =  await databseModel.create({
        name,email,password:passwordhashing
    })
    const cookiesToken = jwt.sign({_id:user._id} , "jskldjfklsjdfksjflk")
    res.cookie("token" , cookiesToken ,{
        httpOnly:true,
    })
    res.status(201).json({
         success: true,  
         message:"user created"
    })
  }
  else{
    res.json({
        message:"account bana"
    })
  }
}
export const userFromDatabase = (req , res)=>{
    console.log(req.body)
    res.json({
        success:true
    })
}