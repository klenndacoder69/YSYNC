import {
  getAllTrainees,
  getMentors,
  getMentorReco,
} from "../controllers/mentor-choosing.js";

const mentorChooseRouter = (app) => {
  app.get("/api/get-all-trainees", getAllTrainees);
  app.get("/api/get-mentors", getMentors);
  app.get("/api/get-mentor-recommendations", getMentorReco);
};

export default mentorChooseRouter;
