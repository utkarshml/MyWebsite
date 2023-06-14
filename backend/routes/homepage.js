import  express  from "express";
import { home , userlogin , userSignup } from "../controllers/homepage.js"

const router = express.Router()

router.get("/" , home)
router.get("/login" , userlogin)
router.get("/signup" , userSignup)

export default router;