import { Router } from 'express';
import { authRouter, categoryRouter, serviceRouter } from './routes';

const router = Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/services', serviceRouter);

export { router };
