import { Router } from 'express';
import * as photoController from '../controllers/photo_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import upload from '../middlewares/multer_middleware.js';

const router = Router();

// all photo needs authentication
router.use(authMiddleware);

// swagger documentation (photo routes)
/**
 * @swagger
 * tags:
 *   name: Photos
 *   description: Photo upload and management endpoints (all require authentication)
 */

/**
 * @swagger
 * /api/v1/photos:
 *   get:
 *     summary: Get user's photos
 *     tags: [Photos]
 *     description: Retrieves all photos uploaded by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Photos retrieved successfully
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
 *                       filename:
 *                         type: string
 *                         example: photo-1634567890123.jpg
 *                       filepath:
 *                         type: string
 *                         example: /uploads/photo-1634567890123.jpg
 *                       caption:
 *                         type: string
 *                         example: Beautiful sunset
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Photos retrieved successfully
 *       401:
 *         description: Unauthorized - JWT token required
 */
router.get('/', photoController.getUserPhotos);

/**
 * @swagger
 * /api/v1/photos/{id}:
 *   delete:
 *     summary: Delete a photo
 *     tags: [Photos]
 *     description: Deletes a photo from both database and server filesystem (requires authentication and ownership)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Photo ID to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Photo deleted successfully (both file and database record removed)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Photo deleted successfully
 *       401:
 *         description: Unauthorized - JWT token required
 *       403:
 *         description: Forbidden - You can only delete your own photos
 *       404:
 *         description: Photo not found
 */
router.delete('/:id', photoController.deleteUserPhoto);

/**
 * @swagger
 * /api/v1/photos/upload:
 *   post:
 *     summary: Upload a photo
 *     tags: [Photos]
 *     description: Uploads a photo file with optional caption (requires authentication). File is saved to server and path stored in database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (JPEG, PNG, GIF)
 *               caption:
 *                 type: string
 *                 example: My vacation photo
 *                 description: Optional caption for the photo
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
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
 *                     filename:
 *                       type: string
 *                       example: photo-1634567890123.jpg
 *                     filepath:
 *                       type: string
 *                       example: /uploads/photo-1634567890123.jpg
 *                     caption:
 *                       type: string
 *                       example: My vacation photo
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                 message:
 *                   type: string
 *                   example: Photo uploaded successfully
 *       400:
 *         description: No file uploaded or validation error
 *       401:
 *         description: Unauthorized - JWT token required
 */
router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

export default router;
