import { Router } from 'express';
import * as postController from '../controllers/post_controller.js';
import * as commentController from '../controllers/comments_controller.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.patch('/:id', postController.patchPost); // Fixed: was partiallyUpdatePost
router.delete('/:id', postController.deletePost);

// --- Nested Comment Routes ---
router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', commentController.createCommentForPost);

export default router;