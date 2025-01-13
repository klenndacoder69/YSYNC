import dotenv from "dotenv";
import mongoose from "mongoose";
import Posts from "../models/postSchema.js";

dotenv.config({
  path: "../.env",
});

const dashboard = (app) => {
    // Create a new post
    app.post('/api/posts', async (req, res) => {
        try {
            const newPost = new Posts(req.body);
            await newPost.save();
            res.status(200).send({ message: 'Post created successfully' });
        } catch (error) {
            res.status(400).send({ message: 'Error creating post', error });
        }
    });

    // Get all posts
    app.get('/api/posts', async (req, res) => {
        try {
            const posts = await Posts.find().sort({ createdAt: -1 });
            res.status(200).send({ message: 'Posts fetched successfully', data: posts });
        } catch (error) {
            res.status(500).send({ message: 'Error fetching posts', error });
        }
    });
    
    // Update a post
    app.put('/api/posts/:id', async (req, res) => {
        try {
            const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
            
            if (!isValidId) {
              return res.status(400).send({ message: 'Invalid Post ID' });
            }

            const updatedPost = await Posts.findByIdAndUpdate(
                req.params.id,
                { ...req.body, updatedAt: Date.now() },
                { new: true }
            );

            if (!updatedPost) {
                return res.status(404).send({ message: 'Post not found' });
            }

            res.status(200).send({ message: 'Post updated successfully' });
        } catch (error) {
            res.status(400).send({ message: 'Error updating post', error });
        }
    });

    // Delete a post
    app.delete('/api/posts/:id', async (req, res) => {
        try {
            const deletedPost = await Posts.findByIdAndDelete(req.params.id);

            if (!deletedPost) {
                return res.status(404).send({ message: 'Post not found' });
            }
            
            res.status(200).send({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error deleting post', error });
        }
    });

};

export default dashboard;