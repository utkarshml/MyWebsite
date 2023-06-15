import express from "express"
import path from "path"
import ejs from "ejs"
import cookieParser from "cookie-parser"
import mongodb from "./database/database.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import HomeRoute from './routes/homepage.js'
mongodb()
export const app = express()
dotenv.config({
    path: path.join(path.resolve() , "/backend/config.env")
})
app.use(express.static(path.join(path.resolve() , "public")))
app.use(express.static(path.join(path.resolve() , "/src/assets/")))
app.use(HomeRoute)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.set("view engine", "ejs")
