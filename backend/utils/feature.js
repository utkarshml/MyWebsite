import jwt from "jsonwebtoken"

export const setCookies = async (res , status , user) =>{
    const cookestoken = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.status(status).cookie("token" , cookestoken)
}