import { Router } from 'express';
import * as userController from '../controllers/user_controller.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId/posts', userController.getPostsByUserId);
router.get('/:id', userController.getUserById);

export default router;