import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as authController from '../controllers/auth_controller.js';
import { validateRegistration } from '../middlewares/validator_middleware.js';

const router = Router();


// the routes are more vulnerable to attacks so i set a stricter rate limit
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per 15 minutes
    message: 'Too many authentication attempts, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});


// Swagger documentation components for auth routes
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration endpoints
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Authentication]
 *     description: Creates a user account with hashed password using bcrypt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: exampleuser
 *                 description: Unique username for the account
 *               email:
 *                 type: string
 *                 format: email
 *                 example: exampleuser@example.com
 *                 description: Valid email address
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: examplepass123
 *                 description: Password (will be hashed with bcrypt)
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: exampleuser
 *                     email:
 *                       type: string
 *                       example: exampleuser@example.com
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 *       429:
 *         description: Too many registration attempts (rate limit exceeded)
 */
router.post('/register', authLimiter, validateRegistration, authController.registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     description: Authenticates a user with email and password, returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: exampleuser@example.com
 *                 description: User's registered email
 *               password:
 *                 type: string
 *                 format: password
 *                 example: examplepass123  
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful, JWT token returned
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
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNjE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                       description: JWT token for authentication (use in Authorization header as Bearer token)
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *       401:
 *         description: Invalid email or password
 *       429:
 *         description: Too many login attempts (rate limit exceeded)
 */
router.post('/login', authLimiter, authController.loginUser);


export default router;