import mongoose from "mongoose";
import User from "./userSchema.js";
import Trainee from "./traineeSchema.js";
import ResidentMember from "./residentMemberSchema.js";
import Admin from "./adminSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

// Database connection URI
const MONGODB_URI = process.env.DB_URI;

// Sample data
const sampleData = {
  users: [
    {
      firstName: "Alice",
      middleName: "B.",
      lastName: "Smith",
      email: "alice.smith@up.edu.ph",
      password: "password1",
      userType: "trainee",
    },

    {
      firstName: "Charlie",
      middleName: "D.",
      lastName: "Brown",
      email: "charlie.brown@up.edu.ph",
      password: "password3",
      userType: "admin",
    },

    {
      firstName: "Diana",
      middleName: "E.",
      lastName: "Lee",
      email: "diana.lee@up.edu.ph",
      password: "password5",
      userType: "trainee",
    },
    {
      firstName: "Evan",
      middleName: "F.",
      lastName: "Stone",
      email: "evan.stone@up.edu.ph",
      password: "password6",
      userType: "trainee",
    },
    {
      firstName: "Fiona",
      middleName: "G.",
      lastName: "Harris",
      email: "fiona.harris@up.edu.ph",
      password: "password7",
      userType: "trainee",
    },

    {
      firstName: "Jane",
      middleName: "K.",
      lastName: "Scott",
      email: "jane.scott@up.edu.ph",
      password: "password11",
      userType: "trainee",
    },
  ],
  traineeSample: [
    {
      firstName: "Hannah",
      middleName: "I.",
      lastName: "Miller",
      email: "hannah.miller@up.edu.ph",
      password: "password8",
      userType: "trainee",
    },
    {
      firstName: "Isaac",
      middleName: "J.",
      lastName: "Hall",
      email: "isaac.hall@up.edu.ph",
      password: "password9",
      userType: "trainee",
    },
    {
      firstName: "Julia",
      middleName: "K.",
      lastName: "Davis",
      email: "julia.davis@up.edu.ph",
      password: "password10",
      userType: "trainee",
    },
  ],
  trainees: [
    { interests: ["AI", "Cybersecurity"], univBatch: 2025 },
    { interests: ["Web Development"], univBatch: 2024 },
    { interests: ["Game Design"], univBatch: 2026 },
    { interests: ["Data Science"], univBatch: 2023 },
    { interests: ["Networking"], univBatch: 2025 },
  ],
  residentMembers: [
    {
      orgBatch: 2023,
      department: "IT",
      status: "active",
      isMentor: true,
      whyYouShouldChooseMe: "I enjoy teaching.",
      whatToExpect: "Hands-on mentorship.",
    },
    { orgBatch: 2022, department: "CS", status: "active", isMentor: false },
    {
      orgBatch: 2021,
      department: "Engg",
      status: "inactive",
      isMentor: true,
      whyYouShouldChooseMe: "Expert in system design.",
      whatToExpect: "Detailed design advice.",
    },
    { orgBatch: 2023, department: "IS", status: "alumni", isMentor: false },
    {
      orgBatch: 2020,
      department: "SE",
      status: "active",
      isMentor: true,
      whyYouShouldChooseMe: "Passionate about problem-solving.",
      whatToExpect: "Critical thinking guidance.",
    },
  ],
};

// Function to populate the database
const populateDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    // Clear existing data
    await User.deleteMany({});
    await Trainee.deleteMany({});
    await ResidentMember.deleteMany({});
    await Admin.deleteMany({});
    console.log("Existing data cleared.");

    // Hash passwords
    for (const user of sampleData.users) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

    // Create users
    const users = await User.insertMany(sampleData.users);
    console.log("Users created.");
    
    // Assign trainees
    const traineeUsers = users.filter((user) => user.userType === "trainee");
    console.log("Trainee users: ", traineeUsers)
    const traineeData = sampleData.trainees.map((trainee, index) => ({
      userId: traineeUsers[index]._id,
      interests: sampleData.trainees[index].interests,
      univBatch: sampleData.trainees[index].univBatch,
    }));
    await Trainee.insertMany(traineeData);
    console.log("Trainees created.");
    
    // Assign resident members (with interests and univBatch inherited from trainees)
    const trainees = await Trainee.find();
    const residentMemberData = trainees.map(
      (trainee, index) => ({
        ...trainee,
        userId: trainee.userId,
        traineeId: trainee._id,
        orgBatch: sampleData.residentMembers[index].orgBatch,
        department: sampleData.residentMembers[index].department,
        status: sampleData.residentMembers[index].status,
        isMentor: sampleData.residentMembers[index].isMentor,
        whyYouShouldChooseMe: sampleData.residentMembers[index].whyYouShouldChooseMe,
        whatToExpect: sampleData.residentMembers[index].whatToExpect,
      })
    );
    const residentMembers = await ResidentMember.insertMany(residentMemberData);
    console.log("Resident Members created.");

    // Update userType in the User collection to 'residentMember'
    await Promise.all(
      residentMemberData.map(async (residentMember) => {
        await User.updateOne(
          { _id: residentMember.userId },
          { userType: "residentMember" }
        );
      })
    );

    // Hash passwords

    for (const user of sampleData.traineeSample) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
    console.log(sampleData.traineeSample)
    await User.insertMany(sampleData.traineeSample);
    console.log("Other users created.");
    const otherUsers = await User.find();
    console.log("Other users fetched.");
    const otherTraineeUsers = otherUsers.filter((user) => user.userType === "trainee");
    console.log("Other trainee users:", otherTraineeUsers);
    const otherTraineeData = otherTraineeUsers.map((trainee, index) => ({
      userId: trainee._id,
      interests: sampleData.trainees[index].interests,
      univBatch: sampleData.trainees[index].univBatch
    }))
    console.log(otherTraineeData)
    // const otherTraineeData = sampleData.trainees.map((trainee, index) => ({
    //   ...trainee, 
    //   userId: otherTraineeUsers[index]._id
    // }));
    // console.log(otherTraineeData)
    await Trainee.insertMany(otherTraineeData);
    console.log("Other trainees created.")


    // Assign admin
    const adminUser = users.find((user) => user.userType === "admin");
    await Admin.create({ userId: adminUser._id });
    console.log("Admin created.");

    const hashedPassword = bcrypt.hashSync("password12", 10); // Dummy password

    // Step 1: Create the user
    const user = new User({
      firstName: "Zara",
      middleName: "L.",
      lastName: "Williams",
      email: "zara.williams@up.edu.ph",
      password: hashedPassword,
      userType: "residentMember", // Initial user type
    });
    console.log("Creating user:", user);
    await user.save();

    // Step 2: Create the trainee
    const trainee = new Trainee({
      userId: user._id, // Reference to the created user
      interests: ["AI", "Cybersecurity", "UI/UX", "Database"], // Interests
      univBatch: 2023, // University batch
    });
    console.log("Creating trainee:", trainee);
    await trainee.save();

    // Step 3: Promote the trainee to a resident member
    const residentMember = new ResidentMember({
      userId: user._id, // Reference to the same user
      traineeId: trainee._id, // Reference to the trainee
      orgBatch: 2024, // Organization batch
      department: "VL", // Example department
      status: "active", // Resident member's status
      isMentor: true, // Mentorship status
      whyYouShouldChooseMe: "I enjoy teaching.", // Reason for being a mentor
      whatToExpect: "Hands-on mentorship.", // Expectations from mentorship
      interests: trainee.interests, // Interests from trainee
      univBatch: trainee.univBatch, // University batch from trainee
    });
    console.log("Creating resident member:", residentMember);
    await residentMember.save();

    console.log("Database setup complete!");
  } catch (error) {
    console.error("Error setting up the database:", error);
  } finally {
    mongoose.connection.close();
  }
};

// populate
populateDatabase();
