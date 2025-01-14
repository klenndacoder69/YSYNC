import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    reportedEmail: { type: String, required: true, unique: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const ReportUser = mongoose.model("ReportUser", reportSchema);


export default ReportUser;