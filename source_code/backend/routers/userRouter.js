
import { userSignIn, userRegister, getAllUsers, getUser, reportRequest, migrateUser } from '../controllers/userController.js'


const userRouter = (app) => {
    app.post('/api/auth/login', userSignIn);
    app.post('/api/auth/register', userRegister);
    app.post('/api/report', reportRequest);
    app.get('/api/getAllUsers', getAllUsers);
    app.get('/api/users/:id', getUser);
    app.post('/api/migrate/:id', migrateUser);
    // app.get('/api/testFunction', testFunction);
};

export default userRouter;