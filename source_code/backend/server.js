import express from "express";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const corsOptions = {
  // Will be modified later...
};
async function run() {
  try {
    console.log("Waiting for connection to MongoDB...");
    // mongoose connection (removed callbacks since latest version of Mongoose is no longer accepting callbacks)
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose has successfully connected to MongoDB.");
    const verifyConnection = mongoose.connection;
    
    // listen for errors
    verifyConnection.on("error", (err) =>
      console.log(`Connection error ${err}`)
    );
    verifyConnection.once("open", () => console.log("Connected to DB!"));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // if connection fails, exit the server
  }
}

// initialize the express
const app = express();

// cors configuration; (TODO: we'll specify origin and other options later).
app.use(cors());

// automatically parses the json (this is crucial, don't remove this (unless we use axios))
app.use(bodyParser.json());

// initialize the routers (these are the things necessary for the endpoints)
userRouter(app);

run()
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server started at ${process.env.SERVER_PORT}`);
    });
  })
  .catch(console.dir);
