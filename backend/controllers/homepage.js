import { databseModel } from "../model/user.js";
import bcryt from "bcrypt";
import { setCookies } from "../utils/feature.js";
import userSetHome from "../utils/UserHomedata.js";
import ErrorHandler from "../utils/error.js";



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
    res.render("index", userSetHome(req.user));
  } else {
    res.render("signup");
  }
};
// ---------------------------Post-Routes---------------
// Registration function
export const userAddDatabase = async (req, res , next) => {
  try{
    const { name, email, password } = req.body;
    const isUser = await databseModel.findOne({ email });
    const passwordhashing = await bcryt.hash(password, 10);
    if (req.user) { next(new ErrorHandler("! You are already login", 204))}
    else {
      if (!isUser) {
        const user = await databseModel.create({
          name,
          email,
          password: passwordhashing,
        });
        setCookies(res, 201, user);
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
    next(new ErrorHandler("Bad Request", 400))
  }
};
// login function 
export const userFromDatabase = async (req, res) => {

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
export const userProfile = async (req, res) => {
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