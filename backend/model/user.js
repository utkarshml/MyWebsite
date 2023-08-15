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
    },
    UserMessege : [
       { name: {
        type:String,
       } ,
       email: {
        type:String
       },
        subject : {
            type:String,
        },
        message : {
            type:String,
        },
        lastUpdate: {
            type : Date,
            default: Date.now()
        }
    }
    ]
    ,

    createdAt:{
        type:Date,
        default:Date.now()
    }
    ,
    EmailVerify:{
        type:Boolean,
        default:false
    }

})

export const databseModel = mongoose.model("user" , userDatabase)