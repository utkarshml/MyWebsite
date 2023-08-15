import { databseModel } from "../model/user.js";

const serSetHome =(response) =>{
 const { name , EmailVerify ,success }  = response
    return {
       "name": name,
       "EmailVerify": EmailVerify || null,
       "alert" : success || null 
    }
}
export default serSetHome;