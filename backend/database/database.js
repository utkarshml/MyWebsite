import mongoose from "mongoose";

 const mongodb =(next) =>{ 
     mongoose.connect(process.env.MONGO, {
    dbName:"PortfolioUser"
}).then((data)=>{
    console.log("Database is connected")
})
 }

export default mongodb;

