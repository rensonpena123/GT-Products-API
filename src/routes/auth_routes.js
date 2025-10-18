import { Router } from 'express';
import * as authController from '../controllers/auth_controller.js';
import { validateRegistration } from '../middlewares/validator_middleware.js';

const router = Router();

router.post('/register', validateRegistration, authController.registerUser);

export default router;