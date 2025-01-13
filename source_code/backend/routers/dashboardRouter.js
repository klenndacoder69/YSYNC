import { createPost, addComment, fetchPosts, updatePost, delPost } from '../controllers/dashboard.js';

const dashboardRouter = (app) => {
    app.post('/api/posts', createPost);
    app.post('/api/posts/:id/comment', addComment);
    app.get('/api/getposts', fetchPosts);
    app.put('/api/updatepost/:id', updatePost);
    app.delete('/api/delpost/:id', delPost);
};

export default dashboardRouter;