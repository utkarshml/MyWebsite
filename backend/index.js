import express from "express"
import path from "path"
import cookieparser from "cookie-parser"
import dotenv from "dotenv"
import ejs from "ejs"
import HomeRoute from './routes/homepage.js'

export const app = express()
dotenv.config({
    path: path.join(path.resolve() , "/backend/config.env")
})
app.set("view engine", "ejs")
app.use(express.static(path.join(path.resolve() , "public")))
app.use(express.static(path.join(path.resolve() , "/src/assets/")))
app.use(HomeRoute)
app.use(cookieparser())

