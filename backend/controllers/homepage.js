import { databseModel } from "../model/user.js";
import bcryt from "bcrypt";
import { setCookies } from "../utils/feature.js";
import userSetHome from "../utils/UserHomedata.js";
import ErrorHandler from "../utils/error.js";
import AsyncCatch from "../utils/asynccatch.js";
import { OtpSender } from "../utils/otpAuth.js";
import otpResend from "../utils/resendOtp.js";
import jwt from 'jsonwebtoken'
import otpModel from "../model/otpgen.js";
// Home 
export const home = (req, res) => {
  const success = req.query.message
  if (req.user) {
    if(success  === req.cookies.token){

     res.render("index", {
          name  : req.user.name,
           alert : "Your Messege is send to admin",
     });

   }
   else{
     res.render("index", userSetHome(req.user));
   }
  } else {
    res.render("index");
  }
};
//Login
export const userlogin = (req, res) => {
  if (req.user) {
   res.redirect("/")
  } else {
    res.render("login");
  }
};

//Registration
export const userSignup = (req, res) => {
  if (req.user) {
     
    res.redirect("/")

  } else {
    res.render("signup");
  }
};
export const verify = AsyncCatch(async (req ,res, next ) =>{
  const { token} = req.cookies
  const decodedOtp = jwt.verify(token, process.env.TOKEN_SECRET)
  const otpDetails = await otpModel.findOne({id:decodedOtp._id})
  const userDetails = await databseModel.findById(decodedOtp._id)
  if(otpDetails){
    res.render("otp" ,{
      alert:"OTP is already send your email",
      icon:"uil-exclamation-triangle",
      color: "#f0e10fcc" 
      })
  }
  else{
  res.render("otp" ,{
    icon:"uil-envelope-upload",
    alert:"OTP is send to your email",
    color: "#10e910be" 
    })
  }
})

// resend otp route 
export const ResendOtp  = AsyncCatch(async (req , res , next) =>{
  otpResend(req.user , res)
  res.status(200).render("otp" ,{
    icon:"uil-envelope-upload",
    alert:`Otp Send  ${req.user.email}`,
    color:"#10e910be"
    }) 
})
/// send messege by user 
export const Message = async (req ,res ,next) =>{
  const {token} = req.cookies
  if(token){
    const {name , email , subject , message} = req.body
   const user = await databseModel.findById(req.user._id)
   if(user){
     await databseModel.updateOne({ _id:user._id }, 
      {  $push:{
        UserMessege : {
          name,
          subject,
          email,
          message,
          lastUpdate:Date.now()
        } }
      },
      )
      res.redirect(`/?message=${req.cookies.token}`)
    }
    else{
      res.redirect("/login")
    }
    
  }
   
}
export const verifyEmail = AsyncCatch(async (req , res  , next)=>{
  
  const {token} = req.cookies
  const {digit1 , digit2 ,digit3 ,digit4}= req.body
  const otp = `${digit1}${digit2}${digit3}${digit4}`
  const decodedOtp = jwt.verify(token, process.env.TOKEN_SECRET || "kdjfdfhjdhfkjdhjkdbh")
  const otpDetails = await otpModel.findOne({id:decodedOtp._id})
  const userDetails = await databseModel.findById(decodedOtp._id)
  if(otpDetails.otp  === otp){
   await databseModel.updateOne({ _id:userDetails._id } , 
    {  $set:{
      EmailVerify : true }
    })
    res.redirect("/")
  }
  else{
    res.status(400).render("otp" ,{
      icon:"uil-info-circle",
      alert:"! Incorrect OTP",
      color:"#ed0d0db0"
      })
}
})
// ---------------------------Post-Routes---------------
// Registration function
export const userAddDatabase = AsyncCatch(async (req, res , next) => {

  const { name, email, password } = req.body;
  const emailFillter = email.toLowerCase()
  const isUser = await databseModel.findOne({ email:emailFillter });
  
  if (req.user) { next(new ErrorHandler("! You are already login", 204))}
  else {
    if (!isUser) {
      const passwordhashing = await bcryt.hash(password, 10);
      const user = await databseModel.create({
        name,
        email:emailFillter,
        password: passwordhashing,
      });
      OtpSender(user , res)
      const tokengen =  setCookies(res, 201, user);
      res.redirect("/verify")
    } else {
      res.status(400).render("signup", {
        display: "block",
        alert: "! You Account already Exist",
        email: req.body.email,
      });
    }
  }
;})
// login function 
export const userFromDatabase = AsyncCatch(async (req, res , next) => {


  if (req.user) { next(new ErrorHandler("! You are already login", 204)) } else {
    const { email, password } = req.body;
    const isUserLogin = await databseModel.findOne({ email }).select("+password");
    if (isUserLogin) {
      const passwordverify = await bcryt.compare(password, isUserLogin.password);
      if (passwordverify) {
        setCookies(res, 201, isUserLogin);
        res.redirect("/")
      } else {
        res.status(400).render("login", {
          display: "block",
          alert: " ! Incorrect Password",
          email: req.body.email,
        });
      }
    } else {
      res.status(400).render("login", {
        display: "block",
        alert: "! Account is not exist",
        email: req.body.email,
      });
    }
  };
})
// user profile
export const userProfile = AsyncCatch(async (req, res , next) => {
  res.render("user" ,{
     name: req.user.name,
     email:req.user.email
   })})
// User Logout
export const userlogout = (req, res) => {
  res.clearCookie("token")
  res.status(200).redirect("/");
};