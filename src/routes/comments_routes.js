import { Router } from 'express';
import * as commentController from '../controllers/comments_controller.js';
import { validateComment } from '../middlewares/validator_middleware.js';

const router = Router();

router.get('/', commentController.getAllComments);

//PART 2 MIDTERMS
// router.get('/:id', commentController.getCommentById);
// router.post('/', validateComment, commentController.createComment);

export default router;

