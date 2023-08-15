
import otpgen from "../model/otpgen.js";
import nodemailer from "nodemailer";
import AsyncCatch from "./asynccatch.js";
import { ErrorMiddlewares } from "../middlewares/ErrorMiddlewares.js";
export const OtpSender = AsyncCatch(async (req , res) => {

  const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const GENERATED = Math.floor(Math.random() * 9000) + 1000
  // Save Otp in database 
  const databaseCheck = await otpgen.findOne({id:req._id})
  if(!databaseCheck){
     const info = await transporter.sendMail({
     from: process.env.SMTP_EMAIL, // sender address
     to: req.email, // list of receivers
     subject: "Otp Verification", // Subject line
     text: `Hello dear ${req.name}`, // plain text body
     html: `<h1>Your OTP is <strong>${GENERATED}</strong></h1>`, // html body
   });
    otpgen.create({
         id:req._id,
         otp:`${GENERATED}`
     }).then((data)=>{
         console.log("otp is saved")
     })
     console.log("Message sent: %s", info.messageId);
     return info
   }
  }
)