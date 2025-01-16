import { deferRequest, getTrainee } from '../controllers/traineeController.js'

const traineeRouter = (app) => {
    app.post('/api/defer', deferRequest);
    app.get('/api/trainees/:id', getTrainee);
};

export default traineeRouter;