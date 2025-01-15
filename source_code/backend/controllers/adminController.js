import User from "../models/userSchema.js";
import Trainee from "../models/traineeSchema.js";
import ResidentMember from "../models/residentMemberSchema.js";

const editUser = async (req, res) => {
    try {
        const user = req.body;
        console.log(req.body);

    } catch (error) {

    }
}

export { editUser };