
import otpgen from "../model/otpgen.js";
import nodemailer from "nodemailer"
export const OtpSender = (req , res) =>{
    const GENERATED = Math.floor(Math.random() * 9000) + 1000
   // Save Otp in database 
    otpgen.create({
        id:req._id,
        otp:`${GENERATED}`
    }).then((data)=>{
        console.log("otp is saved")
    }).catch((err)=>{
        console.log(err)
    })


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'utkarshjais8957@gmail.com',
          pass: 'fbcnxoxpiwaioyns'
        }
      });
   // async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "utkarshjais8957@gmail.com", // sender address
      to: req.email, // list of receivers
      subject: "Otp Verification", // Subject line
      text: `Hello dear ${req.name}`, // plain text body
      html: `<h1>Your OTP is <strong>${GENERATED}</strong></h1>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
  
  main().catch(console.error);
     
}