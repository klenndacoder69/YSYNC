import {
  editUser,
  deleteUser,
  getAllReports,
  resolveReport,
  declineReport,
  deleteReport,
  getAllRequestApplications,
  getAllRequestDeferrals,
  acceptApplication,
  acceptDeferral,
  declineApplication,
  declineDeferral,
} from "../controllers/adminController.js";
const adminRouter = (app) => {
  app.put("/api/editUser", editUser);
  app.post("/api/deleteUser", deleteUser);
  app.get("/api/getAllReports", getAllReports);
  app.patch("/api/resolveReport/:id", resolveReport);
  app.patch("/api/declineReport/:id", declineReport);
  app.delete("/api/deleteReport/:id", deleteReport);
  app.get("/api/getAllRequestApplications", getAllRequestApplications);
  app.get("/api/getAllRequestDeferrals", getAllRequestDeferrals);
  app.post("/api/acceptApplication/:id", acceptApplication);
  app.post("/api/declineApplication/:id", declineApplication);
  app.post("/api/acceptDeferral/:id", acceptDeferral);
  app.post("/api/declineDeferral/:id", declineDeferral);
};

export default adminRouter;
