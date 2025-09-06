// src/services/comments_service.js

let comments = [
    { id: 1, text: 'Great first post!', postId: 1 },
    { id: 2, text: 'I agree, very insightful.', postId: 1 },
    { id: 3, text: 'This is a comment on the second post.', postId: 2 },
];
let nextId = 4;

import { getPostById } from './post_service.js';

export const getAllComments = () => {
    return comments;
};

export const getCommentsByPostId = (postId) => {
    return comments.filter(c => c.postId === postId);
};

export const createComment = (postId, commentData) => {
    const post = getPostById(postId);
    if (!post) {
        return null; // Post doesn't exist
    }
    const newComment = { id: nextId++, postId, ...commentData };
    comments.push(newComment);
    return newComment;
};

export const getCommentById = (id) => {
    return comments.find(c => c.id === id);
};

export const updateComment = (id, commentData) => {
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex === -1) {
        return null;
    }
    comments[commentIndex] = { ...comments[commentIndex], ...commentData };
    return comments[commentIndex];
};

export const deleteComment = (id) => {
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex === -1) {
        return false;
    }
    comments.splice(commentIndex, 1);
    return true;
};

export const patchComment = (id, commentData) => {
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex === -1) {
        return null;
    }
    comments[commentIndex] = { ...comments[commentIndex], ...commentData };
    return comments[commentIndex];
};