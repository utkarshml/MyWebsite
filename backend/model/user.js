import mongoose from "mongoose";

 const userDatabase = mongoose.Schema({
    name:
    {type:String,
    required : true},
    email:{
     type: String,
     required:true
    },
    password:{
        type:String,
        select:false,
        required:true
    }

})

export const databseModel = mongoose.model("user" , userDatabase)