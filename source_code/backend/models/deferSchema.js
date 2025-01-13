import mongoose from "mongoose";

const deferSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const DeferTrainee = mongoose.model("DeferTrainee", deferSchema);


export default DeferTrainee;