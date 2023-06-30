import jwt from "jsonwebtoken"

export const setCookies = async (res , status , user) =>{
    const cookestoken = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.status(status).cookie("token" , cookestoken , {
        expires : new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly : true,
        sameSite : process.env.NODE_ENV === 'Devolopment' ? "lax": "none",
        secure :  process.env.NODE_ENV === 'Devolopment' ? false : true
    })
}
