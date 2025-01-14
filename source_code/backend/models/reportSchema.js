import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    reportedID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportedFirstName: { type: String, required: true },
    reportedMiddleName: { type: String, required: false },
    reportedLastName: { type: String, required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const Report = mongoose.model("Report", reportSchema);


export default Report;