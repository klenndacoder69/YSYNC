import dotenv from "dotenv";
import mongoose from "mongoose";
import Posts from "../models/postSchema.js";

dotenv.config({
  path: "../.env",
});
// Create a new post
const createPost = async (req, res) => {
    try {
        const newPost = new Posts(req.body);
        await newPost.save();
        res.status(200).send({ message: 'Post created successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error creating post', error });
    }
};

// Add a comment to a post
const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { userId, text } = req.body;

        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        
        post.comments = post.comments.filter(comment => comment.userId && comment.text);
        const newComment = { userId, text };
        post.comments.push(newComment);
        await post.save();
        res.status(200).send({ message: 'Comment added successfully', data: post });
    } catch (error) {
        res.status(400).send({ message: 'Error adding comment', error: error.message });
    }
};


// Get all posts
const fetchPosts = async (req, res) => {
    try {
        const posts = await Posts.find().sort({ createdAt: -1 });
        res.status(200).send({ message: 'Posts fetched successfully', data: posts });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching posts', error });
    }
};

// Update a post
const updatePost = async (req, res) => {
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
};

// Delete a post
const delPost = async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting post', error });
    }
};


export {
    createPost,
    addComment,
    fetchPosts,
    updatePost,
    delPost
};