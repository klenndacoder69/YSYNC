import mongoose from "mongoose";
import User from "./userSchema.js";
import Trainee from "./traineeSchema.js";
import ResidentMember from "./residentMemberSchema.js";
import Admin from "./adminSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import RequestApplication from "./requestApplicationSchema.js";
import RequestDeferral from "./requestDeferralSchema.js";
import Posts from "./postSchema.js";
import Report from "./reportSchema.js";
dotenv.config({
  path: "../.env",
});

const allInterests = [
  "UI/UX Design",
  "Startup",
  "Project Management",
  "Game Art and Design",
  "Digital Media and Content Creation",
  "Entrepreneurship Community",
  "Engagement and Teaching",
  "Hackathons and Coding Competitions",
  "Technical Writing and Documentation",
  "Operating Systems",
  "Scientific Computations",
  "Networking",
  "Database Design and Management",
  "Hardware and Embedded Systems",
  "Algorithm and Problem Solving",
  "Human-Computer Interaction",
  "Software Development and Design",
  "Open Source Contribution",
  "System Administration",
  "Web Development",
  "Cyber Security",
  "Game Development",
  "AI / Machine Learning",
  "Cloud Computing",
  "Dev Ops",
  "Mobile App Development",
  "Data Science and Analytics",
  "Blockchain and Cryptography",
];

// randomly get interests
const getRandomInterests = () => {
  const numInterests = Math.floor(Math.random() * 5) + 1; 
  const shuffled = [...allInterests].sort(() => 0.5 - Math.random()); 
  return shuffled.slice(0, numInterests); 
};

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
      nickname: "AliceSmith",
      about: "Alice loves collecting vintage typewriters and dreams of writing a novel set in the 1950s. She is also a tea enthusiast who can identify over 20 varieties by taste."
    },
    {
      firstName: "Charlie",
      middleName: "D.",
      lastName: "Brown",
      email: "charlie.brown@up.edu.ph",
      password: "password3",
      userType: "admin",
      nickname: "CharlieBrown",
      about: "Charlie is a self-proclaimed comic book aficionado and is secretly working on his own graphic novel. On weekends, he hosts trivia nights for his friends and is undefeated."
    },
    {
      firstName: "Diana",
      middleName: "E.",
      lastName: "Lee",
      email: "diana.lee@up.edu.ph",
      password: "password5",
      userType: "trainee",
      nickname: "DianaLee",
      about: "Diana is a martial arts practitioner who can break a wooden board with a single kick. She also has a knack for solving jigsaw puzzles, often finishing 1000-piece puzzles in a day."
    },
    {
      firstName: "Evan",
      middleName: "F.",
      lastName: "Stone",
      email: "evan.stone@up.edu.ph",
      password: "password6",
      userType: "trainee",
      nickname: "EvanStone",
      about: "Evan is an avid stargazer and can name over 30 constellations. He once built a telescope from scratch and is always the first to spot shooting stars during meteor showers."
    },
    {
      firstName: "Fiona",
      middleName: "G.",
      lastName: "Harris",
      email: "fiona.harris@up.edu.ph",
      password: "password7",
      userType: "trainee",
      nickname: "FionaHarris",
      about: "Fiona is a master baker who specializes in creating artistic cakes. She once made a cake shaped like a galaxy, complete with edible stars and planets."
    },
    {
      firstName: "Jane",
      middleName: "K.",
      lastName: "Scott",
      email: "jane.scott@up.edu.ph",
      password: "password11",
      userType: "trainee",
      nickname: "JaneScott",
      about: "Jane is a skilled photographer who loves capturing candid moments. She has a secret talent for mimicking accents and often entertains her friends with her spot-on impersonations."
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
      nickname: "HannahMiller",
    about: "Hannah is passionate about marine biology and has a collection of seashells from around the world. She enjoys snorkeling and once swam with a pod of dolphins."
    },
    {
      firstName: "Isaac",
      middleName: "J.",
      lastName: "Hall",
      email: "isaac.hall@up.edu.ph",
      password: "password9",
      userType: "trainee",
      nickname: "IsaacHall",
      about: "Isaac is a tech wizard who loves building robots. He once programmed a robot to dance to his favorite songs, earning him the nickname 'DJ Robo.'"
    },
    {
      firstName: "Julia",
      middleName: "K.",
      lastName: "Davis",
      email: "julia.davis@up.edu.ph",
      password: "password10",
      userType: "trainee",
      nickname: "JuliaDavis",
      about: "Julia is a yoga instructor in training who finds peace in nature. She has a green thumb and maintains a thriving garden with over 50 plant species."
    },
  ],
  trainees: [
    { univBatch: 2025 }, 
    { univBatch: 2024 },
    { univBatch: 2026 },
    { univBatch: 2023 },
    { univBatch: 2025 },
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
    await Report.deleteMany({});
    await RequestApplication.deleteMany({});
    await RequestDeferral.deleteMany({});
    await Posts.deleteMany({});
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
      interests: getRandomInterests(),
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
      interests: getRandomInterests(),
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
      interests: getRandomInterests(), // Interests
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
