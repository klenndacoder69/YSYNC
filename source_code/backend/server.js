import express from 'express';
import userRouter from './routers/userRouter.js';
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

// (Template by: MongoDB)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
    try {
        console.log("Waiting for connection to MongoDB...")
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. Server successfully connected to MongoDB");
    } catch(error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // if connection fails, exit the server
    }
}


// initialize the express
const app = express();

// initialize the routers (these are the things necessary for the endpoints)
userRouter(app);

run().then(() =>{
    app.listen(process.env.SERVER_PORT, () =>{
        console.log(`Server started at ${process.env.SERVER_PORT}`);
    })
}).catch(console.dir);
