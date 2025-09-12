import { Router } from 'express';
import * as commentController from '../controllers/comments_controller.js';

const router = Router();

router.get('/', commentController.getAllComments);
router.get('/:postId', commentController.getCommentsByPostId);
router.post('/:postId', commentController.createCommentForPost);

export default router;