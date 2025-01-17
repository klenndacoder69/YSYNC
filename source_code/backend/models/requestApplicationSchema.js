import mongoose from "mongoose";

// after accepting the request, the user is now accepted as a trainee
const requestApplicationSchema = new mongoose.Schema({
    // unique since there is only one application form
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    status: { type: String, required: true, default: "pending", enum: ["pending", "accepted", "rejected"] },
    // default will be changed later TODO:
    appForm: { type: String, required: true, default: "https://drive.google.com/file/d/1i8O9l2NWjBPRXWvEwU4ms-xmi8CliuQY/view?usp=drive_link"},
    createdAt: { type: Date, default: Date.now },
  });

const RequestApplication = mongoose.model("RequestApplication", requestApplicationSchema);


export default RequestApplication;