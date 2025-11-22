import * as commentService from '../services/comments_service.js';
import asyncHandler from 'express-async-handler';
import { ApiResponse } from '../utils/ApiResponse.js';

//MIDTERMS PART 2
export const getAllComments = asyncHandler(async (req, res) => {
    const comments = await commentService.getAllComments();
    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await commentService.getCommentsByPostId(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

export const createCommentForPost = asyncHandler(async (req, res) => {

    const postId = parseInt(req.params.postId, 10);
    const {text, authorId} = req.body;

    const newComment = await commentService.createComment(postId, authorId, {text});
    return res
        .status(201)
        .json(new ApiResponse(201, newComment, "Comment created successfully"));
});


// //MIDTERMS PART 1
// export const createComment = asyncHandler(async (req, res) => {

//     const newComment = await commentService.createComment(req.body);
//     return res
//         .status(201)
//         .json(new ApiResponse(201, newComment, "Comment created successfully"));
// });

// export const getCommentById = asyncHandler(async (req, res) => {
//     const commentId = parseInt(req.params.id, 10);
//     const comment = await commentService.getCommentById(userId);

//     return res
//         .status(200)
//         .json(new ApiResponse(200, comment, "Comment retrieved successfully"));
// });

// export const getAllComments = asyncHandler(async (req, res) => {
//     const comments = await commentService.getAllComments();
//     return res
//         .status(200)
//         .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
// });

// export const getCommentsByUserId = asyncHandler(async (req, res) => {
//     const postId = parseInt(req.params.userId, 10);
//     const comments = await commentService.getCommentsByPostId(postId);

//     return res
//         .status(200)
//         .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
// });