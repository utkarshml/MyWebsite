import { databseModel } from "../model/user.js";

const serSetHome =(response) =>{
   console.log(response)
 const { name , EmailVerify }  = response
    return {
       "name": name,
       "EmailVerify":EmailVerify
    }
}
export default serSetHome;