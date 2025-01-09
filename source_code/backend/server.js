import express from "express";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

async function run() {
  try {
    console.log("Waiting for connection to MongoDB...");
    // mongoose connection (removed callbacks since latest version of Mongoose is no longer accepting callbacks)
    mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => {
        console.log("Mongoose has successfuly connected to MongoDB.");
      })
      .catch((err) => console.error("Mongoose connection error: ", err));
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

// enable cors for fetching
app.use(cors());

// automatically parses the json (this is crucial, don't remove this)
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
