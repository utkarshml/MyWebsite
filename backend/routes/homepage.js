import  express  from "express";
import { home , userlogin , userSignup ,  Message, userAddDatabase  , ResendOtp, userFromDatabase  , userProfile , userlogout , verifyEmail , verify} from "../controllers/homepage.js"
import bodyParser from "body-parser";
import isVerify from "../middlewares/verifyCheck.js";
import {isCookies} from "../middlewares/isCookies.js"
import { isAuth } from "../middlewares/auth.js";

const router = express.Router()
express().use(bodyParser.json())
express().use(bodyParser.urlencoded({ extended:true}))

router.get("/" ,isCookies, home)
router.get("/login" ,isCookies, userlogin)
router.get("/signup" ,isCookies , userSignup)

router.post("/signup" , userAddDatabase)
router.post("/login"  , userFromDatabase)
router.get("/user" , isAuth, userProfile)
router.post("/logout" , userlogout)
router.post("/message" ,  isCookies , Message)
router.route("/verify").get( isVerify , verify).post(verifyEmail)
router.route("/resend" ).get(isAuth, isCookies ,isVerify, ResendOtp)
export default router;