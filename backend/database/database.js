import mongoose from "mongoose";
import ErrorHandler from "../utils/error.js";

 const mongodb =(next) =>{ 
     mongoose.connect( process.env.MONGO , {
    dbName:"PortfolioUser"
}).then((data)=>{
    console.log("database is connected")
}).catch((err) => {
   new ErrorHandler(err)
})
 }

export default mongodb;
