import { validationResult } from 'express-validator';
import * as postService from '../../../services/post_service.js';
import asyncHandler from '../../../utils/asyncHandler.js';

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = postService.getAllPosts();

    const v2Posts = posts.map(post => ({ 
        id: post.id, 
        title: post.title, 
        body: post.content, 
        author: post.author
    }));
    res.json(v2Posts);
});

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.getPostById(postId);

    res.json({
        id: post.id,
        title: post.title,
        body: post.content,
        author: post.author
    });
});

export const createPost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { title, body, author } = req.body;

    const serviceData = { title, content: body };
    if (author) serviceData.author = author;  

    const newPost = postService.createPost(serviceData);

    res.status(201).json({
        id: newPost.id,
        title: newPost.title,
        body: newPost.content,
        author: newPost.author
    });
});

export const updatePost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const postId = parseInt(req.params.id, 10);
    const { title, body } = req.body;
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (body !== undefined) updateData.content = body;  
    if (author !== undefined) updateData.author = author;
    
    const post = postService.updatePost(postId, updateData);
    
    res.json({
        id: post.id,
        title: post.title,
        body: post.content,
        author: post.author
    });
});

export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    postService.deletePost(postId);
    res.status(204).send();
});

export const patchPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { title, body } = req.body;
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (body !== undefined) updateData.content = body;  
    
    const post = postService.updatePost(postId, updateData);
    
    res.json({
        id: post.id,
        title: post.title,
        body: post.content
    });
});