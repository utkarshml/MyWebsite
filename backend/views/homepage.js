import  express  from "express";
import { home } from "./controllers/homepage.js"

const router = express.Router()

router.get("/" , home)