import  express  from "express";
import { home , userlogin , userSignup , userAddDatabase , userFromDatabase } from "../controllers/homepage.js"

const router = express.Router()

router.get("/" , home)
router.get("/login" , userlogin)
router.get("/signup" , userSignup)

router.post("/signup" , userAddDatabase)
router.post("/login" , userFromDatabase)

export default router;