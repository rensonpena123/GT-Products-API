// src/routes/comment.routes.js
import { Router } from 'express';
import * as commentController from '../controllers/comments_controller.js';

const router = Router();

// Route for GET /comments
router.get('/', commentController.getAllComments);

export default router;