import { Router } from 'express';
import { successResponse } from '../common/response';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

router.get('/health', (_req, res) => {
  successResponse(res, { message: 'ok' });
});

router.use('/users', userRoutes);

export { router as apiRouter };
