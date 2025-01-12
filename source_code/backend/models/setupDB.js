import mongoose from 'mongoose';
import User from './userSchema.js';
import Trainee from './traineeSchema.js';
import ResidentMember from './residentMemberSchema.js';
import Admin from './adminSchema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
})
// Database connection URI
const MONGODB_URI = process.env.DB_URI;

// Sample data
const sampleData = {
  users: [
    {
      firstName: 'Alice',
      middleName: 'B.',
      lastName: 'Smith',
      email: 'alice.smith@up.edu.ph',
      password: 'hashedPassword1',
      userType: 'trainee',
    },
    {
      firstName: 'Bob',
      middleName: 'C.',
      lastName: 'Jones',
      email: 'bob.jones@up.edu.ph',
      password: 'hashedPassword2',
      userType: 'residentMember',
    },
    {
      firstName: 'Charlie',
      middleName: 'D.',
      lastName: 'Brown',
      email: 'charlie.brown@up.edu.ph',
      password: 'hashedPassword3',
      userType: 'admin',
    },
  ],
  trainees: [
    {
      interests: ['AI', 'Cybersecurity'],
      univBatch: 2025,
    },
  ],
  residentMembers: [
    {
      orgBatch: 2023,
      department: 'IT',
      status: 'active',
      isMentor: true,
      whyYouShouldChooseMe: 'I have excellent problem-solving skills.',
      whatToExpect: 'Mentorship and guidance in project execution.',
    },
  ],
};

// Function to populate the database
const populateDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');

    // Clear existing data
    await User.deleteMany({});
    await Trainee.deleteMany({});
    await ResidentMember.deleteMany({});
    await Admin.deleteMany({});
    console.log('Existing data cleared.');

    // Hash each password

    sampleData.users.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
    })
    // Create users
    const [traineeUser, resMemUser, adminUser] = await User.insertMany(sampleData.users);
    console.log('Users created.');

    console.log("Trainee: ", traineeUser)
    console.log("Resident Member: ", resMemUser)
    console.log("Admin: ", adminUser)

    // Create trainees
    const traineeData = { ...sampleData.trainees[0], userId: traineeUser._id };
    const trainee = await Trainee.create(traineeData);
    console.log('Trainee created.');

    // Create resident members
    const residentMemberData = {
      ...sampleData.residentMembers[0],
      userId: resMemUser._id,
      traineeId: trainee._id,
    };
    await ResidentMember.create(residentMemberData);
    console.log('Resident Member created.');

    // Create admins
    await Admin.create({ userId: adminUser._id });
    console.log('Admin created.');

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up the database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// populate
populateDatabase();
