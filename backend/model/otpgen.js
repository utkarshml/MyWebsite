import mongoose from "mongoose";// Erase if already required

// Declare the Schema of the Mongo model
var otpSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    expiresAt:{
        type:Date,
        default:Date.now() + 90000,
    }

});

//Export the model
const  otpModel  = mongoose.model("otp", otpSchema);
export default otpModel;