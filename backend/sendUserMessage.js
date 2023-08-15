
import otpgen from "../model/otpgen.js";
import nodemailer from "nodemailer";
import AsyncCatch from "./asynccatch.js";

const SendUserMessage = AsyncCatch(async (req , res) => {

  const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

  // Save Otp in database 

     const info = await transporter.sendMail({
     from: process.env.SMTP_EMAIL, // sender address
     to: "utkarshjais8957@gmail.com", // list of receivers
     subject: req.subject, // Subject line
     text: req.message, // plain text body
    });
     console.log("Message sent: %s" ,info.messageId)
   }
)
export default SendUserMessage;