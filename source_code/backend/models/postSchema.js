import mongoose from "mongoose";
import User from "../models/userSchema.js";  // Import the User model

const postSchema = new mongoose.Schema({
  // posts are equivalent to announcements (we just refer to posts as announcements)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  hearts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] },
  
  // Embed the User model in comments
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Embed userId from the User model
    text: { type: String, required: true }
  }],
  
  isPinned: { type: Boolean, default: false },
  isEvent: { type: Boolean, default: false },
  eventDate: { type: Date },
  attachment: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
