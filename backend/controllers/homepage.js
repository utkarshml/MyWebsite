import { databseModel } from "../model/user.js";
import bcryt from "bcrypt";
import { setCookies } from "../utils/feature.js";
import userSetHome from "../utils/UserHomedata.js";
import ErrorHandler from "../utils/error.js";
import { render } from "ejs";
import { OtpSender } from "../utils/otpAuth.js";
import jwt from 'jsonwebtoken'
import otpModel from "../model/otpgen.js";

// ----------------------Get-Routes---------------

// Home
export const home = (req, res) => {
  if (req.user) {
    res.render("index", userSetHome(req.user));
  } else {
    res.render("index");
  }
};
//Login
export const userlogin = (req, res) => {
  if (req.user) {
    res.render("index", userSetHome(req.user));
  } else {
    res.render("login");
  }
};
//Registration
export const userSignup = (req, res) => {
  if (req.user) {
    res.render("index",
     userSetHome(req.user),
     );
  } else {
    res.render("signup");
  }
};
// Email verification
export const verifyPage = async (req, res) => {
  const par = await req.params
   res.render("otp" ,{
    params:par.id
   })
};
export const verifyEmail = async (req , res)=>{
  try
{  const {id} = req.params
  const {digit1 , digit2 ,digit3 ,digit4}= req.body
  const otp = `${digit1}${digit2}${digit3}${digit4}`
  const decodedOtp = jwt.verify(id , process.env.TOKEN_SECRET || "kdjfdfhjdhfkjdhjkdbh")
  const otpDetails = await otpModel.findOne({id:decodedOtp._id})
  const userDetails = await databseModel.findById(decodedOtp._id)
  console.log(otp , decodedOtp , otpDetails, userDetails)
  if(otpDetails.otp  === otp){
   await databseModel.updateOne({ _id:userDetails._id } , 
    {  $set:{
      EmailVerify : true }
    })
    res.redirect("/")
  }
  else{
    res.status(400).render("otp" ,{
      params:id,
      alert:"! Incorrect OTP"
      })
}}
catch(err){
  next(new ErrorHandler(err,400))
}
}
// ---------------------------Post-Routes---------------
// Registration function
export const userAddDatabase = async (req, res , next) => {
  try{
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
        const tokengen = await setCookies(res, 201, user);
        res.redirect(`/verify/${tokengen}`)
      } else {
        res.status(400).render("signup", {
          display: "block",
          alert: "! You Account already",
          email: req.body.email,
        });
      }
    }
  }
  catch(err){
    next(new ErrorHandler(err,400))
    console.log(err)

  }
};
// login function 
export const userFromDatabase = async (req, res , next) => {

  try{
    if (req.user) { next(new ErrorHandler("! You are already login", 204)) } else {
      const { email, password } = req.body;
      const isUserLogin = await databseModel.findOne({ email }).select("+password");
      if (isUserLogin) {
        const passwordverify = await bcryt.compare(password, isUserLogin.password);
        if (passwordverify) {
          setCookies(res, 201, isUserLogin);
          res.render("index", userSetHome(isUserLogin));
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
  }
  catch(err){
next(new ErrorHandler("Bad Request", 400))
  }
   }
// user profile
export const userProfile = async (req, res , next) => {
try{  res.render("user" ,{
    name: req.user.name,
    email:req.user.email
  })}
  catch(err){
    next(new ErrorHandler("Bad Request", 400))
  }
};
// User Logout
export const userlogout = (req, res) => {
  res.clearCookie("token")
  res.status(200).redirect("/");
};