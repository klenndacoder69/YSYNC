import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ['trainee', 'residentMember', 'admin', 'pending', 'rejected'],
      default: 'pending',
      required: true
    },
    image: { type: String, default: "https://a.storyblok.com/f/178900/640x360/4aaaa615e9/419f2683754a97abca0f15b660b2645e1682163751_main.png/m/filters:quality(95)format(webp)", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // these are all optional parameters that will be implemented in the future
    nickname: { type: String },
    about: { type: String },
    birthday: { type: Date, default: Date.now },
  });

const User = mongoose.model("User", userSchema);


export default User;