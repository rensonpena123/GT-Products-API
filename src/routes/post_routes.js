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

// Post routes
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.get('/:postId/comments', commentController.getCommentsByPostId);

router.post('/', authMiddleware, validatePost, postController.createPost);

// router.post('/', createPostRules, postController.createPost);
router.put('/:id', validatePost, updatePostRules, postController.updatePost);
router.patch('/:id', validatePost, postController.patchPost);
router.delete('/:id', postController.deletePost);
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);



// router.get('/:postId/comments', commentController.getCommentsByPostId);

export default router;