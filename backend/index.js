import express from "express"
import path from "path"
import cookieparser from "cookie-parser"
import dotenv from "dotenv"

export const app = express()
dotenv.config({
    path: "./config.env"
})
app.use(express.static(path.join(path.resolve() , "public")))
app.use(express.static(path.join(path.resolve() , "/src/assets/")))
console.log(path.join(path.resolve() , "/src/assets/"))
app.use(cookieparser())

