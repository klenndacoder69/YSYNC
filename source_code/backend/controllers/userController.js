import User from "../models/userSchema.js";
import Report from "../models/reportSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RequestApplication from "../models/requestApplicationSchema.js";
import ResidentMember from "../models/residentMemberSchema.js";
import Trainee from "../models/traineeSchema.js";
// sample:
// import ResidentMember from "../models/residentMemberSchema.js";
// import Trainee from "../models/traineeSchema.js";
const userSignIn = async (req, res) => {
  try {
    console.log("This is the request body", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // check if user exists in the database
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // create and assign the jwt
    const accessToken = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      role: user.userType,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: "An error has occurred while signing in." });
  }
};

const userRegister = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      nickname,
      univBatch,
      orgBatch,
      birthday,
      about,
      interests,
    } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // we set userType to trainee (TODO: this will be changed later on)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      middleName,
      email,
      password: hashedPassword,
      nickname: nickname ? nickname : firstName,
      about: about ? about : `Hello! I am ${firstName}`,
      birthday: birthday ? birthday : new Date(),
    });
    console.log("test", user);
    // create the user
    await user.save();
    // create an application form
    const application = new RequestApplication({
      userId: user._id,
      interests: interests,
      univBatch: univBatch,
    });
    await application.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occured while registering the user." });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters
    const user = await User.findById(userId); // Find the user by their ID
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user); // Send the user data as a JSON response
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while fetching the user data." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while retrieving users." });
  }
};
const reportRequest = async (req, res) => {
  try {
    const { userId, reason } = req.body;

    // create reportUser object
    const reportUser = new Report({
      userId,
      reason,
      createdAt: new Date(), // Add any additional fields as needed
    });

    // Save the new ReportUser document
    await reportUser.save();
    res.status(201).json({ message: "Submitted successfully." });
  } catch (error) {
    console.error("Error occurred while submitting report:", error); // Log the error
    res.status(500).json({ error: "An error has occurred while submitting." });
  }
};

const migrateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { orgBatch } = req.body;
    console.log(userId, orgBatch);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // set the user type to residentMember
    user.userType = "residentMember";
    await user.save();
    console.log("Successfully updated user type.");
    // find the associated trainee
    const trainee = await Trainee.findOne({ userId });
    console.log("Successfully found trainee.");
    console.log(trainee);
    // create a new resident member object and add the userId and traineeId, and orgBatch
    await ResidentMember.create({
      userId: userId,
      traineeId: trainee._id,
      orgBatch: orgBatch,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Successfully migrated user.");
    res.status(200).json({ message: "User migrated successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error has occurred while migrating the user." });
  }
};

export {
  userSignIn,
  userRegister,
  getUser,
  getAllUsers,
  reportRequest,
  migrateUser,
  // testFunction
};
