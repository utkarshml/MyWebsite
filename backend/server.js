import {app} from "./index.js"

app.listen(process.env.PORT  || 4000, (req ,res)=>{
    console.log(`server is running ${process.env.PORT || 4000}  `)
})


