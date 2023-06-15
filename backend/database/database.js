import mongoose from "mongoose";
console.log(process.env.MONGO_URI)
 const mongodb =() =>{ 
     mongoose.connect( "mongodb://127.0.0.1:27017", {
    dbName:"PortfolioUser"
}).then(()=>{
    console.log("database is connected")
}).catch(e => console.log(e))
} 
export default mongodb;