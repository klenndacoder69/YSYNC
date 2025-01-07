import express from 'express';
import userRouter from './routers/userRouter.js';
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

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
        // Connect the client to the server	(optional starting in v4.7)
        console.log("Waiting for connection to MongoDB...")
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. Server successfully connected to MongoDB");
    } catch(error) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if the connection fails
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
