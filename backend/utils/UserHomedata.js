import { databseModel } from "../model/user.js";

const serSetHome =(response) =>{
 const { name , EmailVerify }  = response
    return {
       "name": name,
       "EmailVerify": EmailVerify || null
    }
}
export default serSetHome;