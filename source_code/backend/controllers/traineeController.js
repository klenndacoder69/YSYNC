import Trainee from "../models/traineeSchema.js";
import DeferTrainee from "../models/deferSchema.js";

const deferRequest = async (req, res) => {
    try {
        const { userId, reason } = req.body;
        const trainee = await Trainee.findOne({ userId });

        if (!trainee) {
            return res.status(404).json({ error: "Trainee not found." });
        }

        // Create a new DeferTrainee document
        const deferTrainee = new DeferTrainee({
            userId: trainee.userId,
            reason: reason,
            deferDate: new Date() // Add any additional fields as needed
        });

        // Save the new DeferTrainee document
        await deferTrainee.save();

        res.status(200).json({ message: "Submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while submitting." });
    }
}

const getTrainee = async (req, res) => {
    try {
        const traineeId = req.params.id; // Get user ID from request parameters
        const trainee = await Trainee.findById(traineeId); // Find the user by their ID
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
