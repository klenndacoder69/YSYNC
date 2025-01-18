import Trainee from "../models/traineeSchema.js";
import RequestDeferral from "../models/requestDeferralSchema.js";

const deferRequest = async (req, res) => {
    try {
        const { userId, reason } = req.body;
        console.log(req.body)
        // create deferTrainee object
        const deferTrainee = new RequestDeferral({
            userId,
            reason
        });

        // check for existing deferTrainee
        const existingDeferTrainee = await RequestDeferral.findOne({ userId: userId._id });
        if (existingDeferTrainee) {
            return res.status(400).json({ error: "Trainee deferral already exists."});
        }

        // Save the new DeferTrainee document
        await deferTrainee.save().then(() => {
            res.status(201).json({ message: "Submitted successfully."});
        }).catch((err) => {
            res.status(500).json({ error: "An error has occured while submitting deferral."});
        });
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while submitting deferral." });
    }
}

const getTrainee = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from request parameters
        const trainee = await Trainee.findOne({userId}); // Find the user by their ID
        if (!trainee) {
            return res.status(404).json({ error: "Trainee not found." });
        }
        res.status(200).json(trainee); // Send the user data as a JSON response
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while fetching the user data." });
    }
}

export {
    deferRequest,
    getTrainee
}
