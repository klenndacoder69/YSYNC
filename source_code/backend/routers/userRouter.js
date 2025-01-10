
import { userSignIn, userRegister, getAllUsers } from '../controllers/userController.js'

const userRouter = (app) => {
    app.post('/api/auth/login', userSignIn);
    app.post('/api/auth/register', userRegister);
    app.get('/api/getAllUsers', getAllUsers);
};

export default userRouter;