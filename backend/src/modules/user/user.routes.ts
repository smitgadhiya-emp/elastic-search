import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();

router.post('/', userController.createUserProfile);
router.get('/', userController.getUserProfiles);
router.get('/:id', userController.getUserProfileById);
router.patch('/:id', userController.updateUserProfile);
router.delete('/:id', userController.deleteUserProfile);

export { router as userRoutes };
