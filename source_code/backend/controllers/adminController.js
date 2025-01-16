import mongoose from "mongoose";
import User from "../models/userSchema.js";
import Trainee from "../models/traineeSchema.js";
import ResidentMember from "../models/residentMemberSchema.js";
import Report from "../models/reportSchema.js";
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

            if(trainee){
                Object.assign(trainee, user);
                await trainee.save();
            }

        // check if resmem
        } else if (userType === "residentMember") {
            const trainee = await Trainee.findById(user.traineeId._id);
            console.log("Trainee: ", trainee);

            if(trainee){
                Object.assign(trainee, user.traineeId);
                await trainee.save();
            }

            const resmem = await ResidentMember.findById(userId);
            console.log("ResidentMember: ", resmem);

            if(resmem){
                Object.assign(resmem, user);
                await resmem.save();
            }
        }

        res.status(200).json({ message: "User updated successfully across all collections." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { user, userType } = req.body;
        console.log("Deleting user with ID:", user._id);

        if (user.userId && typeof user.userId === "object") {
            await User.findByIdAndDelete(user.userId._id);
        }

        if (userType === "trainee") {
            await Trainee.findByIdAndDelete(user._id);
        } else if (userType === "residentMember") {
            await Trainee.findByIdAndDelete(user.traineeId._id);
            await ResidentMember.findByIdAndDelete(user._id);
        }

        res.status(200).json({ message: "User and associated records deleted successfully." });
    }
    catch (error) {

    }
}

const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().populate("userId");
        console.log(reports)
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while retrieving reports." });
    }
}

const resolveReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        report.status = "resolved";
        await report.save();
        res.status(200).json({ message: "Report resolved successfully." });
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while resolving the report." });
    }
}

const declineReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        report.status = "declined";
        await report.save();
        res.status(200).json({ message: "Report declined successfully." });
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while deleting the report." });
    }
}

const deleteReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        await Report.findByIdAndDelete(reportId);
        res.status(200).json({ message: "Report deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while deleting the report." });
    }
}
export { editUser, deleteUser, getAllReports, resolveReport, deleteReport, declineReport };
