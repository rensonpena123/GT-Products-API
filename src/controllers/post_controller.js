import { validationResult } from 'express-validator';
import * as postService from '../services/post_service.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10);
        const post = await postService.getPostById(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        res.json({
            id: post.id,
            title: post.title,
            content: post.content
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving post', error: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { title, content } = req.body;
        const newPost = await postService.createPost({ title, content });
        
        res.status(201).json({
            id: newPost.id,
            title: newPost.title,
            content: newPost.content
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const postId = parseInt(req.params.id, 10);
        const post = await postService.updatePost(postId, req.body);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10);
        await postService.deletePost(postId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

export const patchPost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10);
        const post = await postService.updatePost(postId, req.body);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error partially updating post', error: error.message });
    }
};