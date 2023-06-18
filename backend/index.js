import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import mongodb from "./database/database.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import HomeRoute from './routes/homepage.js'
export const app = express()
const configpath = path.join(path.resolve() , "/backend/.env")
const pathofenv =  dotenv.config({
    path:configpath
})
app.set("view engine", "ejs");
mongodb()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(path.resolve() , "public")))
app.use(express.static(path.join(path.resolve() , "/src/assets/")))
app.use(HomeRoute)