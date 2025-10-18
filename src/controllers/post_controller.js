import { validationResult } from 'express-validator';
import * as postService from '../services/post_service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await postService.getAllPosts();
    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
});

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

export const createPost = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const authorId = req.user.id;
    const postData = req.body;

    const newPost = await postService.createPost(postData, authorId); 
    return res
        .status(201)
        .json(new ApiResponse(201, newPost, "Post created successfully"));
});

export const updatePost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const postId = parseInt(req.params.id, 10);
    const post = await postService.updatePost(postId, req.body);
    
    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post updated successfully"));
});

export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    await postService.deletePost(postId);
    
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Post deleted successfully"));
});

export const patchPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.partiallyUpdatePost(postId, req.body);
    
    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post updated successfully"));
});