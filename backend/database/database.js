import mongoose from "mongoose";
import ErrorHandler from "../utils/error.js";

 const mongodb =(next) =>{ 
     mongoose.connect( process.env.MONGO || "mongodb://127.0.0.1:27017" , {
    dbName:"PortfolioUser"
}).then((data)=>{
    console.log("database is connected")
}).catch((err) => {
   new ErrorHandler(err)
})
 }

export default mongodb;
