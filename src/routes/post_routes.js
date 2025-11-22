import { Router } from 'express';
import { body } from 'express-validator';
import * as postController from '../controllers/post_controller.js';
import * as commentController from '../controllers/comments_controller.js'
import { validatePost } from '../middlewares/validator_middleware.js';
import { validateComment } from '../middlewares/validator_middleware.js';
import { authMiddleware } from '../middlewares/auth_middleware.js'; 

const router = Router();

const createPostRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')   
];

const updatePostRules = [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty')
];

// swagger for Post routes

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Blog post management endpoints
 */

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     description: Retrieves a list of all blog posts from all users
 *     responses:
 *       200:
 *         description: List of all posts retrieved successfully
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
 *                       title:
 *                         type: string
 *                         example: My First Blog Post
 *                       content:
 *                         type: string
 *                         example: This is the content of my first post
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Posts retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', postController.getAllPosts);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     description: Retrieves a single post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: My First Blog Post
 *                     content:
 *                       type: string
 *                       example: This is the content of my first post
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                 message:
 *                   type: string
 *                   example: Post retrieved successfully
 *       404:
 *         description: Post not found
 */
router.get('/:id', postController.getPostById);

/**
 * @swagger
 * /api/v1/posts/{postId}/comments:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Posts]
 *     description: Retrieves all comments associated with a specific post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *         example: 1
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
 *                         example: Great post!
 *                       postId:
 *                         type: integer
 *                         example: 1
 *       404:
 *         description: Post not found
 */
router.get('/:postId/comments', commentController.getCommentsByPostId);

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     description: Creates a new blog post (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Awesome Post
 *                 description: Title of the blog post
 *               content:
 *                 type: string
 *                 example: This is the detailed content of my blog post
 *                 description: Main content of the post
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     title:
 *                       type: string
 *                       example: My Awesome Post
 *                     content:
 *                       type: string
 *                       example: This is the detailed content of my blog post
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                 message:
 *                   type: string
 *                   example: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token required
 */
router.post('/', authMiddleware, validatePost, postController.createPost);


/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     summary: Update a post (full update)
 *     tags: [Posts]
 *     description: Updates an existing post with new data (requires authentication and ownership)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Post Title
 *               content:
 *                 type: string
 *                 example: Updated post content
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token required
 *       403:
 *         description: Forbidden - You can only update your own posts
 *       404:
 *         description: Post not found
 */
router.put('/:id', authMiddleware, validatePost, postController.updatePost);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     description: Deletes a post (requires authentication and ownership)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized - JWT token required
 *       403:
 *         description: Forbidden - You can only delete your own posts
 *       404:
 *         description: Post not found
 */
router.delete('/:id', authMiddleware, postController.deletePost);

// router.post('/', createPostRules, postController.createPost);
// router.put('/:id', validatePost, updatePostRules, postController.updatePost);
/**
 * @swagger
 * /api/v1/posts/{id}:
 *   patch:
 *     summary: Partially update a post
 *     tags: [Posts]
 *     description: Updates specific fields of a post (does not require authentication in current implementation)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Partially Updated Title
 *               content:
 *                 type: string
 *                 example: Partially updated content
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */
router.patch('/:id', validatePost, postController.patchPost);
// router.delete('/:id', postController.deletePost);

/**
 * @swagger
 * /api/v1/posts/{postId}/comments:
 *   post:
 *     summary: Create a comment on a post
 *     tags: [Posts]
 *     description: Adds a new comment to a specific post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID to comment on
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is an amazing post! Thanks for sharing.
 *                 description: Comment text
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Post not found
 */
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);


// router.get('/:postId/comments', commentController.getCommentsByPostId);

export default router;