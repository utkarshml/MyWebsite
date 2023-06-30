import mongoose from "mongoose";
import ErrorHandler from "../utils/error.js";

 const mongodb =(next) =>{ 
     mongoose.connect( process.env.MONGO , {
    dbName:"PortfolioUser"
}).then(()=>{
    console.log("database is connected")
}).catch(e => next(new ErrorHandler("Databse not Connect")) )
} 
export default mongodb;
