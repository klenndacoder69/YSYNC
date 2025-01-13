
import { userSignIn, userRegister, getAllUsers, getUser } from '../controllers/userController.js'

const userRouter = (app) => {
    app.post('/api/auth/login', userSignIn);
    app.post('/api/auth/register', userRegister);
    app.get('/api/getAllUsers', getAllUsers);
    app.get('/api/users/:id', getUser);
};

export default userRouter;