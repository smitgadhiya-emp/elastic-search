import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();

router.post('/', userController.createUserProfile);
router.get('/', userController.getUserProfiles);
router.get('/:id', userController.getUserProfileById);
router.put('/:id', userController.updateUserProfile);
router.delete('/:id', userController.deleteUserProfile);

// temporary route to test kafka
router.get('/kafka/test', userController.testKafka);

export { router as userRoutes };
