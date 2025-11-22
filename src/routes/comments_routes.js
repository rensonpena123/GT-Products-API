import { Router } from 'express';
import * as commentController from '../controllers/comments_controller.js';
import { validateComment } from '../middlewares/validator_middleware.js';

const router = Router();

// swagger documentation (comment routes)
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management endpoints
 */

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     description: Retrieves all comments from all posts in the system
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       content:
 *                         type: string
 *                         example: Great post! Very informative.
 *                       postId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Comments retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', commentController.getAllComments);


// //PART 2 MIDTERMS
// /**
//  * @swagger
//  * /api/v1/comments/{id}:
//  *   get:
//  *     summary: Get comment by ID
//  *     tags: [Comments]
//  *     description: Retrieves a single comment by its ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: Comment ID
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: Comment retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 statusCode:
//  *                   type: integer
//  *                   example: 200
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: integer
//  *                       example: 1
//  *                     text:
//  *                       type: string
//  *                       example: This is a great comment
//  *                     postId:
//  *                       type: integer
//  *                       example: 1
//  *                     authorId:
//  *                       type: integer
//  *                       example: 1
//  *                 message:
//  *                   type: string
//  *                   example: Comment retrieved successfully
//  *       404:
//  *         description: Comment not found
//  */
// router.get('/:id', commentController.getCommentById);
    
// /**
//  * @swagger
//  * /api/v1/comments:
//  *   post:
//  *     summary: Create a new comment
//  *     tags: [Comments]
//  *     description: Creates a standalone comment on a post
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - text
//  *               - postId
//  *               - authorId
//  *             properties:
//  *               text:
//  *                 type: string
//  *                 example: This is my comment on this post
//  *                 description: The comment text content
//  *               postId:
//  *                 type: integer
//  *                 example: 1
//  *                 description: ID of the post to comment on
//  *               authorId:
//  *                 type: integer
//  *                 example: 1
//  *                 description: ID of the comment author
//  *     responses:
//  *       201:
//  *         description: Comment created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 statusCode:
//  *                   type: integer
//  *                   example: 201
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: integer
//  *                       example: 5
//  *                     text:
//  *                       type: string
//  *                       example: This is my comment on this post
//  *                     postId:
//  *                       type: integer
//  *                       example: 1
//  *                     authorId:
//  *                       type: integer
//  *                       example: 1
//  *                 message:
//  *                   type: string
//  *                   example: Comment created successfully
//  *       400:
//  *         description: Validation error or invalid postId/authorId
//  */
// router.post('/', validateComment, commentController.createComment);


export default router;

