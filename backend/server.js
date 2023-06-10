import express from "express"
import path from "path"

const app = express()
console.log(path.join(path.resolve() , "public"))
app.use(express.static(path.join(path.resolve() , "public")))

app.listen("3000" , (req ,res)=>{
    console.log("server is running")
})

