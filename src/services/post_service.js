import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllPosts = async () => {
    const [posts] = await pool.query('SELECT * FROM posts');
    return posts;
};

export const getPostById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (!rows[0]) {
        throw new ApiError(404, "Post not found");
    }
    return rows[0];
};

export const createPost = async (postData) => {
    const {title, content} = postData;
    const [result] = await pool.query(
        'INSERT INTO posts (title, content) VALUES (?, ?)',
        [title, content]
    );
    const newPostId = result.insertId;
    return getPostById(newPostId);
};

export const updatePost = async (id, postData) => {
    const {title, content} = postData;
    const [result] = await pool.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );
    if (result.affectedRows === 0) {
        throw new ApiError(404, "Post not found");
    }
    return getPostById(id);
};

export const deletePost = async (id) => {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
        throw new ApiError(404, "Post not found");
    }
    return true;
};

export const partiallyUpdatePost = async (id, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

        if (fields.length === 0) {
            return getPostById(id);
        }
    
        const setClause = fields.map(field => `${field} = ?`).join(', ');

        const [result] = await pool.query(
            `UPDATE posts SET ${setClause} WHERE id = ?`,
            [...values, id]
        );

        if (result.affectedRows === 0) {
           throw new ApiError(404, "Post not found");
        }
        return getPostById(id);
};

// let posts = [
//     { id: 1, title: 'First Post', content: 'This is the first post.' },
//     { id: 2, title: 'Second Post', content: 'This is the second post.' }
// ];
// let nextId = 3;

// export const getAllPosts = () => {
//     return posts;
// };

// export const getPostById = (id) => {
//     const post = posts.find(p => p.id === id);
//     if(!post) {
//         throw new NotFoundError(`Post with id ${id} not found`);
//     }
//     return post;
// };

// export const createPost = (postData) => {
//     const newPost = { id: nextId++, ...postData, author: postData.author };
//     posts.push(newPost);
//     return newPost;
// };

// export const updatePost = (id, postData) => {
//     const postIndex = posts.findIndex(p => p.id === id);
//     if (postIndex === -1) {
//         throw new NotFoundError(`Post with id ${id} not found`);
//     }
//     posts[postIndex] = { ...posts[postIndex], ...postData };
//     return posts[postIndex];
// };

// export const deletePost = (id) => {
//     const postIndex = posts.findIndex(p => p.id === id);
//     if (postIndex === -1) {
//        throw new NotFoundError(`Post with id ${id} not found`);
//     }
//     posts.splice(postIndex, 1);
//     return true;
// };

// export const patchPost = (id, postData) => {
//         const postIndex = posts.findIndex(p => p.id === id);
//     if (postIndex === -1) {
//         throw new NotFoundError(`Post with id ${id} not found`);
//     }
//     posts[postIndex] = { ...posts[postIndex], ...postData };
//     return posts[postIndex];
// };