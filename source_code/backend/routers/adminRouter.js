import { editUser, deleteUser } from "../controllers/adminController.js";
const adminRouter = (app) => {
    app.put("/api/editUser", editUser);
    app.post("/api/deleteUser", deleteUser);
}

export default adminRouter;