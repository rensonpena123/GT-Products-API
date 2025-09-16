import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllComments = async () => {
    const [comments] = await pool.query('SELECT * FROM comments');
    return comments;
};

export const getCommentById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
    if (!rows[0]) {
        throw new ApiError(500, "Comment not found");
    }
    return rows[0];
};


export const createComment = async (commentData) => {
    try {
        const {content, postId, authorId} = commentData;
        const [result] = await pool.query(
            'INSERT INTO comments (content, postId, authorId) VALUES (?, ?, ?)',
            [content, postId, authorId]
        );
        
        if (!result.affectedRows) {
            throw new ApiError(500, "Failed to create comment");
        }
        
        const newCommentId = result.insertId;
        return getCommentById(newCommentId);
        
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Post ID or Author ID does not exist');
        }
        
        throw error;
    }
};

