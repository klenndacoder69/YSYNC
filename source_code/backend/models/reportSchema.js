import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const ReportUser = mongoose.model("ReportUser", reportSchema);


export default ReportUser;