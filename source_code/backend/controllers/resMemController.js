import ResidentMember from "../models/residentMemberSchema.js";

const getAllResi = async (req, res) => {
  try {
    const resMems = await ResidentMember.find()
      .populate("userId")
      .populate("traineeId");
    // even though some became resident members but terminated, they must be filtered
    const filteredResMems = resMems.filter((resMem) => resMem.userId.userType === "residentMember");
    res.status(200).json(filteredResMems);
  } catch (error) {
    res.status(500).json({
      error: "An error has occured while retrieving Resident Members' info.",
    });
  }
};

// TAKE NOTE, ANG KINUKUHA NITONG ID IS YUNG USERID, HINDI YUNG ID NG RESIDENTMEMBER
// AAAAAAAAAAAA
const getResMem = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from request parameters
    const resMem = await ResidentMember.findOne({ userId }); // Find the user by their ID
    if (!resMem) {
      return res.status(404).json({ error: "Resident not found." });
    }
    res.status(200).json(resMem); // Send the user data as a JSON response
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occurred while fetching the user data." });
  }
};

export { getAllResi, getResMem };
