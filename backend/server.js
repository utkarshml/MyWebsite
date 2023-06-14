import {app} from "./index.js"

app.listen(process.env.PORT , (req ,res)=>{
    console.log(`server is running`)
})
