import { Router } from 'express';
import * as photoController from '../controllers/photo_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import upload from '../middlewares/multer_middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', photoController.getUserPhotos);
router.delete('/:id', photoController.deleteUserPhoto);

router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

export default router;
