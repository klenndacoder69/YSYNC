import { editUser, deleteUser, getAllReports, resolveReport, declineReport, deleteReport } from "../controllers/adminController.js";
const adminRouter = (app) => {
    app.put("/api/editUser", editUser);
    app.post("/api/deleteUser", deleteUser);
    app.get("/api/getAllReports", getAllReports);
    app.patch("/api/resolveReport/:id", resolveReport);
    app.patch("/api/declineReport/:id", declineReport);
    app.delete("/api/deleteReport/:id", deleteReport);
}

export default adminRouter;