import { getAllResi, getResMem } from "../controllers/resMemController.js";

const getAllResiRouter = (app) => {
  app.get("/api/getAllResidentMembers", getAllResi);
  app.get("/api/residentmembers/:userId", getResMem);
  
};

export default getAllResiRouter;
