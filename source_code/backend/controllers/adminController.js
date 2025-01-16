import mongoose from "mongoose";
import User from "../models/userSchema.js";
import Trainee from "../models/traineeSchema.js";
import ResidentMember from "../models/residentMemberSchema.js";
import Report from "../models/reportSchema.js";
import Posts from "../models/postSchema.js";
import RequestApplication from "../models/requestApplicationSchema.js";
import RequestDeferral from "../models/requestDeferralSchema.js";
const editUser = async (req, res) => {
  try {
    const { user, userType, userId } = req.body;
    console.log(user, userType, userId);

    // check whether it has a userId then we update the contents associated with the User schema
    if (user.userId && typeof user.userId === "object") {
      const userDoc = await User.findById(user.userId._id);
      if (userDoc) {
        Object.assign(userDoc, user.userId);
        await userDoc.save();
      }
    }

    // check if trainee
    if (userType === "trainee") {
      // find trainee with its populated userId
      const trainee = await Trainee.findById(userId);
      console.log("Trainee: ", trainee);

      if (trainee) {
        Object.assign(trainee, user);
        await trainee.save();
      }

      // check if resmem
    } else if (userType === "residentMember") {
      const trainee = await Trainee.findById(user.traineeId._id);
      console.log("Trainee: ", trainee);

      if (trainee) {
        Object.assign(trainee, user.traineeId);
        await trainee.save();
      }

      const resmem = await ResidentMember.findById(userId);
      console.log("ResidentMember: ", resmem);

      if (resmem) {
        Object.assign(resmem, user);
        await resmem.save();
      }
    }

    res
      .status(200)
      .json({ message: "User updated successfully across all collections." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user, userType } = req.body;
    const userId = user.userId;
    // we delete all database collections associated with the user (this can be changed later if needed)
    console.log("Deleting all reports with userId:", userId);
    await Report.deleteMany({ userId });

    console.log("Deleting all posts with userId:", userId);
    await Posts.deleteMany({ userId });

    console.log("Deleting all defers with userId:", userId);
    await DeferTrainee.deleteMany({ userId });

    console.log("Deleting user with ID:", userId);

    if (user.userId && typeof user.userId === "object") {
      await User.findByIdAndDelete(userId);
    }

    if (userType === "trainee") {
      await Trainee.findByIdAndDelete(user._id);
    } else if (userType === "residentMember") {
      await Trainee.findByIdAndDelete(user.traineeId._id);
      await ResidentMember.findByIdAndDelete(user._id);
    }

    res
      .status(200)
      .json({ message: "User and associated records deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while deleting the user." });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("userId");
    console.log(reports);
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while retrieving reports." });
  }
};

const resolveReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId);
    report.status = "resolved";
    await report.save();
    res.status(200).json({ message: "Report resolved successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while resolving the report." });
  }
};

const declineReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId);
    report.status = "declined";
    await report.save();
    res.status(200).json({ message: "Report declined successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while deleting the report." });
  }
};

const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    await Report.findByIdAndDelete(reportId);
    res.status(200).json({ message: "Report deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while deleting the report." });
  }
};

const getAllRequestApplications = async (req, res) => {
  try {
    const reports = await RequestApplication.find().populate("userId");
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while retrieving requests." });
  }
};

const getAllRequestDeferrals = async (req, res) => {
  try {
    const reports = await RequestDeferral.find().populate("userId");
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while retrieving requests." });
  }
};

// there are six user types (trainee, residentMember, admin, pending, rejected, terminated)
// if user is rejected, they applied for a trainee but hasn't been accepted
// if user is in pending, they are currently in the process of being accepted
// if user is terminated, tgese are  any user that has become a trainee but did not continue
const acceptApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await RequestApplication.findById(
      applicationId
    ).populate("userId");
    application.status = "accepted";
    await application.save();
    // update the user's usertype
    await User.findByIdAndUpdate(application.userId._id, { userType: "trainee" });
    // create into trainee
    await Trainee.create({ userId: application.userId._id });
    res.status(200).json({ message: "Application accepted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error has occurred while accepting the application.",
      });
  }
};

const declineApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await RequestApplication.findById(
      applicationId
    ).populate("userId");
    application.status = "rejected";
    await application.save();
    await User.findByIdAndUpdate(application.userId._id, { userType: "rejected" });
    res.status(200).json({ message: "Application declined successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error has occurred while declining the application.",
      });
  }
};

const acceptDeferral = async (req, res) => {
  try {
    const deferralId = req.params.id;
    const deferral = await RequestDeferral.findById(deferralId).populate(
      "userId"
    );
    deferral.status = "accepted";
    await deferral.save();
    // update the user's usertype
    await User.findByIdAndUpdate(deferral.userId._id, { userType: "terminated" });
    res.status(200).json({ message: "Deferral accepted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while accepting the deferral." });
  }
};

const declineDeferral = async (req, res) => {
  try {
    const deferralId = req.params.id;
    const deferral = await RequestDeferral.findById(deferralId).populate(
      "userId"
    );
    deferral.status = "rejected";
    // userType stays as it is
    await deferral.save();
    res.status(200).json({ message: "Deferral declined successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while declining the deferral." });
  }
};
export {
  editUser,
  deleteUser,
  getAllReports,
  resolveReport,
  deleteReport,
  declineReport,
  getAllRequestApplications,
  getAllRequestDeferrals,
  acceptApplication,
  declineApplication,
  acceptDeferral,
  declineDeferral,
};
