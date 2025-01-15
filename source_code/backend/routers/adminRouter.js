import { editUser } from "../controllers/adminController.js";
const adminRouter = (app) => {
    app.put("/api/editUser", editUser);
}

export default adminRouter;