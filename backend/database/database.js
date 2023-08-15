import mongoose from "mongoose";

 const mongodb =(next) =>{ 
     mongoose.connect("mongodb://127.0.0.1:27017" , {
    dbName:"PortfolioUser"
}).then((data)=>{
    console.log("Database is connected")
})
 }

export default mongodb;

