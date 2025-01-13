import mongoose from "mongoose";

const deferSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainee', required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const DeferTrainee = mongoose.model("DeferTrainee", deferSchema);


export default DeferTrainee;