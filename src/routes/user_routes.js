import { Router } from 'express';
import * as userController from '../controllers/user_controller.js';

const router = Router();

// swagger documentation (user routes)
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */



/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieves a list of all registered users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
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
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', userController.getAllUsers);

// router.post('/', userController.createUser);
// router.get('/:userId/posts', userController.getPostsByUserId);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Retrieves a single user's information by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User retrieved successfully
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
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getUserById);


export default router;