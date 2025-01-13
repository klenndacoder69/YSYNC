import dotenv from "dotenv";
import mongoose from "mongoose";
import Trainee from "../models/traineeSchema.js";
import ResidentMember from "../models/residentMemberSchema.js";

dotenv.config({
  path: "../.env",
});

//Get all active Mentors
const getMentors = async (req, res) => {
  try {
    const resMems = await ResidentMember.find({
      isMentor: true,
    });
    res.status(200).json(resMems);
  } catch (error) {
    res.status(500).json({
      error: "An error has occurred while retrieving the Resident Members.",
    });
  }
};

const getMentorReco = async (req, res) => {
  try {
    const traineeInterests = req.body;
    const mentors = await ResidentMember.find({
      isMentor: true,
    });

    //Mentor match
    const mentorMatch = mentors.map((mentor) => {
      //gets all the mentors from the mentors array,
      const commonInterest = mentor.userId.interests.filter((interest) =>
        traineeInterests.includes(interest)
      );
      return {
        //Returns array with userID: and matchcount;
        userID: mentor.userId, //Should i return userId or mentor itself (does mentor return ObjectID)
        matchCount: commonInterest.length,
      };
    });
    //Sorts the new array in descending order based on match count
    mentorMatch.sort(
      (mentor1, mentor2) => mentor2.matchCount - mentor1.matchCount
    );
    //Gets the top 3 Mentors Matched
    mentorMatch.slice(0, 3);
    res.status(200).json(mentorMatch);
  } catch (error) {
    res.status(500).json({
      error: "An error has occurred while retrieving the Resident Members.",
    });
  }
};

//Get all Trainees
const getAllTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find();
    res.status(200).json(trainees);
  } catch (error) {
    res.status(500).json({
      error: "An error has occurred while retrieving the Trainees.",
    });
  }
};
