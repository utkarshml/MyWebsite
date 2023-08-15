
import {app} from "./index.js"
// uncaughtException
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
})

 const server = app.listen(process.env.PORT  || 4000, (req ,res)=>{
    console.log(`server is running ${process.env.PORT || 4000}  `)
})

// caught unhandledRejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
     console.log("Shutting down the server due to unhandled promise rejection");
     server.close(() => {
         process.exit(1);
     }
     );
 })