import { Router } from 'express';
import { body } from 'express-validator';
import * as postController from '../controllers/post_controller.js';
import { validatePost } from '../middlewares/validator_middleware.js';

const router = Router();

const createPostRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')
];

const updatePostRules = [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty')
];

// Post routes
router.get('/', validatePost, postController.getAllPosts);
router.get('/:id', validatePost, postController.getPostById);
router.post('/', createPostRules, postController.createPost);
router.put('/:id', validatePost, updatePostRules, postController.updatePost);
router.patch('/:id', validatePost, postController.patchPost);
router.delete('/:id', postController.deletePost);

// Comment routes - commented out until you create the comments controller
// router.get('/:postId/comments', commentController.getCommentsByPostId);
// router.post('/:postId/comments', commentController.createCommentForPost);

export default router;