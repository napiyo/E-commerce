const app = require('./app.js');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database.js');



 // Handling uncaught Exception
 process.on("uncaughtException",(err) =>{
    console.log(`Error : ${err.message}`);
    console.log("shutting server down due to uncaughtException Error");
   
        process.exit(1);
   
});


dotenv.config({path:'./config/config.env'})

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server running ${process.env.PORT}`);
})
 // unhandled promise Rejection
 process.on("unhandledRejection",(err) =>{
     console.log(`Error : ${err.message}`);
     console.log("shutting server down due to unhandledRejection Error");
     server.close(()=>{
         process.exit(1);
     });
 });