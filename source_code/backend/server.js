import express from 'express';
import userRouter from './routers/userRouter.js';

// initialize the express
const app = express();

// initialize the routers (these are the things necessary for the endpoints)
userRouter(app);

app.listen(3000, () =>{
    console.log("Server started at port 3000");
})