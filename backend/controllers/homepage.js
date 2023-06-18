import { databseModel } from "../model/user.js";
import bcryt from "bcrypt";
import { setCookies } from "../utils/feature.js";
import userSetHome from "../utils/UserHomedata.js";
export const home = (req, res) => {
  if (req.user) {
    res.render("index", userSetHome(req.user.name));
  } else {
    res.render("index");
  }
};

export const userlogin = (req, res) => {
  if (req.user) {
    res.render("index", userSetHome(req.user));
  } else {
    res.render("login");
  }
};
export const userSignup = (req, res) => {
  if (req.user) {
    res.render("index", userSetHome(req.user));
  } else {
    res.render("signup");
  }
};

export const userAddDatabase = async (req, res) => {
  const { name, email, password } = req.body;
  const isUser = await databseModel.findOne({ email });
  const passwordhashing = await bcryt.hash(password, 10);
  if (req.user) {
    res.status(400).json({
      success: true,
      message: "! You are already login",
    });
  } else {
    if (!isUser) {
      const user = await databseModel.create({
        name,
        email,
        password: passwordhashing,
      });
      setCookies(res, 201, user);
      res.render("index", userSetHome(user));
    } else {
      res.status(400).render("signup", {
        display: "block",
        alert: "! You Account already",
        email: req.body.email,
      });
    }
  }
};
export const userFromDatabase = async (req, res) => {
  if (req.user) {
    res.status(400).json({
      success: true,
      message: "! You are already login",
    });
  } else {
 
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
}; }

export const userProfile = async (req, res) => {
  res.status(200).json({
    message: req.user,
  });
};

export const userlogout = (req, res) => {
  res.cookie("tokken", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).render("index");
};
