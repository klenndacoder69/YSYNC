import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    hearts: { type: Number, default: 0, required: true },
    comments: { type: Number, default: 0, required: true },
    isAnnouncement: { type:Boolean, required: true },
    isPinned: { type:Boolean, required: true },
    isEvent: { type:Boolean, required: true },
    attachment: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

const Posts = mongoose.model("Posts", postSchema);


export default Posts;