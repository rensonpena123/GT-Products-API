import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

//PART 2
export const getAllComments = async () => {
    const [comments] = await pool.query('SELECT * FROM comments');
    return comments;
};

export const getCommentsByPostId = async (postId) => {
    const [comments] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
    return comments;
};

export const createComment = async (postId, authorId, commentData) => {
    try {
        const { text } = commentData;
        const [result] = await pool.query(
            'INSERT INTO comments (text, postId, authorId) VALUES (?, ?, ?)',
            [text, postId, authorId]
        );
        
        const [newComment] = await pool.query(
            'SELECT * FROM comments WHERE id = ?',
            [result.insertId]
        );
        
        return newComment[0];
        
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Invalid postId or authorId. The specified post or user does not exist.');
        }
        
        throw error;
    }
};

//PART 1 MIDTERMS
// export const getCommentById = async (id) => {
//     const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
//     if (!rows[0]) {
//         throw new ApiError(500, "Comment not found");
//     }
//     return rows[0];
// };


// export const createComment = async (commentData) => {
//     try {
//         const {content, postId, authorId} = commentData;
//         const [result] = await pool.query(
//             'INSERT INTO comments (content, postId, authorId) VALUES (?, ?, ?)',
//             [content, postId, authorId]
//         );
        
//         if (!result.affectedRows) {
//             throw new ApiError(500, "Failed to create comment");
//         }
        
//         const newCommentId = result.insertId;
//         return getCommentById(newCommentId);
        
//     } catch (error) {
//         if (error.code === 'ER_NO_REFERENCED_ROW_2') {
//             throw new ApiError(400, 'Invalid postId or authorId. The specified post or user does not exist.');
//         }
        
//         throw error;
//     }
// };

