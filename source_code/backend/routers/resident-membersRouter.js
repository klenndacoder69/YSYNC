import { getAllResi } from "../controllers/resMemController.js";

const getAllResiRouter = (app) => {
  app.get("/api/get-all-resident-members", getAllResi);
};

export default getAllResiRouter;
