
import { userSignIn, userRegister } from '../controllers/userController.js'

const userRouter = (app) => {
    app.get("/", (req, res) => res.send("Hello World!"));
    app.post('/login', userSignIn);
    app.post('/register', userRegister);
};

export default userRouter;