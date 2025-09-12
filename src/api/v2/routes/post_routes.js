import { Router } from 'express';
import { createPostRules, updatePostRules } from '../validators/post_validator.js';
import * as postController from '../controllers/post_controller.js';
import * as commentController from '../controllers/comments_controller.js';

const router = Router();

router.post('/', createPostRules, postController.createPost);
router.put('/:id', updatePostRules, postController.updatePost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.patch('/:id', postController.patchPost);
router.delete('/:id', postController.deletePost);

// --- Nested Comment Routes ---
router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', commentController.createCommentForPost);

export default router;