
import { userSignIn } from '../controllers/userController.js'

const userRouter = (app) => {
    app.get("/", (req, res) => res.send("Hello World!"));
    app.post('/login', userSignIn);
};

export default userRouter;