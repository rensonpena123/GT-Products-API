import { validationResult } from 'express-validator';
import * as postService from '../../../services/post_service.js';
import asyncHandler from '../../../utils/asyncHandler.js';

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = postService.getAllPosts();
    res.json(posts);
});

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.getPostById(postId); 
    res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, content } = req.body;
    const newPost = postService.createPost({ title, content });
    res.status(201).json(newPost);
});

export const updatePost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const postId = parseInt(req.params.id, 10);
    const post = postService.updatePost(postId, req.body); 
    res.json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    postService.deletePost(postId); 
    res.status(204).send();
});

export const patchPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.updatePost(postId, req.body);
    res.json(post);
});