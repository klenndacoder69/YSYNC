import mongoose from "mongoose";

// if deferral is accepted, we proceed to delete the user (this can be changed also TODO:)
const requestDeferralSchema = new mongoose.Schema({
    // unique since there is only one deferral
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    status: { type: String, required: true, default: "pending", enum: ["pending", "accepted", "rejected"] },
    // default will be changed later TODO:
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const RequestDeferral = mongoose.model("RequestDeferral", requestDeferralSchema);


export default RequestDeferral;