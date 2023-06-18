import mongoose from "mongoose";

 const mongodb =() =>{ 
     mongoose.connect( process.env.MONGO , {
    dbName:"PortfolioUser"
}).then(()=>{
    console.log("database is connected")
}).catch(e => console.log(e))
} 
export default mongodb;
