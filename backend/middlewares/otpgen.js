
import nodemailer from "nodemailer"
import otpGen from "otp-generator"

const otpsend = async (req , res ,next) =>{
  const otp =  otpGen.generate(6 ,{lowerCaseAlphabets : false  , upperCaseAlphabets : false , specialChars : false})
    const sendOtp = {
       from: process.env.SMTP_EMAIL,
       to : req.body.email,
       subject: "Email Verification",
        text: "Hello world?", // plain text body
        html: `<b>${otp}</b>`, 
        };  

        const transporter =  nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure : true,
            auth: {
                user:  	process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            });
            const info = await transporter.sendMail(sendOtp);
            req.locals = otp
            next()
            }


     export default otpsend;

